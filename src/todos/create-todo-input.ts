import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, MinLength } from 'class-validator';

@InputType()
export class CreateTodoInput {
  @Field()
  @IsNotEmpty()
  @MinLength(1)
  title: string;

  @Field()
  @MinLength(1)
  description: string;
}
