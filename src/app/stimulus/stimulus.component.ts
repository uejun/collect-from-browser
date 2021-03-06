import { Component, OnInit } from '@angular/core';
import {StimulusService} from "./stimulus.service";
import {Stimulus} from "./stimulus";
import {FaceUploadService} from "../face/face-upload.service";
import {User} from "../user/user";

@Component({
  selector: 'app-stimulus',
  templateUrl: './stimulus.component.html',
  styleUrls: ['./stimulus.component.css']
})
export class StimulusComponent implements OnInit {


  private currentStimulus: Stimulus;
  stimuli: any[];
  private index = 0;
  private instruction: string;
  errorMessage: any;
  private user: User;
  public restCount = 160;

  constructor(private stimulusService: StimulusService, private faceUploadService: FaceUploadService) { }

  ngOnInit() {
    this.user = this.faceUploadService.getUser();
    this.retrieveStimuli(this.user.user_id);
  }

  retrieveStimuli(user_id: number) {
    this.stimulusService.retrieveStimuli(user_id)
      .subscribe(
        stimuli => {
          this.stimuli=stimuli;
          this.restCount = this.stimuli.length;
          this.currentStimulus = this.stimuli[this.index];
          this.setInstruction();
          this.faceUploadService.setStimulus(this.currentStimulus);
        },
        error =>  this.errorMessage = <any>error
      );
  }

  setInstruction() {
    switch (this.currentStimulus.emotion) {
      case "happiness":
        this.instruction = "HAPPINESS (幸せ)";
        break;
      case "neutral":
        this.instruction = "NEUTRAL (無表情)";
        break;
      case "sadness":
        this.instruction = "SAD (悲しみ)";
        break;
      case "anger":
        this.instruction = "ANGER (怒り)";
        break;
      case "surprise":
        this.instruction = "SURPRISE (驚き)";
        break;
      case "disgust":
        this.instruction = "DISGUST (嫌悪・不快・いらだち)";
        break;
      case "contempt":
        this.instruction = "CONTEMPT (軽蔑・さげすみ)";
        break;
      case "fear":
        this.instruction = "FEAR (恐怖)";
        break;
    }
  }

  next() {
    this.index += 1;
    this.currentStimulus = this.stimuli[this.index];
    this.setInstruction();
    this.faceUploadService.setStimulus(this.currentStimulus);
    this.restCount -= 1;
  }

  hasNext() {
    return this.index + 1 < this.stimuli.length
  }


}
