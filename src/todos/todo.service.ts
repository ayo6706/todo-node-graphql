import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from './todo.entity';
import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { CreateTodoInput } from './create-todo-input';
import { UpdateTodoInput } from './update-todo-input';

@Injectable()
export class TodoService {
  constructor(@InjectRepository(Todo) private repo: Repository<Todo>) {}

  async createTodo(dto: CreateTodoInput): Promise<Todo> {
    const { title, description } = dto;
    try {
      const todo = this.repo.create({
        id: uuid(),
        title,
        description,
        completed: false,
      });
      return await this.repo.save(todo);
    } catch (error: any) {
      throw error;
    }
  }

  async getTodos(): Promise<Todo[]> {
    try {
      return await this.repo.find();
    } catch (error: any) {
      throw error;
    }
  }

  async getTodoById(id: string): Promise<Todo> {
    try {
      return await this.repo.findOneBy({ id });
    } catch (error: any) {
      throw error;
    }
  }

  async updateTodoById(todo: UpdateTodoInput): Promise<Todo> {
    try {
      await this.repo.update({ id: todo.id }, todo);
      return await this.repo.findOneBy({ id: todo.id });
    } catch (error: any) {
      throw error;
    }
  }

  async deleteTodoById(id: string): Promise<Todo> {
    try {
      const todo = await this.repo.findOneBy({ id });
      await this.repo.remove(todo);
      return todo;
    } catch (error: any) {
      throw error;
    }
  }
}
