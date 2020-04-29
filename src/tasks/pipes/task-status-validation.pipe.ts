import { PipeTransform, BadRequestException } from '@nestjs/common';

import { TaskStatus } from '../task-status.enum';

export class TaskStatusValidation implements PipeTransform {
  readonly allowedStatuses = [TaskStatus.DONE, TaskStatus.IN_PROGRESS, TaskStatus.OPEN];

  transform(value: any) {
    value = value.toUpperCase();

    if (!this.isStatusValid(value)) {
      throw new BadRequestException(`${value} is invalid status`);
    }

    return value;
  }

  private isStatusValid(status: any): boolean {
    const idx = this.allowedStatuses.indexOf(status);
    return idx !== -1;
  }
}
