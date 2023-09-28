import { Component, ViewChildren, QueryList } from '@angular/core';
import { MapCircle } from '@angular/google-maps';

@Component({
  selector: 'app-map-container',
  templateUrl: './map-container.component.html',
  styleUrls: ['./map-container.component.scss'],
})
export class MapContainerComponent {
  @ViewChildren(MapCircle) map_circles: QueryList<MapCircle>;
  comp: MapCircle;
  zoom = 12;
  markers = [];
  ConCircles = [];
  center: google.maps.LatLngLiteral;
  options: google.maps.MapOptions = {
    mapTypeId: 'hybrid',
    zoomControl: false,
    scrollwheel: false,
    disableDoubleClickZoom: true,
    maxZoom: 15,
    minZoom: 8,
  };

  ngOnInit() {
    this.center = {
      lat: 51.75,
      lng: 19.46,
    };
    // navigator.geolocation.getCurrentPosition((position) => {
    //   this.center = {
    //     lat: position.coords.latitude,
    //     lng: position.coords.longitude,
    //   };
    // });

    this.addMarker();
    this.ConCircles.push({
      center: this.center,
      options: {
        fillColor: 'red',
        strokeWeight: 1,
        fillOpacity: 0.8,
        editable: true,
        draggable: true,
        clickable: true,
      } as google.maps.CircleOptions,
      radius: (1 * 1000) as number,
    });
  }

  zoomIn() {
    if (this.zoom < this.options.maxZoom) this.zoom++;
  }

  zoomOut() {
    if (this.zoom > this.options.minZoom) this.zoom--;
  }

  addMarker() {
    this.markers.push({
      position: {
        lat: this.center.lat,
        lng: this.center.lng,
      },
      label: {
        color: 'red',
        text: 'Marker label ' + (this.markers.length + 1),
      },
      title: 'Marker title ' + (this.markers.length + 1),
      options: { animation: google.maps.Animation.BOUNCE },
    });
  }

  circleCenterChanged(args: any, c: any, idx: number): void {
    console.log(this.map_circles?.toArray()[idx]);
  }

  circleRadiusChanged(args: any, c: any, idx: number): void {
    console.log(this.map_circles?.toArray()[idx]);
  }
}
