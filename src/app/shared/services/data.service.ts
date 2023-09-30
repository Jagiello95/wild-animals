import { Injectable } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  public isMobile: boolean = false;
  constructor(public detector: DeviceDetectorService) {
    this.isMobile = this.detector.isMobile();
  }
}
