import { TestBed } from '@angular/core/testing';

import { Adapter } from './adapter';
import { ApiModel } from '../models/apiModel';

describe('Adapter', () => {
  let service: Adapter;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Adapter);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
 

  it('should generate brewery model correctly (basic)', () => {
    const apiResponse: ApiModel[] = [
      { id: '1', name: 'Brewery One', city: 'City A', state: 'State A', country: '', brewery_type: '', address_1: '', address_2: '', address_3: '', postal_code: '', longitude: 0, 
        state_province:'',latitude: 0, phone: '', website_url: '', street: '' },
      { id: '2', name: 'Brewery Two', city: 'City B', state: 'State B', country: '', state_province:'',
        brewery_type: '', address_1: '', address_2: '', address_3: '', postal_code: '', longitude: 0, latitude: 0, phone: '', website_url: '', street: '' },
    ];
    const expectedOutput = [
      { id: '1', name: 'Brewery One', city: 'City A', state: 'State A', country: '', breweryType: '', address: '', postalCode: '', longitude: '', latitude: '', phone: 0, websiteUrl: '', street: '' },
      { id: '2', name: 'Brewery Two', city: 'City B', state: 'State B', country: '', breweryType: '', address: '', postalCode: '', longitude: '', latitude: '', phone: 0, websiteUrl: '', street: '' },
    ];

    const result = service.generateBreweryModel(apiResponse);
    expect(result).toEqual(expectedOutput);
  });

  it('should map all api fields and transform types correctly', () => {
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

    const expectedOutput = [
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

    const result = service.generateBreweryModel(apiResponse);
    expect(result).toEqual(expectedOutput);
  });

});
