import { Pipe, PipeTransform } from '@angular/core';
import { MCUser } from '../entities/mc-user';

@Pipe({
  name: 'initialName',
  standalone: true
})
export class InitialNamePipe implements PipeTransform {

  transform(user: MCUser): string {
    // Get the first letter of the first name
    const firstLetter = user.firstname.charAt(0);
    // Verify if the last name is not empty
    if (user.lastname == undefined || user.lastname == '') {
      // Return the first letter
      return firstLetter;
    }
    // Get the first letter of the last name
    const lastLetter = user.lastname.charAt(0);
    // Return the initials
    return firstLetter + lastLetter;
  }

}
