import { Component, OnInit } from '@angular/core';
import { ResolveEnd, Router } from '@angular/router';

@Component({
  selector: 'app-public',
  templateUrl: './public.component.html',
  styleUrls: ['./public.component.scss']
})
export class PublicComponent implements OnInit {

  // urlHome: boolean;
  float: boolean;

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    // console.log(this.router.url);

    if (this.router.url === '/') {
      this.float = true;
    } else {
      this.float = false;
    }


    // this.router.events.subscribe( routerData => {
    //   if(routerData instanceof ResolveEnd){
    //      if(routerData.url === '/'){
    //       this.float = true;
    //      } else {
    //       this.float = false;
    //      }
    //   }
    // })


  }

}
