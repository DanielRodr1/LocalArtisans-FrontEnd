import { Component } from '@angular/core';
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-login-register',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './login-register.component.html',
  styleUrl: './login-register.component.css'
})
export class LoginRegisterComponent {

  public codigo : boolean;

  public constructor() {
    this.codigo = false;
  }


  onRoleChange(event: Event) : void {
    const roleSelect = event.target as HTMLSelectElement; //Captura el Select con su value
    const value = roleSelect.value; //Agarra el value del Select

    if(value == 'vendedor'){
      this.codigo = true;
    } else {
      this.codigo = false
    }
  }
}
