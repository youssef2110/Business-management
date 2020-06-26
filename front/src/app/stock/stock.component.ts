import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http'; 
import { NgForm } from '@angular/forms';
import 'rxjs/Rx'
import Swal from 'sweetalert2';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.scss']
})
export class StockComponent implements OnInit {
  stoo = true;
  sor = false;
  ent = false;
  ajou = false;
  ediit = false;
  title = "Stock"
  load = false ;
  stock ;
  stocke ;
  stocks ;
  type ;
  nomp ;
  private stk;
  config = {
    itemsPerPage: 5,
    currentPage: 1,
  };
  Edit = [];
  num ; Tex ; nom ; Type ; prix ; nbrstock ;
  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get('/api/getstock')
      .subscribe( res => {
        this.stock = res; 
        this.load = true;
      });
      this.http.get('/api/getstocke')
      .subscribe( res => {
        this.stocke = res; 
        this.load = true;
      });
      this.http.get('/api/getstocks')
      .subscribe( res => {
        this.stocks = res; 
        this.load = true;
      });
  }
  showst(){
    this.stoo = true;
    this.sor = false;
    this.ent = false;
    this.ajou = false;
  }
  showe(){
    this.stoo = false;
    this.sor = false;
    this.ent = true;
    this.ajou = false;
  }
  shows(){
    this.stoo = false;
    this.sor = true;
    this.ent = false;
    this.ajou = false;
  }
  showa(){
    this.stoo = false;
    this.sor = false;
    this.ent = false;
    this.ajou = true;
  }
  Retour(){
    this.ediit = !this.ediit;
  }
  edit(num,nom,Type,prix,nbrstock){
    this.num = num; this.Tex = num
    this.nom = nom;
    this.Type = Type;
    this.prix = prix;
    this.nbrstock = nbrstock;
    this.ediit = !this.ediit;
  }
  edit2(f){
    this.http.post('/api/Editsto', f.value)
    .subscribe( res => {
    });
    location.replace('stock');
  }
  supp(num){
    this.http.get('/api/Delsto/'+num)
      .subscribe( res => {
      });
      location.replace('stock');
  }

  Addprod(f: NgForm){
    this.http.post('/api/Addproduit', f.value)
      .subscribe( res => {
        this.stk = res;
        if(this.stk[0].statue === 'Produit Ajouté'){
          Swal.fire({
            title: 'Ajouté',
            icon:'success',
            confirmButtonText: 'Okay'
          }).then((result) => {
            if (result.value) {
              location.replace('stock');
            }
          })
            ;
        }else{
          console.log('non')
        }
      });
  }
};


