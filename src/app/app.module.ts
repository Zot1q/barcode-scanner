import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { BarcodeReaderComponent } from './barcode-reader/barcode-reader.component';
import { InsertContainerInLocationComponent } from './insert-container-in-location/insert-container-in-location.component';

@NgModule({
  declarations: [
    AppComponent,
    BarcodeReaderComponent,
    InsertContainerInLocationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
