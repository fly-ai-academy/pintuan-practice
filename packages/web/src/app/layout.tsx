import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { APP_NAME } from '@pintuan/contracts';
import './globals.css';

export const metadata: Metadata = {
  title: `${APP_NAME} · 实战工程`,
  description: '从 Next.js 开始，逐步接入 NestJS 的拼团项目教学起点。',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
