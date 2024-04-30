import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from './todo.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TodosService {
    constructor(
        @InjectRepository(Todo) private repo: Repository<Todo>
    ){}

    async createTodo(todo: Todo): Promise<Todo> {
        try{
            return await this.repo.save(todo);
        }catch(error:any){
            throw error;
        }
    }
}
