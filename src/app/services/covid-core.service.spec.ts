import { TestBed } from '@angular/core/testing';

import { CovidCoreService } from './covid-core.service';

describe('CovidCoreService', () => {
  let service: CovidCoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CovidCoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
