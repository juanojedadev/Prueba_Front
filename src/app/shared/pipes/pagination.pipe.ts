import { Pipe, PipeTransform } from '@angular/core';
import { Fruit } from '@coreelements/models/fruit';

@Pipe({
  name: 'pagination'
})
export class PaginationPipe implements PipeTransform {

  transform(fruits: Fruit[], page: number = 0, size: number = 0): Fruit[] {
    return fruits.slice(page, size);
  }

}
