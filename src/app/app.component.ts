import { Component, OnInit, OnDestroy } from '@angular/core';
import { BarcodeReaderService } from './barcode-reader.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public title = 'barcode-scanner';
  public barcodeResult: string;

  public constructor(private barcodeReaderService: BarcodeReaderService, private route: ActivatedRoute){
  }

  public startRead() : void {
    this.barcodeReaderService.isCameraScannerVisible();
    this.barcodeReaderService.startRead("");
  }

  
  public get isBarcodeReaderVisible() : boolean {
    return this.barcodeReaderService.isBarcodeReaderVisible;
  }
  ngOnInit(): void{
    this.route.queryParams.subscribe(params => {
    this.barcodeResult = params['barcodeResult'];
    console.log(this.barcodeResult);
  });
  }
  ngOnDestroy(): void {
    //From the official documentation: Do I need to unsubscribe? The Router manages the observables 
    //it provides and localizes the subscriptions. The subscriptions are cleaned up when the component 
    //is destroyed, protecting against memory leaks, so we don't need to unsubscribe from the route 
    //params Observable.
  }
}

