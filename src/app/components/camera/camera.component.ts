import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { WebcamModule } from 'ngx-webcam';
import { Observable, Subject } from 'rxjs';
import { CardComponent } from '../../shared/components/card';

@Component({
  selector: 'camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.scss'],
})
export class CameraComponent {
  public trigger: Subject<void> = new Subject<void>();
  imageTaken: null;
  width: number;
  height: number;

  constructor() {}

  public onImageCapture(event) {
    this.imageTaken = event._imageAsDataUrl;
  }

  public handleInitError($event): void {
    console.log($event);
  }
}
