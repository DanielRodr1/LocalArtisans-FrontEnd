import {Component, OnInit} from '@angular/core';
import {NgIf, NgOptimizedImage} from "@angular/common";
import {User} from "../../../../model/entity/User";
import {AuthServiceService} from "../../../../service/AuthService.service";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [
    NgOptimizedImage,
    NgIf,
    RouterLink
  ],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent implements OnInit{
  public isLogged : boolean;
  public user: User;

  constructor(private _authService: AuthServiceService) {
    this.isLogged = false;
    this.user = new User();
  }

  public ngOnInit() {
    this.verifyLogin();
    this.getProfile();
  }

  // private verifyLogin(){
  //   let userLogin = sessionStorage.getItem("userLogin");
  //   // let userLoginParse;
  //   if (userLogin){
  //     this.isLogged=true;
  //     let userLoginParse = JSON.parse(userLogin);
  //     this.user.userType = userLoginParse.userType;
  //     console.log(this.user.userType);
  //   }
  // }

  private verifyLogin() {
    let userLogin = sessionStorage.getItem("userLogin");
    let userLoginParse;
    if (userLogin) {
      try {
        userLoginParse = JSON.parse(userLogin);
        if (userLoginParse && userLoginParse.userType) {
          this.user.userType = userLoginParse.userType;
          console.log(this.user.userType);
        }
      } catch (error) {
        console.error("Error al analizar el JSON de userLogin:", error);
      }
      this.isLogged = true;
    }
  }

  public getProfile(): string {
    switch (this.user.userType) {
      case 'admin':
        return '/admin';
      case 'vendedor':
        return '/vendedor';
      case 'cliente':
        return '/cliente';
      default:
        return '/';
    }
  }


  public logout(){
      this._authService.logout();
      this.isLogged=false;
  }


}
