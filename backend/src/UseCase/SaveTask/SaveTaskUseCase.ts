import { Injectable } from '@nestjs/common';
import TaskRepository from '../../Repositories/TaskRepository';
import SaveTaskDto from './SaveTaskDto';

@Injectable()
export default class SaveTaskUseCase {
  constructor(private readonly taskRepository: TaskRepository) {}

  async handle(dto: SaveTaskDto) {
    console.log(dto);
    if (!dto.name) {
      throw new Error('Task name is required');
    }

    try {
      // create a new task
      if (!dto.id) {
        return this.taskRepository.save({
          name: dto.name,
        });
      } else {
        // update the existing task
        return this.taskRepository.save({
          id: dto.id,
          name: dto.name,
        });
      }
    } catch (error) {
      throw new Error('Error saving the task');
    }
  }
}
