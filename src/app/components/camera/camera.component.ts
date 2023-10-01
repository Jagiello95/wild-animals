import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { WebcamModule } from 'ngx-webcam';
import { Observable, Subject } from 'rxjs';
import { CardComponent } from '../../shared/components/card';
import { QueryService } from 'src/app/http/query.service';
import { Router } from '@angular/router';

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

  constructor(public queryService: QueryService, public router: Router) {}

  public onImageCapture(event) {
    this.imageTaken = event.imageAsBase64;
    console.log(event);
    this.queryService.postImg(this.imageTaken).subscribe(console.log);
  }

  public handleInitError($event): void {
    console.log($event);
  }

  public importFile($event) {
    const file = $event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result.slice(23);
      this.imageTaken = result as any;
      this.queryService.postImg(result).subscribe((data) => {
        const { concreteSpecies, spieciesCategory, incidentType } = data as any;

        this.router.navigate(['/add'], {
          state: {
            concreteSpecies,
            spieciesCategory,
            incidentType,
            image: this.imageTaken,
          },
        });
      });
    };
  }
}
