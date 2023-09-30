import { Dialog } from '@angular/cdk/dialog';
import { Component, ViewChildren, QueryList, OnInit } from '@angular/core';
import * as Leaflet from 'leaflet';
import { MarkerPopupComponent } from './marker-popup/marker-popup.component';
import { MatDialog } from '@angular/material/dialog';
import { Observable, from } from 'rxjs';
import { DataService } from 'src/app/shared/services/data.service';

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

  ngOnInit(): void {
    this.dataService.getPosition().subscribe(({ lng, lat }: any) => {
      console.log(lng, lat);
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
    const initialMarkers = [
      {
        position: { lat: 28.625485, lng: 79.821091 },
        draggable: true,
      },
      {
        position: { lat: 28.625293, lng: 79.817926 },
        draggable: false,
      },
      {
        position: { lat: 28.625182, lng: 79.81464 },
        draggable: true,
      },
    ];
    for (let index = 0; index < initialMarkers.length; index++) {
      const data = initialMarkers[index];
      const marker = this.generateMarker(data, index);
      marker
        .addTo(this.map)
        .bindPopup(`<b>${data.position.lat},  ${data.position.lng}</b>`);
      // this.map.panTo(data.position);
      this.markers.push(marker);
    }
  }

  generateMarker(data: any, index: number) {
    return Leaflet.marker(data.position, { draggable: data.draggable })
      .on('click', (event) => this.markerClicked(event, index))
      .on('dragend', (event) => this.markerDragEnd(event, index));
  }

  onMapReady($event: Leaflet.Map) {
    this.map = $event;
    this.initMarkers();
  }

  mapClicked($event: any) {
    console.log($event.latlng.lat, $event.latlng.lng);
  }

  markerClicked($event: any, index: number) {
    this.dialog.open(MarkerPopupComponent, {
      height: '400px',
      width: '600px',
    });
    console.log($event.latlng.lat, $event.latlng.lng);
  }

  markerDragEnd($event: any, index: number) {
    console.log($event.target.getLatLng());
  }

  constructor(private dialog: MatDialog, private dataService: DataService) {}
}
