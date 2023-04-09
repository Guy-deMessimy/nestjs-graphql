import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FlavorsByCoffeeLoader } from './data-loader/flavors-by-coffee.loader';
import { Coffee } from './entities/coffee.entity';
import { Flavor } from './entities/flavor.entity';

@Resolver(() => Coffee)
export class CoffeeFlavorsResolver {
  constructor(
    // ⚙️ Inject the Flavor Repository
    // @InjectRepository(Flavor)
    // private readonly flavorsRepository: Repository<Flavor>,
    private readonly flavorsByCoffeeLoader: FlavorsByCoffeeLoader, // 👈 utilize our new loader
  ) {}

  @ResolveField('flavors', () => [Flavor])
  async getFlavorsOfCoffee(@Parent() coffee: Coffee) {
    // Using the injected repository,
    // let’s retrieve ALL flavors that belong to a “parent coffee”.
    // return this.flavorsRepository
    //   .createQueryBuilder('flavor')
    //   .innerJoin('flavor.coffees', 'coffees', 'coffees.id = :coffeeId', {
    //     coffeeId: coffee.id,
    //   })
    //   .getMany();
    return this.flavorsByCoffeeLoader.load(coffee.id);
  }
}
