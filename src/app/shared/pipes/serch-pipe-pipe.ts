import { Pipe, PipeTransform } from '@angular/core';
import { Proud } from '../../core/interfaces/components/product';

@Pipe({
  name: 'serchPipe'
})
export class SerchPipePipe implements PipeTransform {

  transform(allprouduct:Proud[] , userWord:string): Proud[] {
    return allprouduct.filter((item)=>item.title.toLocaleLowerCase().includes(userWord.toLocaleLowerCase()));
  }

}
