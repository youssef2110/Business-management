import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http'; 

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.scss']
})
export class AccueilComponent implements OnInit {
  load = false ;
  sortie ;
  entree ;
  stock ;
  stockr = [];
  stocka =[];
  alert ; 
  rupture ;
  stockl;
  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get('/api/getstocks')
      .subscribe( res => {
        this.sortie = res; 
        this.load = true;
      });
      this.http.get('/api/getstocke')
      .subscribe( res => {
        this.entree = res; 
        this.load = true;
      });
      this.http.get('/api/getstock')
      .subscribe( res => {
        this.stock = res; 
        this.load = true;
        this.stockl = this.stock.length;
        var b = 0;
        var c = 0;
        for (var a in this.stock) {
          if (this.stock[a].stock <= 5) {
            if (this.stock[a].stock === 0 ) {
              this.stockr[c] = this.stock[a];
              c = c + 1;
            }else{
            this.stocka[b] = this.stock[a];
            b = b + 1;
            }
          }
        }
        this.rupture = this.stockr.length;
        this.alert = this.stocka.length;
      });
      
      
  }



  
}
