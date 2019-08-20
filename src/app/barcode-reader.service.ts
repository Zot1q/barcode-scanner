import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BarcodeReaderService {
  
  private _isBarcodeReaderVisible: boolean = false;
  public get isBarcodeReaderVisible(): boolean {
      return this._isBarcodeReaderVisible;
  }

  private _barcodeResultOb$ = new Subject<string>();
  public readonly barcodeResultOb$ = this._barcodeResultOb$.asObservable();

  public startRead() : void {
    if (this._isBarcodeReaderVisible) {
      this._isBarcodeReaderVisible = false;
    }
    else {
      this._isBarcodeReaderVisible = true;
      //TODO Start reading barcode
      //scanBarcode();
      //decodeBarcode();
      //this.barcodeRead(IndtastResultat.toString());
    };


  }
  public stopRead() : void {
    //TODO Stop reading barcode
  }


  public barcodeRead(result: string) : void {
    this._barcodeResultOb$.next(result);
  }
  
  
}
