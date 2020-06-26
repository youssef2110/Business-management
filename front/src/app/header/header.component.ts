import { Component, OnInit } from '@angular/core';
import * as moment from 'moment'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  user = JSON.parse(localStorage.getItem("user"));
  Etat :  boolean
  Date
  
  constructor() { }

  ngOnInit() {
    if (this.user === null) {
      this.Etat = false
    } 
    if(this.user.Etat) {
      this.Etat = true
    }
    setInterval(() => {
      this.Date = moment().format('MMMM Do YYYY, h:mm:ss a');
    } , 0 )
  }
  onLogout(){
    localStorage.removeItem("user");
    location.replace('/');
}

}
