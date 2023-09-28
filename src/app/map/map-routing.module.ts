import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MapContainerComponent } from './map-container/map-container.component';

const routes: Routes = [
  {
    path: '',
    component: MapContainerComponent,
    // data: {routes: Object.values(ArchitectureRoutes), mainRoute: 'architecture'},
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MapRoutingModule {}
