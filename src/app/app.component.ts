import { Component, OnDestroy } from '@angular/core';
import { BarcodeReaderService } from './barcode-reader.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {
  public title = 'barcode-scanner';
  private subscription : Subscription;
  public barcodeResult: string;

  public constructor(private barcodeReaderService: BarcodeReaderService){
    this.subscription = this.barcodeReaderService.barcodeRead().subscribe(barcodeResult => {     
        this.barcodeResult = barcodeResult;
    });
  }

  public startRead() : void {
    this.barcodeReaderService.isCameraScannerVisible();
    this.barcodeReaderService.startRead("");
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();
}
  
  public get isBarcodeReaderVisible() : boolean {
    return this.barcodeReaderService.isBarcodeReaderVisible;
  }
  
}
