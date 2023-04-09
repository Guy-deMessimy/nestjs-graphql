import { Field, ID, ObjectType } from '@nestjs/graphql';
import { CoffeeType } from 'src/common/enums/coffee-type.enum';
import { Drink } from 'src/common/interfaces/drink.interface';
import { loggerMiddleware } from 'src/common/middleware/logger.middleware';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinTable,
  ManyToMany,
  CreateDateColumn,
} from 'typeorm';
import { Flavor } from './flavor.entity';

// Entity decorator from type ORM represent a table inside db
@Entity()
@ObjectType({ description: 'Coffee model', implements: () => Drink })
export class Coffee implements Drink {
  @PrimaryGeneratedColumn()
  @Field(() => ID, { description: 'A unique identifier' })
  id: number;

  @Field({
    middleware: [loggerMiddleware],
  })
  @Column()
  name: string;

  @Column()
  brand: string;

  @JoinTable()
  @ManyToMany((type) => Flavor, (flavor) => flavor.coffees /* inverse side */, {
    cascade: true,
  })
  flavors?: Flavor[];

  @CreateDateColumn()
  createdAt?: Date;

  @Column({ nullable: true })
  type?: CoffeeType;
}
