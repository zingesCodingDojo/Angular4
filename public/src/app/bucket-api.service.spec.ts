import { TestBed, inject } from '@angular/core/testing';

import { BucketAPIService } from './bucket-api.service';

describe('BucketAPIService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BucketAPIService]
    });
  });

  it('should be created', inject([BucketAPIService], (service: BucketAPIService) => {
    expect(service).toBeTruthy();
  }));
});
