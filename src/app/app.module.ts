import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { LayoutComponent } from './components/layout/layout.component';
import { SectionModule } from './section/section.module';
import { CategoryComponent } from './components/category/category.component';
import { CategoryTwoComponent } from './components/category-two/category-two.component';
import { SectionTwoModule } from './section-two/section-two.module';
import { HomeComponent } from './components/home/home.component';
import { CardComponent } from './shared/components/card/card.component';
import { HttpClientModule } from '@angular/common/http';

const matModules = [MatButtonModule, MatCardModule];
const standalone = [CardComponent];
@NgModule({
  declarations: [
    AppComponent,
    CategoryComponent,
    CategoryTwoComponent,
    LayoutComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SectionModule,
    SectionTwoModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ...matModules,
    ...standalone,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
