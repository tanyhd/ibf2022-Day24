import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import {WebcamImage, WebcamInitError, WebcamUtil, WebcamMirrorProperties} from 'ngx-webcam';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-snap-shot',
  templateUrl: './snap-shot.component.html',
  styleUrls: ['./snap-shot.component.css']
})
export class SnapShotComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  public mirrorProperties: string = "never"
  public imageCapture: boolean = true

  // latest snapshot
  public webcamImage!: WebcamImage;
  public webcanImageToSend!: string;

  // toggle webcam on/off
  public showWebcam = true;

  // webcam snapshot trigger
  private trigger: Subject<void> = new Subject<void>();

  public triggerSnapshot(): void {
    this.trigger.next();
  }

  public toggleWebcam(): void {
    this.showWebcam = !this.showWebcam;
  }

  public handleImage(webcamImage: WebcamImage): void {
    console.info('received webcam image', webcamImage);
    this.webcamImage = webcamImage;
    console.info(this.webcamImage.imageData); //upload this data?
    this.webcanImageToSend = this.webcamImage.imageAsDataUrl;
  }

  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }

  toPost() {
    this.router.navigate(['/post'], {state: {data: this.webcanImageToSend}})
  }
}
