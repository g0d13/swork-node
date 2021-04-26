import { Scale } from '../../utils/Scale.enum';

export class CreateRequestDto {
  description: string;
  priority: Scale;
  problemCode: string;
  supervisorId: string;
  machineId: string;
}
