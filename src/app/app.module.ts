import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from '@auth0/auth0-angular';

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
import { ServiceWorkerModule } from '@angular/service-worker';
import { CameraComponent } from './shared/components/camera/camera.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

const matModules = [MatButtonModule, MatCardModule, MatIconModule];
const standalone = [CardComponent, CameraComponent];
@NgModule({
  declarations: [
    AppComponent,
    CategoryComponent,
    CategoryTwoComponent,
    LayoutComponent,
    HomeComponent,
    NavbarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    SectionModule,
    SectionTwoModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ...matModules,
    ...standalone,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000',
    }),
    AuthModule.forRoot({
      domain: 'dev-b8sfyb91.us.auth0.com',
      clientId: 'Z5yAH5junMOuqG3RgJLdX6kqc95MNajA',
      authorizationParams: {
        redirect_uri: window.location.origin,
      },
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
