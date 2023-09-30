import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { WebcamModule } from 'ngx-webcam';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.scss'],
  standalone: true,
  imports: [WebcamModule, MatButtonModule, CommonModule],
})
export class CameraComponent {
  trigger: Subject<void> = new Subject<void>();
  imageTaken: null;

  public onImageCapture(event) {
    this.imageTaken = event._imageAsDataUrl;
  }

  public handleInitError($event): void {
    console.log($event);
  }
}
