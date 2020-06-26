import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import "rxjs/Rx";
import { Subscription } from "rxjs/Subscription";
import { NgForm } from "@angular/forms";
import * as moment from 'moment'

@Component({
  selector: "app-vente",
  templateUrl: "./vente.component.html",
  styleUrls: ["./vente.component.scss"]
})

export class VenteComponent implements OnInit {
  ss = true;
  re = true;
  cc = true;
  title = "Commandes client";
  load = false;
  ventes ;
  venter = [];
  clients;
  rechc;
  stocks;
  nbr = 1;
  Nomc;
  date;
  Refe;
  type;
  ID;
  produit = [];
  spro = {};
  total = 0;
  detailclient = {};
  private vt;
  config = {
    itemsPerPage: 5,
    currentPage: 1,
  };
  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get("/api/getvente").subscribe((res) => {
      this.ventes = res;
      this.load = true;
      
    });
    this.http.get("/api/getclient").subscribe((res) => {
      this.clients = res;
    });
    this.http.get("/api/getstock").subscribe((res) => {
      this.stocks = res;
    });
  }
    
  createRange(number) {
    var items: number[] = [];
    for (var i = 1; i <= number; i++) {
      items.push(i);
    }
    return items;
  }
  search() {
    this.re = !this.re;
    var i = 0;
    for (var ch in this.ventes) {
      if (this.ventes[ch].Nomc === this.rechc) {
        this.venter[i] = this.ventes[ch];
        i++;
      }
    }
  }
  s() {
    this.ss = !this.ss;
  }
  s2() {
    this.re = !this.re;
    this.rechc = "";
    this.venter = [];
  }
  s3() {
    this.cc = !this.cc;
    this.produit = [];
    this.total = 0 ;
    this.spro = {};
    this.detailclient = {};
  }
  det(Ref, Nomc, type, date, ID, Produit) {
    this.Nomc = Nomc;
    this.type = type;
    this.ID = ID;
    this.date = date;
    this.Refe = Ref;
    for (var a in this.stocks) {
      for (var b in Produit) {
        if (this.stocks[a].Nom === Produit[b].Nomp) {
          Produit[b].prix = this.stocks[a].Prix;
        }
      }
    }
    for (var ch in Produit) {
      this.produit[ch] = Produit[ch];
      this.total = this.total + Produit[ch].quantite * Produit[ch].prix;
    }
    for (var c in this.clients) {
      if (this.clients[c].Nom === Nomc) {
        this.detailclient = this.clients[c];
      }
    }
    this.cc = !this.cc;
  }
  
  Addvente(f: NgForm) {
    this.http.post("/api/Addvente", f.value).subscribe((res) => {
      this.vt = res;
      if (this.vt[0].statue === "Ajouté") {
        location.replace("vente");
        alert("ajoute");
      } else {
        console.log("non");
      }
    });
  }
}