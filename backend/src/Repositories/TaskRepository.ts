import { Injectable } from '@nestjs/common';
import { PrismaService } from '../PrismaService';
import { Prisma, task } from '@prisma/client';

@Injectable()
export default class TaskRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<task[]> {
    return this.prisma.task.findMany();
  }

  async delete(id: number): Promise<task> {
    return this.prisma.task.delete({
      where: {
        id,
      },
    });
  }

  async save(
    data:
      | Prisma.XOR<Prisma.taskCreateInput, Prisma.taskUncheckedCreateInput>
      | Prisma.XOR<Prisma.taskUpdateInput, Prisma.taskUncheckedUpdateInput>,
  ): Promise<task> {
    console.log('hello');
    if (!data.id) {
      return this.prisma.task.create({ data: data as Prisma.taskCreateInput });
    } else {
      return this.prisma.task.update({
        where: { id: data.id as number },
        data: data as Prisma.taskUpdateInput,
      });
    }
  }
}
