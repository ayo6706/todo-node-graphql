import { Field, InputType } from "@nestjs/graphql";
import { MinLength } from "class-validator";

@InputType()
export class UpdateTodoInput {
    @Field()
    id: string;
    
    @Field()
    @MinLength(1)
    title: string;

    @Field()
    @MinLength(1)
    description: string;    
    
    @Field()
    completed: boolean;
}
