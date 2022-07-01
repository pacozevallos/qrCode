import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'qrCode';

  constructor() { }

  ngOnInit(): void {
    // this.onresize();
  }

  // onresize() {
  //   window.innerHeight;
  // }
}
