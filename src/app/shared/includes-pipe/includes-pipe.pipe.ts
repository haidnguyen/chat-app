import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'includesPipe',
})
export class IncludesPipe implements PipeTransform {
  transform(value: string[], item: string) {
    return value.includes(item);
  }
}
