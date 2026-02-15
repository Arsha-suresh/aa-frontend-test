import { TestBed } from '@angular/core/testing';

import { Store } from './store';

describe('Store', () => {
  let service: Store;
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
      {
        id: '11',
        name: 'second Brewery',
        city: ' second City',
        state: 'second State',
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

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Store);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it(`should update brewery data correctly`,(() => { 
    service.setBreweries(brewery);
    expect(service.breweries()).toEqual({10: brewery[0], 11: brewery[1]})
  })) ;
  
    it(`should update clearBreweries data correctly`,(() => { 
    service.clearBreweries();
    expect(service.breweries()).toEqual({});
  }));
});
