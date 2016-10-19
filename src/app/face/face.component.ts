import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {FaceUploadService} from "./face-upload.service";

@Component({
  selector: 'app-face',
  templateUrl: './face.component.html',
  styleUrls: ['./face.component.css']
})
export class FaceComponent implements OnInit {

  genders = [
    'M',
    'F'
  ];

  glasses = [
    'None',
    'WithFrame',
    "WithoutFrame"
  ];

  eyebrows = [
    'Exposed',
    'Hidden'
  ];

  faceAttrForm: FormGroup;



  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private faceUploadService: FaceUploadService) {
    this.faceAttrForm = formBuilder.group({
      'gender': ['M'],
      'glasses': ['None'],
      'eyebrows': ['Exposed']
    });
  }

  ngOnInit() {
  }

  onSubmit() {
    this.faceUploadService.setFaceAttributes(
      this.faceAttrForm.value['gender'],
      this.faceAttrForm.value['glasses'],
      this.faceAttrForm.value['eyebrows']
    );
    this.router.navigate(['/video']);
  }

}
