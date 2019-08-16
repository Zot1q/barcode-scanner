import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BarcodeReaderService {
  
  private _isBarcodeReaderVisible: boolean = false;
  public get isBarcodeReaderVisible(): boolean {
      return this._isBarcodeReaderVisible;
  }
  // Snak om ReplaySubject vs ReplaySubject
  private _barcodeResultOb$ = new ReplaySubject<string>();
  public readonly barcodeResultOb$ = this._barcodeResultOb$.asObservable();

  results : string[]
  public startRead() : void {
    if (this._isBarcodeReaderVisible) {
      this._isBarcodeReaderVisible = false;
    }
    else {
      this._isBarcodeReaderVisible = true;
      console.log('Barcode reader started');
      console.log('scanner barcode')
      console.log('decoder barcode')
      for (let i = 0; i < 10; i++) {
        this.barcodeRead(i.toString());
        
      }
      //TODO Start reading barcode
      //scanBarcode();
      //decodeBarcode();

    };

    //TODO Start reading barcode
    //scanBarcode();
    //decodeBarcode();

  }
  public stopRead() : void {
    //TODO Stop reading barcode
  }


  public barcodeRead(result: string) : void {
    this._barcodeResultOb$.next(result);
  }
    

  
}
