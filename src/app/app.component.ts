import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'barcode-scanner';

  public isEnabled : boolean = false;
  toggleCamera(){
    if (this.isEnabled) {
      this.isEnabled = false;
    }
    else {
      this.isEnabled = true;
    }
  }
}
