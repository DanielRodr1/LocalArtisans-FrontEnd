import {Component, OnInit} from '@angular/core';
import {NgIf, NgOptimizedImage} from "@angular/common";
import {User} from "../../../../model/entity/User";

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [
    NgOptimizedImage,
    NgIf
  ],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent implements OnInit{
  public isLogged : boolean;
  public user: User;

  constructor() {
    this.isLogged = false;
    this.user = new User();
  }

  public ngOnInit() {
    this.verifyLogin();
  }

  private verifyLogin(){
    let userLogin = sessionStorage.getItem("userLogin");
    let userLoginParse;
    if (userLogin){
      this.isLogged=true;
      userLoginParse = JSON.parse(userLogin);
      this.user.fullName = userLoginParse.fullName;
    }
  }

//   Crear método públic logout para que se acceda por un botón y que ese botón sea condicianado
//   cuando se haga click que llame al método logout y logout debe hacer un session remove con la key


}
