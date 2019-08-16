import { Component, OnInit } from '@angular/core';
import { BarcodeReaderService } from '../barcode-reader.service';

@Component({
  selector: 'app-barcode-reader',
  templateUrl: './barcode-reader.component.html',
  styleUrls: ['./barcode-reader.component.css']
})
export class BarcodeReaderComponent implements OnInit {

  public constructor(private barcodeReader : BarcodeReaderService) {
   }

  public ngOnInit() {
    //StartRead();
    this.barcodeReader.barcodeResultOb$.subscribe(
      result => console.log('Barcode result: ' + result)
    )



  }
  //ScanBarcode()
  //DecodeBarcode();
  //Prop Barcode_Result
  //Metode
  //Metode

}
