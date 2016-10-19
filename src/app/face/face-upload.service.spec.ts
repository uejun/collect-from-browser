/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { FaceUploadService } from './face-upload.service';

describe('Service: FaceUpload', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FaceUploadService]
    });
  });

  it('should ...', inject([FaceUploadService], (service: FaceUploadService) => {
    expect(service).toBeTruthy();
  }));
});
