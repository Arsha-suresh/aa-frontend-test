import { Injectable, signal } from '@angular/core';
import { Brewery } from '../models/Brewery';

@Injectable({
  providedIn: 'root',
})
export class Store {
  breweries = signal<Record<string,Brewery>>({});

  setBreweries(breweries: Brewery[]) {
    const breweryMap: Record<string, Brewery> = {};
    breweries.forEach(brewery => {
      breweryMap[brewery.id] = brewery;
    });
    this.breweries.update((prev)=>{ return {...prev,...breweryMap}});
  }

  clearBreweries() {
    this.breweries.set({});
  }

 
  
}
