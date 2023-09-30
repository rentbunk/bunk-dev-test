import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { CommonModule } from '@angular/common';
import { TravelService } from './services/travel.service';
import { HttpModule } from './http.module';
import { environment } from '../environments/environment';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AddComponent } from './components/add/add.component';
import { ListComponent } from './pages/list/list.component';
import { ResultComponent } from './pages/result/result.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';

import { JsonPipe } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    AddComponent,
    ListComponent,
    ResultComponent,
    ProfileComponent,
    HeaderComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FormsModule,
    JsonPipe,
    HttpClientModule,
    CommonModule,
    HttpModule.forRoot({ environment }),
    FontAwesomeModule,
  ],

  providers: [TravelService],
  bootstrap: [AppComponent],
})
export class AppModule {}
