import { Injectable } from '@angular/core';
import { ApiModel } from '../models/apiModel';
import { Brewery } from '../models/Brewery';

@Injectable({
  providedIn: 'root',
})
export class Adapter {

  generateBreweryModel(brewerys: ApiModel[]): Brewery[] {
    return brewerys.map((brewery: ApiModel) =>{ return {     id: brewery.id,

      name: brewery.name ??'',

      city: brewery.city,       
      state: brewery.state,
      country: brewery.country,

      breweryType: brewery.brewery_type,

      address: [brewery.address_1, brewery.address_2, brewery.address_3].filter(Boolean).join(', '),

      postalCode: brewery.postal_code,  

      longitude: brewery.longitude ? brewery.longitude.toString() : '',
      latitude: brewery.latitude ? brewery.latitude.toString() : '',
      phone: brewery.phone ? parseInt(brewery.phone.replace(/\D/g, '')) : 0,
      websiteUrl: brewery.website_url || '',
      street: brewery.street || '',
    }}) ;
  
}
}

