import { TestBed } from '@angular/core/testing';

import { ThreadApiService } from './thread-api.service';

describe('ThreadApiService', () => {
  let service: ThreadApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThreadApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
