import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  cc = false;
  constructor() { }

  ngOnInit() {
  }
  show(){
    if(this.cc){
      this.cc=false;
    }
    else{
      this.cc=true;
    }
    
  }

}
