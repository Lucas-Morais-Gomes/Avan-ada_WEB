import { TestBed } from '@angular/core/testing';

import { MentorService } from '../services/mentor.service';

describe('MentorService', () => {
  let service: MentorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MentorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
