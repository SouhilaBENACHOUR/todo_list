import { BadRequestException, Injectable } from '@nestjs/common';
import { task } from '@prisma/client';
import { UseCase } from '../../index';
import TaskRepository from '../../Repositories/TaskRepository';

@Injectable()
export default class GetAllTasksUseCase
  implements UseCase<Promise<task[]>, []>
{
  constructor(private readonly taskRepository: TaskRepository) {}

  async handle() {
    try {
      return this.taskRepository.findAll();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
