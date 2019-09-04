import { Component, OnInit } from '@angular/core';
import { BarcodeReaderService } from './barcode-reader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public title = 'barcode-scanner';

  public constructor(private barcodeReaderService: BarcodeReaderService){
  }

  public startRead() : void {
    this.barcodeReaderService.isCameraScannerVisible();
    this.barcodeReaderService.startRead("");
  }
 
  public get isBarcodeReaderVisible() : boolean {
    return this.barcodeReaderService.isBarcodeReaderVisible;
  }

  ngOnInit(): void {
  }
}

