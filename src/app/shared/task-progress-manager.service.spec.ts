import { TestBed } from '@angular/core/testing';

import { TaskProgressManagerService } from './task-progress-manager.service';

describe('TaskProgressManagerService', () => {
  let service: TaskProgressManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskProgressManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
