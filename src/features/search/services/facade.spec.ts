import { TestBed } from '@angular/core/testing';

import { Facade } from './facade';

describe('Facade', () => {
  let service: Facade;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Facade);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
