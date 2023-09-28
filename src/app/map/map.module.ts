import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapContainerComponent } from './map-container/map-container.component';
import { MapRoutingModule } from './map-routing.module';
import { GoogleMapsModule } from '@angular/google-maps';
import { MatButtonModule } from '@angular/material/button';
const matModules = [MatButtonModule];

@NgModule({
  declarations: [MapContainerComponent],
  imports: [CommonModule, MapRoutingModule, GoogleMapsModule, MatButtonModule],
})
export class MapModule {}
