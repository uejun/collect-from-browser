import {Component, OnInit, ElementRef} from '@angular/core';
import {ViewChild} from "@angular/core/src/metadata/di";
import {FaceUploadService} from "../face/face-upload.service";
import {StimulusComponent} from "../stimulus/stimulus.component";
import {Router} from "@angular/router";

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})
export class VideoComponent implements OnInit {

  private video;
  private canvas;
  private showvideo;
  private photo;
  private width = 640;
  private height = 480;
  private showwidth = 320;
  private showheight = 240;
  private streaming = false;
  private photoWidth = 400;
  private photoHeight = 300;
  private photoSrc = 'assets/your_art_here1.jpg';
  private pristine = true;
  private data;
  public uploading = false;
  @ViewChild('stimuluscomp') stimuluscomp: StimulusComponent;

  constructor(private faceUploadService: FaceUploadService, private router: Router) {
  }

  ngOnInit() {

    if (!this.faceUploadService.isReady()) {
     this.router.navigate(['/signin']);
    }

    navigator.mediaDevices.getUserMedia = navigator.mediaDevices.getUserMedia;
    window.URL = window.URL;

    this.video = document.getElementById('myvideo');
    this.canvas = document.getElementById('canvas');
    this.photo = document.getElementById('photo');
    this.showvideo = document.getElementById('showvideo');

    navigator.getUserMedia({video: true, audio: false},
      stream => {
        this.video.src = window.URL.createObjectURL(stream);
        this.showvideo.src = window.URL.createObjectURL(stream);
      },
      err => { // for error case
        console.log(err);
      }
    );
  }

  canPlay() {
    if (!this.streaming) {
      this.height = this.video.videoHeight / (this.video.videoWidth / this.width);
      if (isNaN(this.height)) {
        this.height = this.width / (4 / 3);
      }
      this.streaming = true;
    }
  }

  showImage() {
    this.data = this.canvas.toDataURL('image/png');
    this.photoSrc = this.data;
  }

  takePicture() {
    this.pristine = false;
    this.drawCanvas(this.canvas)
    this.showImage()
    // var context = this.canvas.getContext('2d');
    // if (this.width && this.height) {
    //   this.canvas.width = this.width;
    //   this.canvas.height = this.height;
    //   context.drawImage(this.video, 0, 0, this.width, this.height);
    //   this.data = this.canvas.toDataURL('image/png');
    //   this.photoSrc = this.data
    // } else {
    //   this.clearphoto();
    // }
  }

  drawCanvas(canvas) {
    var context = canvas.getContext('2d');
    if (this.width && this.height) {
      canvas.width = this.width;
      canvas.height = this.height;
      context.drawImage(this.video, 0, 0, this.width, this.height);
    } else {
      this.clearphoto();
    }
  }

  clearphoto() {
    var context = this.canvas.getContext('2d');
    context.fillStyle = "#AAA";
    context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    var data = this.canvas.toDataURL('image/png');
    this.photo.setAttribute('src', data);
  }

  postFace() {
    if (!this.faceUploadService.isReady()) {
      this.router.navigate(['/signin']);
    }

    this.uploading = true;
    setTimeout(()=>this.uploading=false, 1000);
    this.faceUploadService.uploadFace(this.data.replace(/^.*,/, ''));
    this.clearphoto();
    if (this.stimuluscomp.hasNext()) {
      this.stimuluscomp.next();
    } else {
      this.router.navigate(['/finished'])
    }
  }


}
