/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { StimulusService } from './stimulus.service';

describe('Service: Stimulus', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StimulusService]
    });
  });

  it('should ...', inject([StimulusService], (service: StimulusService) => {
    expect(service).toBeTruthy();
  }));
});
