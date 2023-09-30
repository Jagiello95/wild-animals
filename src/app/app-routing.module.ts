import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryComponent } from './components/category/category.component';
import { CategoryTwoComponent } from './components/category-two/category-two.component';
import { HomeComponent } from './components/home/home.component';
import { CameraComponent } from './shared/components/camera/camera.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    data: { animation: '0' },
  },
  {
    path: '1',
    loadChildren: () =>
      import('./section/section.module').then((m) => m.SectionModule),
    data: { animation: '1' },
  },
  {
    path: '2',
    loadChildren: () =>
      import('./section-two/section-two.module').then(
        (m) => m.SectionTwoModule
      ),
    data: { animation: '2' },
  },
  {
    path: '3',
    loadChildren: () => import('./map/map.module').then((m) => m.MapModule),
    data: { animation: '3' },
  },
  {
    path: '4',
    component: CameraComponent,
    data: { animation: '0' },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
