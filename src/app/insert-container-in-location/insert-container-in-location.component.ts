import { Component, OnInit, OnDestroy } from '@angular/core';
import { BarcodeReaderService } from './../barcode-reader.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-insert-container-in-location',
  templateUrl: './insert-container-in-location.component.html',
  styleUrls: ['./insert-container-in-location.component.css']
})

export class InsertContainerInLocationComponent implements OnInit {
  private subscription : Subscription;
  public barcodeResult: string;

  public constructor(private barcodeReaderService: BarcodeReaderService, private route: ActivatedRoute){
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
    //From the official documentation: Do I need to unsubscribe? The Router manages the observables 
    //it provides and localizes the subscriptions. The subscriptions are cleaned up when the component 
    //is destroyed, protecting against memory leaks, so we don't need to unsubscribe from the route 
    //params Observable.
  }
  
  public get isBarcodeReaderVisible() : boolean {
    return this.barcodeReaderService.isBarcodeReaderVisible;
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.barcodeResult = params['barcodeResult'];
      console.log(this.barcodeResult);
    });
  }
}
