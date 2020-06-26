import { inject } from '@angular/core/testing';

export class AuthService {

    isAuth:boolean;
  constructor(){

  }
    signIn() {
      return new Promise(
        (resolve, reject) => {
          setTimeout(
            () => {
              this.isAuth = true;

              resolve(true);
            }, 2000
          );
        }
      );
    }
  
    signOut() {
      this.isAuth = false;
    }
  }