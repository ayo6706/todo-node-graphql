import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { TodoType } from './todo.type';
import { TodoService } from './todo.service';
import { CreateTodoInput } from './create-todo-input';
import { UpdateTodoInput } from './update-todo-input';

@Resolver((of) => TodoType)
export class TodoResolver {
  constructor(private service: TodoService) {}

  @Query((returns) => [TodoType])
  async todos(): Promise<TodoType[]> {
    return this.service.getTodos();
  }

  @Query((returns) => TodoType)
  async todo(@Args('id') id: string): Promise<TodoType> {
    return this.service.getTodoById(id);
  }

  @Mutation((returns) => TodoType)
  async createTodo(@Args('input') input: CreateTodoInput): Promise<TodoType> {
    return this.service.createTodo(input);
  }

  @Mutation((returns) => TodoType)
  async updateTodo(@Args('input') input: UpdateTodoInput): Promise<TodoType> {
    return this.service.updateTodoById(input);
  }

  @Mutation((returns) => TodoType)
  async deleteTodo(@Args('id') id: string): Promise<TodoType> {
    return this.service.deleteTodoById(id);
  }
}
