import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, MinLength } from 'class-validator';

@InputType()
export class UpdateTodoInput {
  @Field()
  @IsNotEmpty()
  id: string;

  @Field()
  @IsNotEmpty()
  @MinLength(1)
  title: string;

  @Field()
  @MinLength(1)
  description: string;

  @Field()
  completed: boolean;
}
