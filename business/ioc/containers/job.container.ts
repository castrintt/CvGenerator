import type { Container } from 'inversify';
import { JobSymbols } from '../symbols/job.symbols';
import type { IJobGateway } from '../../domain/interfaces/i-job.gateway';
import type { IJobService } from '../../domain/interfaces/i-job.service';
import { JobGateway } from '../../gateway/job.gateway';
import { JobService } from '../../application/services/job.service';

export function bindJobContainer(container: Container): void {
  container
    .bind<IJobGateway>(JobSymbols.JobGateway)
    .to(JobGateway)
    .inSingletonScope();

  container
    .bind<IJobService>(JobSymbols.JobService)
    .to(JobService)
    .inSingletonScope();
}
