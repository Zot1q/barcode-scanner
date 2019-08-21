import { Component, OnInit, OnDestroy, ViewChild, ViewChildren, ElementRef } from '@angular/core';
import { BarcodeReaderService } from '../barcode-reader.service';
import { interval, timer, Subscription } from 'rxjs';
// To communicate with WASM and js glue-code from component to html view
declare var Module: any;

@Component({
  selector: 'app-barcode-reader',
  templateUrl: './barcode-reader.component.html',
  styleUrls: ['./barcode-reader.component.css']
})
export class BarcodeReaderComponent implements OnInit {
  @ViewChild("video", {static: false})
  public videoElement: ElementRef;

  @ViewChild("pcCanvas", {static:false})
  public canvas: ElementRef;
  public ctx: CanvasRenderingContext2D;
    
  @ViewChild("mobileCanvas", {static:false})
  public mobileCanvas: ElementRef;
  public mobileCtx: CanvasRenderingContext2D;
  
  public barcode_result: string;
  public videoWidth = 640;
  public videoHeight = 480;
  public mobileVideoWidth = 240;
  public mobileVideoHeight = 320;
  public isPC: boolean = true;
  public decodePtr: any;


  public constructor(private barcodeReaderService : BarcodeReaderService) {  
   }
  
  public ngOnInit() : void {
  }

  public ngAfterViewInit() : void {
    this.getCamera({video: true, audio: false, facingMode: 'environment'});
    // adding decode function to zxing module
    this.decodePtr = Module.Runtime.addFunction(this.decodeCallback);
    this.startScanBarcode();
  }
  public ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
     // unsubscribe to ensure no memory leaks
     //this.barcodeReaderService.stopRead();
  }
  public startScanBarcode = (): void =>  {  
    this.checkDeviceType();
    if (this.isPC) {
      this.canvas.nativeElement.style.display = 'none';
    } 
    else {
      this.mobileCanvas.nativeElement.style.display = 'none';
    }  
    this.scanBarcode();  
  }
 
  public scanBarcode = (): void => {
    if (Module == null) {
      alert("Barcode Reader is not ready!");
      return;
    }
    let context = null,
      width = 0,
      height = 0,
      Canvas = null;
    
    if (this.isPC) {
      context = this.ctx;
      width = this.videoWidth;
      height = this.videoHeight;
      Canvas = this.canvas.nativeElement;
    } else {
      context = this.mobileCtx;
      width = this.mobileVideoWidth;
      height = this.mobileVideoHeight;
      Canvas = this.mobileCanvas.nativeElement;
    }
    context = this.canvas.nativeElement.getContext("2d").drawImage(this.videoElement.nativeElement, 0, 0, width, height);

    console.log("video width: " + width + ", height: " + height);
    let barcodeCanvas =  this.canvas.nativeElement;
    barcodeCanvas.width = width;
    barcodeCanvas.height = height;
    let barcodeContext = barcodeCanvas.getContext('2d');
    let imageWidth = width, imageHeight = height;
    barcodeContext.drawImage(this.videoElement.nativeElement, 0, 0, imageWidth, imageHeight);
    // read barcode
    let imageData = barcodeContext.getImageData(0, 0, imageWidth, imageHeight);
    let idd = imageData.data;
    let image = Module._resize(imageWidth, imageHeight);
    console.time("decode barcode");
    for (let i = 0, j = 0; i < idd.length; i += 4, j++) {
      Module.HEAPU8[image + j] = idd[i];
    }
    let err = Module._decode_any(this.decodePtr);
    console.timeEnd('decode barcode');
    console.log("error code", err);
    if (err == -2) {
      setTimeout(this.scanBarcode, 50);
    }
    }
     
   public decodeCallback =  (ptr, len, resultIndex, resultCount) : void => {
    let result = new Uint8Array(Module.HEAPU8.buffer, ptr, len);
    this.barcode_result = String.fromCharCode.apply(null, result);
    this.barcodeReaderService.startRead(this.barcode_result);
    console.log(this.barcode_result);
    this.playScanCompleteSound();
    console.log("scan succeeded");
    setTimeout(this.scanBarcode, 1000);
  }

  // check devices
  public checkDeviceType = (): void => {
  let deviceType;
  const sUserAgent = navigator.userAgent.toLowerCase(); 
  const bIsIpad = sUserAgent.match(/ipad/i);
  const bIsIphoneOs = sUserAgent.match(/iphone os/i);
  const bIsMidp = sUserAgent.match(/midp/i);
  const bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i);
  const bIsUc = sUserAgent.match(/ucweb/i);
  const bIsAndroid = sUserAgent.match(/android/i);
  const bIsCE = sUserAgent.match(/windows ce/i);
  const bIsWM = sUserAgent.match(/windows mobile/i);
  if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
    deviceType = 'phone';
    this.isPC = false;
  } else {
    deviceType = 'pc';
    this.isPC = true;
  }
  console.log("deviceType:" + deviceType);
  }
  
  public getCamera = (config:any): void =>{
    let browser = <any>navigator;
  
      browser.getUserMedia = browser.getUserMedia ||
        browser.webkitGetUserMedia ||
        browser.mozGetUserMedia ||
        browser.msGetUserMedia;
  
        if(browser.mediaDevices && browser.mediaDevices.getUserMedia) {
          browser.mediaDevices.getUserMedia({ video: true,  facingMode: 'environment'}).then(stream => {
              this.videoElement.nativeElement.stream = stream;   
              this.videoElement.nativeElement.srcObject = stream;
          });
      }
  }
  
  public handleError = (error) : void =>{
  console.log('Error: ', error);
  }

  public playScanCompleteSound = (): void =>
  {
    let audio = new Audio();
    audio.src= '../assets/audio/scanner-beep.mp3'
    audio.load();
    audio.play();
  }

  public playScanErrorSound = (): void =>
  {
    let audio = new Audio();
    audio.src = '../assets/audio/error-sound.mp3'
    audio.load();
    audio.play();
  }
}