import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpApiUrlConfigModule } from './config/http-api-url-config.module';
import { PayoutsSevices } from './services/payouts.services';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule, HttpApiUrlConfigModule],
  providers: [PayoutsSevices],
  bootstrap: [AppComponent],
})
export class AppModule {}
