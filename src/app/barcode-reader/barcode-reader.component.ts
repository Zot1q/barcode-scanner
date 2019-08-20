import { Component, OnInit, OnDestroy } from '@angular/core';
import { BarcodeReaderService } from '../barcode-reader.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-barcode-reader',
  templateUrl: './barcode-reader.component.html',
  styleUrls: ['./barcode-reader.component.css']
})
export class BarcodeReaderComponent implements OnInit, OnDestroy {

  public constructor(private barcodeReader : BarcodeReaderService) {
   }
  
  private subscription : Subscription;

  public ngOnInit() : void {
  }

  public ngAfterViewInit() : void {
    this.subscription = this.barcodeReader.barcodeResultOb$.subscribe(
    result => console.log('test' + result)
    );
  }

  public ngOnDestroy() : void {
    //this.barcodeReader.stopRead();
    //this.subscription.unsubscribe();
  }

  public playScanCompleteSound() : void
  {
    let audio = new Audio();
    audio.src= '../assets/audio/scanner-beep.mp3'
    audio.load();
    audio.play();
  }

  public playScanErrorSound() : void
  {
    let audio = new Audio();
    audio.src = '../assets/audio/error-sound.mp3'
    audio.load();
    audio.play();
  }

}
