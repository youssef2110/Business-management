import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import "rxjs/Rx";
import { Subscription } from "rxjs/Subscription";
import { NgForm } from "@angular/forms";
import Swal from 'sweetalert2';
@Component({
  selector: "app-fournisseur",
  templateUrl: "./fournisseur.component.html",
  styleUrls: ["./fournisseur.component.scss"]
})
export class FournisseurComponent implements OnInit {
  sho = true;
  det = true;
  detco = true;
  title = "Fournisseurs";
  private fr;
  load = false;
  fourn;
  achats;
  achatr = [];
  stocks;
  Nom;
  Nomf;
  ID;
  date;
  Ref;
  produit = [];
  spro = {};
  total = 0;
  detailfourn = {};
  config = {
    itemsPerPage: 5,
    currentPage: 1,
  };
  constructor(private http: HttpClient) {}
  show() {
    this.sho = !this.sho;
  }
  ngOnInit() {
    this.http.get("/api/getfournisseur").subscribe((res) => {
      this.fourn = res;
      this.load = true;
    });
    this.http.get("/api/getachat").subscribe((res) => {
      this.achats = res;
    });
    this.http.get("/api/getstock").subscribe((res) => {
      this.stocks = res;
    });
  }
  s2() {
    this.det = !this.det;
    this.achatr = [];
    this.Nom = "";
  }
  s3() {
    this.detco = !this.detco;
    this.produit = [];
    this.total = 0;
    this.spro = {};
    this.detailfourn = {};
  }
  detf(Nom) {
    var b = 0;
    for (var a in this.achats) {
      if (this.achats[a].Nomf === Nom) {
        this.achatr[b] = this.achats[a];
        b = b + 1;
      }
    }
    this.det = !this.det;
  }
  detc(Ref, Nomf, date, ID, Produit) {
    this.Ref = Ref;
    this.Nomf = Nomf;
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
    for (var c in this.fourn) {
      if (this.fourn[c].Nom === Nomf) {
        this.detailfourn = this.fourn[c];
      }
    }
    this.detco = !this.detco;
  }
  Addfourn(f: NgForm) {
    this.http.post("/api/Addfourn", f.value).subscribe((res) => {
      this.fr = res;
      if (this.fr[0].statue === "fournisseur Ajouté") {
        Swal.fire({
          title: 'Ajouté',
          icon:'success',
          confirmButtonText: 'Okay'
        }).then((result) => {
          if (result.value) {
            location.replace('fournisseur');
          }
        })
      } else {
        console.log("non");
      }
    });
  }
}
