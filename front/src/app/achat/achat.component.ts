import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http'; 
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-achat',
  templateUrl: './achat.component.html',
  styleUrls: ['./achat.component.scss']
})
export class AchatComponent implements OnInit {
  title = "Achats"
  load = false ;
  achats ;
  Fourn ;
  ss = true;
  re = true;
  cc = true;
  achatr = [];
  rechc ;
  stocks ;
  nbr =1 ;
  Nomf; date ;Ref; type; ID; produit = [];spro = {};total = 0;
  private ac;
  detailfourn = {};  
  config = {
    itemsPerPage: 5,
    currentPage: 1,
  };
  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get('/api/getachat')
      .subscribe( res => {
        this.achats = res;
        this.load = true;
      });
      this.http.get('/api/getfournisseur')
      .subscribe( res => {
        this.Fourn = res;
        this.load = true;
      });
      this.http.get('/api/getstock')
      .subscribe( res => {
        this.stocks = res;
      });
  }
  createRange(number){
    var items: number[] = [];
    for(var i = 1; i <= number; i++){
       items.push(i);
    }
    return items;
  }
  search(){
    this.re = !this.re;
    var i = 0;
    for(var ch in this.achats){
      if(this.achats[ch].Nomf === this.rechc){
        this.achatr[i] = this.achats[ch];
        i++;
      };
    }
  }
  s(){
    this.ss = !this.ss;
  }
  s2(){
    this.re = !this.re;
    this.rechc = "";
    this.achatr = [];
  }
  s3(){
    this.cc = !this.cc;
    this.produit = [];
    this.total = 0 ;
    this.spro = {};
    this.detailfourn = {};
  }
  det(Ref,Nomf,date,ID,Produit){
    this.Nomf = Nomf ;
    this.ID = ID ;
    this.date = date;
    this.Ref = Ref;
    for(var a in this.stocks){
      for(var b in Produit){
        if(this.stocks[a].Nom === Produit[b].Nomp){
          Produit[b].prix = this.stocks[a].Prix ;
        }
      }
      
    }
    for(var ch in Produit){
      this.produit[ch]=Produit[ch] ;
      this.total = this.total + Produit[ch].quantite * Produit[ch].prix
  }
  for (var c in this.Fourn) {
    if (this.Fourn[c].Nom === Nomf) {
      this.detailfourn = this.Fourn[c];
    }
  }
  this.cc = !this.cc;
  }
  
Addachat(f: NgForm){
  this.http.post('/api/Addachat', f.value)
    .subscribe( res => {
      this.ac = res;
      if(this.ac[0].statue === 'Ajouté'){
        Swal.fire({
          title: 'Ajouté',
          icon:'success',
          confirmButtonText: 'Okay'
        }).then((result) => {
          if (result.value) {
            location.replace('achat');
          }
        })
      }else{
        console.log('non')
      }
    });
}
  
}
