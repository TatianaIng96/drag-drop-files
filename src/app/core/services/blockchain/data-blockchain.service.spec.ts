import { TestBed } from '@angular/core/testing';

import { DataBlockchainService } from './data-blockchain.service';

describe('DataBlockchainService', () => {
  let service: DataBlockchainService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataBlockchainService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
