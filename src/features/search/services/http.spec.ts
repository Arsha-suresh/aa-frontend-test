import { TestBed } from '@angular/core/testing';

import { Http } from './http';
import { ApiModel } from '../models/apiModel';
import { HttpParams } from '@angular/common/http';

describe('Http', () => {
  let service: Http;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Http);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should fetch breweries based on query', async () => {
    const query = 'san';
    const result = await service.get<ApiModel[]>(`https://api.openbrewerydb.org/breweries?by_name=${query}`);
    expect(result).toBeDefined();
  });
  it('it should test buildParams',()=>{
      const httpparams: HttpParams = service['buildParams']({query:'Query'})
      expect(httpparams.get('query')).equal('Query');
  });
});
