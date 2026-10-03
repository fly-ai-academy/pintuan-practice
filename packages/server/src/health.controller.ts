import { Controller, Get } from '@nestjs/common';
import type { HealthResponse } from '@pintuan/contracts';

@Controller('health')
export class HealthController {
  @Get()
  health(): HealthResponse {
    return { status: 'ok', service: 'pintuan-server' };
  }
}
