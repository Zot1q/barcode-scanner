import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BarcodeReaderService {
  
  private _isBarcodeReaderVisible: boolean = false;
  public get isBarcodeReaderVisible(): boolean {
      return this._isBarcodeReaderVisible;
  }

  private _barcodeResultOb$ = new Subject<string>();

  public startRead(barcodeResult: string) {
      this._barcodeResultOb$.next(barcodeResult);
  }
  public stopRead() : void {
    //TODO Stop reading barcode
    this._barcodeResultOb$.next();
  }

  public barcodeRead(): Observable<any> {
    return this._barcodeResultOb$.asObservable();
  }

  public isCameraScannerVisible(): void
  {
    if (this._isBarcodeReaderVisible) {
      this._isBarcodeReaderVisible = false;
    }
    else {
      this._isBarcodeReaderVisible = true;
    };
  }
}