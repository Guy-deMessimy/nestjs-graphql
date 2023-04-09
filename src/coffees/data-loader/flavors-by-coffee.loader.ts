import { Injectable, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import DataLoader from 'dataloader';
import { In, Repository } from 'typeorm';
import { Coffee } from '../entities/coffee.entity';
import { Flavor } from '../entities/flavor.entity';

@Injectable({ scope: Scope.REQUEST })
// 👈 new instance of this provider will be created exclusively for each
// incoming request (cf Request scoped). Garbage after completed
export class FlavorsByCoffeeLoader extends DataLoader<number, Flavor[]> {
  // 👈 number id of coffee
  constructor(
    @InjectRepository(Coffee)
    private readonly coffeesRepository: Repository<Coffee>,
  ) {
    super((keys) => this.batchLoadFn(keys));
  }

  // 2 dimensional array of flavors : array return from this method must have the same length as the input arry (coffee ID)
  private async batchLoadFn(coffeeIds: readonly number[]): Promise<Flavor[][]> {
    const coffeesWithFlavors = await this.coffeesRepository.find({
      select: ['id'], // since we don't really need a coffee object here
      relations: ['flavors'], // to fetch related flavors
      where: {
        id: In(coffeeIds as number[]), // to make sure we only query requested coffees
      },
    });

    // to map an array of coffees two a 2-dimensional array of flavors where position in the array indicates to which coffee flavors belong
    return coffeesWithFlavors.map((coffee) => coffee.flavors);
  }
}
