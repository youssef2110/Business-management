import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { NgForm } from '@angular/forms';
import {Router} from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  private user;
  authStatus :Boolean;
  Alert : String;
  Uti= true;

  constructor(private http: HttpClient,private router : Router) { }

  ngOnInit() {
  }
  
  s(){
    this.Uti = !this.Uti;
  }

  onSubmit(f: NgForm){
    this.http.post('/api/TryLogin', f.value)
      .subscribe( res => {
        this.user = res;
        if(this.user[0].statue === 'Success'){
          let myObj = { Iden: this.user[1].user.Iden , Password: this.user[1].user.Password , Name : this.user[1].user.Nom +' '+ this.user[1].user.Prenom , service : this.user[1].user.Service , Etat : true  };
          localStorage.setItem("user", JSON.stringify(myObj));
          location.replace('accueil');
            ;
        }else{
          this.Alert = "Erreur";
        }
      });
  }

  onSubmit2(f: NgForm){
    this.http.post('/api/TryLogina', f.value)
      .subscribe( res => {
        this.user = res;
        if(this.user[0].statue === 'Success'){
          let myObj = { Iden: this.user[1].user.Iden , Password: this.user[1].user.Password , Name : this.user[1].user.Nom +' '+ this.user[1].user.Prenom , service : this.user[1].user.Service , Etat : true  };
          localStorage.setItem("user", JSON.stringify(myObj));
          location.replace('admin');
            ;
        }else{
          this.Alert = "Erreur";
        }
      });
  }

}
