import { execFileSync } from 'node:child_process'
import { chmodSync, existsSync, lstatSync, mkdirSync, readFileSync, renameSync, writeFileSync } from 'node:fs'
import { resolve, join } from 'node:path'
import { homedir } from 'node:os'
import { createHash, randomUUID } from 'node:crypto'
import { mergeState } from './merge.mjs'
import { siteUrl } from './client.mjs'

export function git(cwd, ...args) {
  try { return execFileSync('git', args, { cwd, encoding: 'utf8', maxBuffer: 2_000_000, timeout: 30_000, stdio: ['ignore', 'pipe', 'pipe'] }).trimEnd() }
  catch { throw new Error(`无法核对 Git ${args[0]}；请检查分支与完整历史`) }
}
export function workspace(cwd = process.cwd()) { return git(cwd, 'rev-parse', '--show-toplevel') }
export function bindingPath(cwd) { return resolve(cwd, git(cwd, 'rev-parse', '--git-path', 'book-collaboration.json')) }
export function readJson(path) { return JSON.parse(readFileSync(path, 'utf8')) }
export function privateWrite(path, value) {
  if (existsSync(path) && lstatSync(path).isSymbolicLink()) throw new Error('配置路径不能是符号链接')
  const temp = `${path}.${randomUUID()}.tmp`
  writeFileSync(temp, JSON.stringify(value, null, 2), { mode: 0o600, flag: 'wx' }); renameSync(temp, path); chmodSync(path, 0o600)
}
export function profileDirectory(site, projectId, cwd) {
  const root = join(homedir(), '.book-collaboration')
  if (existsSync(root) && lstatSync(root).isSymbolicLink()) throw new Error('设备目录不能是符号链接')
  mkdirSync(root, { mode: 0o700, recursive: true }); chmodSync(root, 0o700)
  const path = join(root, createHash('sha256').update(`${siteUrl(site)}\n${projectId}\n${cwd}`).digest('hex'))
  if (existsSync(path) && lstatSync(path).isSymbolicLink()) throw new Error('设备目录不能是符号链接')
  mkdirSync(path, { mode: 0o700, recursive: true }); chmodSync(path, 0o700)
  return path
}
export function loadConfig(cwd) {
  if (process.env.BOOK_COLLABORATION_TOKEN) return { site: siteUrl(process.env.BOOK_COLLABORATION_SITE), projectId: process.env.BOOK_COLLABORATION_PROJECT, token: process.env.BOOK_COLLABORATION_TOKEN }
  if (!existsSync(bindingPath(cwd))) throw new Error('请先运行 up --site <本站地址> --project <项目编号>')
  const binding = readJson(bindingPath(cwd)); const directory = profileDirectory(binding.site, binding.projectId, cwd)
  const config = readJson(join(directory, 'device.json'))
  if (config.site !== binding.site || config.projectId !== binding.projectId) throw new Error('设备配置与工作区绑定不一致')
  return { ...config, directory, changeId: binding.changeId }
}
export function origin(cwd) {
  const value = git(cwd, 'remote', 'get-url', 'origin')
  if (!/^(git@github\.com:|https:\/\/github\.com\/)[\w.-]+\/[\w.-]+(?:\.git)?$/.test(value)) throw new Error('origin 必须是无凭证的 GitHub 仓库地址')
  return value
}
export function branch(cwd) { return git(cwd, 'branch', '--show-current') || process.env.BOOK_COLLABORATION_BRANCH || '' }
export function commitInput(cwd, change, { commit, staged = false } = {}) {
  if (!staged && !/^[a-f0-9]{40}$/.test(commit || '')) throw new Error('请提供完整 commit SHA')
  const baseCommit = staged ? git(cwd, 'rev-parse', 'HEAD') : git(cwd, 'rev-parse', `${commit}^1`)
  let parents = staged ? [baseCommit] : git(cwd, 'show', '-s', '--format=%P', commit).split(' ')
  const mergeHead = resolve(cwd, git(cwd, 'rev-parse', '--git-path', 'MERGE_HEAD'))
  if (staged && existsSync(mergeHead)) parents = [baseCommit, ...readFileSync(mergeHead, 'utf8').trim().split(/\s+/)]
  if (parents.length > 2) throw new Error('不支持多父提交合并，请拆分核对')
  const tree = staged ? git(cwd, 'write-tree') : git(cwd, 'rev-parse', `${commit}^{tree}`)
  const [authorEmail, committerEmail] = staged
    ? [git(cwd, 'var', 'GIT_AUTHOR_IDENT'), git(cwd, 'var', 'GIT_COMMITTER_IDENT')].map(value => value.match(/<([^>]+)>/)?.[1]?.toLowerCase())
    : git(cwd, 'show', '-s', '--format=%ae%x00%ce', commit).toLowerCase().split('\0')
  const merge = parents.length === 2 ? mergeState(cwd, parents, tree) : null
  const paths = merge?.paths || git(cwd, 'diff', '--no-ext-diff', '--no-textconv', '--no-renames', '--name-only', '-z', baseCommit, tree).split('\0').filter(Boolean).sort()
  const patch = git(cwd, '-c', 'core.quotePath=false', 'diff', '--no-ext-diff', '--no-textconv', '--no-renames', '--full-index', '--no-color', '--src-prefix=a/', '--dst-prefix=b/', '--unified=3', merge?.automaticTree || baseCommit, tree, ...(merge ? ['--', ...paths] : []))
  if ((!paths.length && !merge) || Buffer.byteLength(patch) > 100000 || /^GIT binary patch$|^Binary files /m.test(patch)) throw new Error('需要 100KB 内的完整文本差异，不能静默省略二进制或文件')
  return { ...(merge ? { merge: { protocol: 1, parents, automaticTree: merge.automaticTree, conflictPaths: merge.conflictPaths } } : {}), origin: origin(cwd), branch: branch(cwd), productVersion: change.productVersion, changeId: change.id, revision: change.revision, baseCommit, tree, paths, patch, authorEmail, committerEmail }
}
