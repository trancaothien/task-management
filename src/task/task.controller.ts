import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TaskService } from './task.service';

@Controller('task')
@ApiTags('Task Management')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}
}
