import { Component } from '@angular/core';
import { BarcodeReaderService } from './barcode-reader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public title = 'barcode-scanner';

  public constructor(private barcodeReader: BarcodeReaderService){
  }

  public startRead() : void {
    this.barcodeReader.startRead();
  }

  
  
  public get isBarcodeReaderVisible() : boolean {
    return this.barcodeReader.isBarcodeReaderVisible;
  }
  
}
