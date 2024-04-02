import { Controller, Get } from '@nestjs/common';
import { HealthCheckService, HttpHealthIndicator, HealthCheck } from '@nestjs/terminus';
//service webapp azure
@Controller('health')
export class HealthController {
    constructor(
        private health: HealthCheckService,
        private http: HttpHealthIndicator,
    ) { }

    @Get()
    @HealthCheck()
    async check() {
        const healthCheckResult = await this.health.check([
          () => this.http.pingCheck('todo', 'http://localhost:3000/todo'),
          () => this.http.pingCheck('user', 'http://localhost:3000/user'),
        ]);
        if (healthCheckResult.status === 'ok') {
          return {
            entidad1: 'users',
            entidad2: 'todos',
          };
        }
        else {
            return healthCheckResult;
        }
      }
}
