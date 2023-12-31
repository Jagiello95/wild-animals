import { Dialog } from '@angular/cdk/dialog';
import {
  Component,
  ViewChildren,
  QueryList,
  OnInit,
  NgZone,
  DestroyRef,
} from '@angular/core';
import * as Leaflet from 'leaflet';
import { MarkerPopupComponent } from './marker-popup/marker-popup.component';
import { MatDialog } from '@angular/material/dialog';
import { Observable, from, startWith } from 'rxjs';
import { DataService } from 'src/app/shared/services/data.service';
import { QueryService } from 'src/app/http/query.service';
import { DialogService } from 'src/app/shared/services/dialog.service';
import { FormBuilder, FormControl } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
Leaflet.Icon.Default.imagePath = 'assets/';

Leaflet.Icon.Default.imagePath = 'assets/';

@Component({
  selector: 'app-map-container',
  templateUrl: './map-container.component.html',
  styleUrls: ['./map-container.component.scss'],
})
export class MapContainerComponent implements OnInit {
  map!: Leaflet.Map;
  markers: Leaflet.Marker[] = [];
  options = null;

  public filter = this.fb.group({
    pets: [true],
    warn: [true],
    danger: [true],
  });

  ngOnInit(): void {
    this.dataService.getPosition().subscribe((data: any) => {
      this.dataService.currentPosition = data;

      const { lat, lng } = this.dataService.currentPosition;

      this.options = {
        layers: [
          Leaflet.tileLayer(
            'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
            {
              attribution:
                '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
            }
          ),
        ],
        zoom: 16,
        center: { lat, lng },
      };
    });
  }

  initMarkers() {
    // const initialMarkers = [
    //   {
    //     position: { lat: 28.625485, lng: 79.821091 },
    //     draggable: true,
    //   },
    //   {
    //     position: { lat: 28.625293, lng: 79.817926 },
    //     draggable: false,
    //   },
    //   {
    //     position: { lat: 28.625182, lng: 79.81464 },
    //     draggable: true,
    //   },
    // ];
    // for (let index = 0; index < initialMarkers.length; index++) {
    //   const data = initialMarkers[index];
    //   this.addMarker(data.position.lat, data.position.lng);
    // }
  }

  addMarker(lat: number, lng: number, type: any, id?: string): void {
    const data = {
      position: { lat, lng },
      draggable: false,
      type,
      id,
    };

    let icon;

    const marker = this.generateMarker(data);

    if (type === 'user') {
      icon = this.getUserIcon();
    } else if (type === 0) {
      icon = this.getPetsIcon(id);
    } else if (type === 1) {
      icon = this.getWarningIcon(id);
    } else {
      icon = this.getDangerIcon(id);
    }

    marker.addTo(this.map).setIcon(icon);
    // .bindPopup(`<b>${data.position.lat},  ${data.position.lng}</b>`);
    // this.map.panTo(data.position);
    this.markers.push(marker);
  }

  generateMarker(data: any) {
    return Leaflet.marker(data.position, { draggable: data.draggable })
      .on('click', (event) => this.markerClicked(event))
      .on('dragend', (event) => this.markerDragEnd(event));
  }

  onMapReady($event: Leaflet.Map) {
    this.map = $event;

    this.addMarker(
      this.dataService.currentPosition.lat,
      this.dataService.currentPosition.lng,
      'user'
    );

    this.filter.valueChanges
      .pipe(startWith(true), takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.markers.forEach((m: any) => {
          const type = m.options?.icon?.type;

          if (type === 'pets' && this.isOn('pets')) {
            return;
          }

          if (type === 'warn' && this.isOn('warn')) {
            return;
          }

          if (type === 'danger' && this.isOn('danger')) {
            return;
          }
          this.map.removeLayer(m);
        });

        this.addPoints();
      });
  }

  mapClicked($event: any) {}

  markerClicked($event: any) {
    const id = $event?.target?.options?.icon?.id;

    if (id) {
      this.queryService.getPointById(id).subscribe((data) => {
        this.dialogService.openMarkerDialog(data);
      });
    }
  }

  markerDragEnd($event: any) {}

  constructor(
    private dialogService: DialogService,
    private dataService: DataService,
    private queryService: QueryService,
    private fb: FormBuilder,
    private destroyRef: DestroyRef
  ) {}

  private getUserIcon(): any {
    return Leaflet.divIcon({
      className: 'custom-div-icon blinking',
      html: "<div style='background-color:#8bc34a;' class='marker-pin '></div><i class='material-icons'>person_pin</i>",
      iconSize: [30, 42],
      iconAnchor: [15, 42],
    });
  }

  private getPetsIcon(id: string): any {
    const icon: any = Leaflet.divIcon({
      className: 'custom-div-icon',
      html: "<div style='background-color:#8bc34a;' class='marker-pin '></div><i class='material-icons'>pets</i>",
      iconSize: [30, 42],
      iconAnchor: [15, 42],
    });

    icon.id = id;
    icon.type = 'pets';
    return icon;
  }

  private getWarningIcon(id: string): any {
    const icon: any = Leaflet.divIcon({
      className: 'custom-div-icon',
      html: "<div style='background-color:#ffcc00;' class='marker-pin '></div><i class='material-icons'>notification_important</i>",
      iconSize: [30, 42],
      iconAnchor: [15, 42],
    });

    icon.id = id;
    icon.type = 'warn';

    return icon;
  }

  private getDangerIcon(id: string): any {
    const icon: any = Leaflet.divIcon({
      className: 'custom-div-icon',
      html: "<div style='background-color:#f44336;' class='marker-pin '></div><i class='material-icons'>warning</i>",
      iconSize: [30, 42],
      iconAnchor: [15, 42],
    });

    icon.id = id;
    icon.type = 'danger';

    return icon;
  }

  private addPoints(): void {
    this.queryService.getPoints().subscribe((points: any) => {
      points.forEach((point) => {
        if (point.incidentType.incidentLevel === 0 && !this.isOn('pets')) {
          return;
        }

        if (point.incidentType.incidentLevel === 1 && !this.isOn('warn')) {
          return;
        }

        if (point.incidentType.incidentLevel === 2 && !this.isOn('danger')) {
          return;
        }

        if (point.x !== this.dataService.currentPosition.lat) {
          // const type = point.
          this.addMarker(
            point.x,
            point.y,
            point.incidentType.incidentLevel,
            point.id
          );
        }
      });
    });
  }

  public toggleControl(controlName): void {
    const control = this.filter.get(controlName);
    control.setValue(!control.value);
  }

  public isOn(controlName): boolean {
    return this.filter.get(controlName)?.value;
  }
}
