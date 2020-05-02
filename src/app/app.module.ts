import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import 'hammerjs';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { GeolocationService } from './geolocation.service';
import { DataService } from './data.service';

import { AppComponent } from './app.component';
import { ListComponent } from './list/list.component';
import { CoffeeComponent } from './coffee/coffee.component';
import { from } from 'rxjs';


const routes: Routes = [
  {
    path: '',
    component: ListComponent
  },
  {
    path: 'coffee',
    component: CoffeeComponent,
  },
  {
    path: 'coffee/:id',
    component: CoffeeComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    CoffeeComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    RouterModule,
    HttpClientModule,
    MatButtonModule, MatIconModule, MatInputModule, MatSelectModule,
    MatSliderModule, MatToolbarModule, MatCardModule, MatSlideToggleModule,
    RouterModule.forRoot(routes)
  ],
  providers: [GeolocationService, DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
