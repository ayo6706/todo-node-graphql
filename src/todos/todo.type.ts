import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType('Todo')
export class TodoType {
  @Field((type) => ID)
  id: string;

  @Field()
  title: string;

  @Field()
  description: string;

  @Field()
  completed: boolean;
}
