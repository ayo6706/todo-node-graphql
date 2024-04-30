import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { TodoType } from "./todo.type";
import { TodoService } from "./todo.service";

@Resolver(of => TodoType)
export class TodoResolver {
    constructor(private service: TodoService) {}

    @Query(returns => [TodoType])
    async todos(): Promise<TodoType[]> {
        return this.service.getTodos();
    }

    @Query(returns => TodoType)
    async todo(@Args('id') id: string): Promise<TodoType> {
        return this.service.getTodoById(id);
    }

    @Mutation(returns => TodoType)
    async createTodo(
        @Args('title') title: string,
        @Args('description') description: string
    ): Promise<TodoType> {
        return this.service.createTodo({
            title, 
            description
        });
    }

    @Mutation(returns => TodoType)
    async updateTodo(
        @Args('id') id: string,
        @Args('title') title: string,
        @Args('description') description: string,
        @Args('completed') completed: boolean
    ): Promise<TodoType> {
        return this.service.updateTodoById(
            {  
                id,
                title,
                description,
                completed
            }
        );
    }

    @Mutation(returns => TodoType)
    async deleteTodo(
        @Args('id') id: string
    ): Promise<TodoType> {
        return this.service.deleteTodoById(id);
    }
}
