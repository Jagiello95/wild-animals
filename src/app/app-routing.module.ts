import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryComponent } from './components/category/category.component';
import { CategoryTwoComponent } from './components/category-two/category-two.component';

const routes: Routes = [
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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
