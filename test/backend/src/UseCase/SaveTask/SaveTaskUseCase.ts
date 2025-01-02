import { Injectable } from '@nestjs/common';
import TaskRepository from '../../Repositories/TaskRepository';
import SaveTaskDto from './SaveTaskDto';

@Injectable()
export default class {
  constructor(private readonly taskRepository: TaskRepository) {}

  async handle(dto: SaveTaskDto) {
    // Check if the task name is provided
    if (!dto.name) {
      throw new Error('Task name is required');
    }

    try {
      // If no ID is provided, create a new task
      if (!dto.id) {
        return this.taskRepository.save({
          name: dto.name,
        });
      } else {
        // If an ID is provided, update the existing task
        return this.taskRepository.save({
          id: dto.id,
          name: dto.name,
        });
      }
    } catch (error) {
      // Catch and throw an error
      throw new Error('Error saving the task');
    }
  }
}