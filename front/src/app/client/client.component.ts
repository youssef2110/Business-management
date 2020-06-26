import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { NgForm } from "@angular/forms";
import Swal from 'sweetalert2';
@Component({
  selector: "app-client",
  templateUrl: "./client.component.html",
  styleUrls: ["./client.component.scss"]
})
export class ClientComponent implements OnInit {
  sh = true;
  det = true;
  detco = true;
  title = "Clients";
  client;
  private cl;
  load = false;
  ventes;
  venter = [];
  stocks;
  Nomcc;
  detailclient = {};
  Nomc;
  ID;
  type;
  Refe;
  date;
  produit = [];
  spro = {};
  total = 0;
  config = {
    itemsPerPage: 5,
    currentPage: 1,
  };
  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get("/api/getclient").subscribe((res) => {
      this.client = res;
      this.load = true;
    });
    this.http.get("/api/getvente").subscribe((res) => {
      this.ventes = res;
    });
    this.http.get("/api/getstock").subscribe((res) => {
      this.stocks = res;
    });
  }
  show() {
    this.sh = !this.sh;
  }

  s2() {
    this.det = !this.det;
    this.venter = [];
    this.Nomcc = "";
  }
  s3() {
    this.detco = !this.detco;
    this.produit = [];
    this.total = 0 ;
    this.spro = {};
    this.detailclient = {};
  }
  detc(Nom) {
    var b = 0;
    for (var a in this.ventes) {
      if (this.ventes[a].Nomc === Nom) {
        this.venter[b] = this.ventes[a];
        b = b + 1;
      }
    }
    this.det = !this.det;
  }
  dettco(Ref, Nomc, type, date, ID, Produit) {
    this.Refe = Ref;
    this.Nomc = Nomc;
    this.type = type;
    this.ID = ID;
    this.date = date;
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
    for (var c in this.client) {
      if (this.client[c].Nom === Nomc) {
        this.detailclient = this.client[c];
      }
    }
    this.detco = !this.detco;
  }
  Addclient(f: NgForm) {
    this.http.post("/api/Addclient", f.value).subscribe((res) => {
      this.cl = res;
      if (this.cl[0].statue === "Client Ajouté") {
        Swal.fire({
          title: 'Ajouté',
          icon:'success',
          confirmButtonText: 'Okay'
        }).then((result) => {
          if (result.value) {
            location.replace('client');
          }
        })
      } else {
        console.log("non");
      }
    });
  }
}
