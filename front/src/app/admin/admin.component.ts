import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  title = "Utilisateurs"
  load = false ;
  users ;
  ss = true;
  re = true;
  private us;
  iden;nom;prenom;service;password;Tex
  config = {
    itemsPerPage: 5,
    currentPage: 1,
  };
  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get('/api/getuser')
      .subscribe( res => {
        this.users = res;
        this.load = true;
      });

  }

  s(){
    this.ss = !this.ss;
  }
  edit(Iden,Nom,Prenom,Service,Password){
    this.iden = Iden; this.Tex = Iden;
    this.nom = Nom;
    this.prenom = Prenom;
    this.service = Service;
    this.password = Password;
    this.re = !this.re;
  }
  edit2(f){
    this.http.post('/api/Edituse', f.value)
    .subscribe( res => {
    });
    location.replace('admin');
  }
  supp(iden){
    this.http.get('/api/Deluse/'+iden)
      .subscribe( res => {
      });
      location.replace('admin');
  }
  
Adduser(f: NgForm){
  this.http.post('/api/Adduser', f.value)
    .subscribe( res => {
      this.us = res;
      if(this.us[0].statue === "Utilisateur Ajouté"){
        Swal.fire({
          title: 'Utilisateur Ajouté',
          icon:'success',
          confirmButtonText: 'Okay'
        }).then((result) => {
          if (result.value) {
            location.replace('admin');
          }
        })
      }else{
        console.log('non')
      }
    });
}

}
