import { TestBed } from '@angular/core/testing';

import { Meteoserv } from './meteoserv';

describe('Meteoserv', () => {
  let service: Meteoserv;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Meteoserv);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
