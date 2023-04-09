import { InputType, PartialType } from '@nestjs/graphql';
import { CreateCoffeeInput } from './create-coffee.input';

// generate automatically generate in our schema file
@InputType()
export class updateCoffeeInput extends PartialType(CreateCoffeeInput) {}
