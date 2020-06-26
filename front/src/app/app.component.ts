import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  user = JSON.parse(localStorage.getItem("user"));
  Etat : boolean;
  Ser : boolean;
  Ser2 : boolean;
  constructor() { }

  ngOnInit(){
    if (this.user === null) {
      this.Etat = false;
      this.Ser = false;
    }else{
      if(this.user.Etat) {
        this.Etat = true;
      }
      if (this.user.service != "Admin") {
        this.Ser = true;
      }
      if (this.user.service === "Admin") {
        this.Ser2 = true;
      }
    }
    
  }
  
}

  
  