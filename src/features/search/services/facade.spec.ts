import { TestBed } from '@angular/core/testing';

import { Facade } from './facade';
import { Adapter } from './adapter';
import { Http } from './http';
import { ApiModel } from '../models/apiModel';
import { of } from 'rxjs';

describe('Facade', () => {
  let service: Facade;
    const brewery = [
      {
        id: '10',
        name: 'Full Brewery',
        city: 'Full City',
        state: 'Full State',
        country: 'Country X',
        breweryType: 'micro',
        address: '123 Main St, Suite 4',
        postalCode: '98765',
        longitude: '-12.345',
        latitude: '67.89',
        phone: 1234567890,
        websiteUrl: 'https://example.com',
        street: 'Main St'
      },
    ];
    const apiResponse: ApiModel[] = [
          {
            id: '10',
            name: 'Full Brewery',
            city: 'Full City',
            state: 'Full State',
            country: 'Country X',
            brewery_type: 'micro',
            address_1: '123 Main St',
            address_2: 'Suite 4',
            address_3: '',
            postal_code: '98765',
            longitude: -12.345,
            latitude: 67.89,
            phone: '(123) 456-7890',
            website_url: 'https://example.com',
            street: 'Main St',
            state_province: 'Full State'
          },
        ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{provide: Adapter, useValue: {
        generateBreweryModel: () => brewery}},
      {provide : Http, useValue: {
        get: () => of({data: apiResponse})
      }}
    ]});  
    
    service = TestBed.inject(Facade);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch and adapt brewery data correctly', async () => {
    const service = TestBed.inject(Facade);
     service.searchBreweries('test')?.subscribe((data) => {
      expect(data).toEqual(brewery);
    });
  });
});
