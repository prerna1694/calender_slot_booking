import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilitiesService {

  constructor() { }

  capitalizeFirstLetter(word: string): string {
    return word.charAt(0).toUpperCase().concat(word.slice(1));
  }
}
