import { Component } from '@angular/core';
import {HeaderComponent} from "../../../layout/header/header.component";
import {NavComponent} from "../../../layout/header/nav/nav.component";

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    HeaderComponent,
    NavComponent
  ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {

}
