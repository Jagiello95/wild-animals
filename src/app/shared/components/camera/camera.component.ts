import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
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
  width: number;
  height: number;

  @HostListener('window:resize', ['$event'])
  onResize(event?: Event) {
    const win = !!event ? (event.target as Window) : window;
    this.width = win.innerWidth;
    this.height = win.innerHeight;
  }

  constructor() {
    this.onResize();
  }

  public onImageCapture(event) {
    this.imageTaken = event._imageAsDataUrl;
  }

  public handleInitError($event): void {
    console.log($event);
  }
}
