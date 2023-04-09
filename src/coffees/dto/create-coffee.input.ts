import { Field, ID, InputType } from '@nestjs/graphql';
import { MinLength } from 'class-validator';
import { CoffeeType } from 'src/common/enums/coffee-type.enum';

@InputType({ description: 'Create coffee input object type.' })
export class CreateCoffeeInput {
  @MinLength(3)
  @Field((type) => ID, { description: 'A new coffee name' })
  name: string;
  brand: string;
  flavors: string[];
  type: CoffeeType;
}
