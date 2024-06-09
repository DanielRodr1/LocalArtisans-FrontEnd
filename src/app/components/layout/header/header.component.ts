import {Component, OnInit} from '@angular/core';
import {NavComponent} from "./nav/nav.component";
import {NgIf} from "@angular/common";
import {NavigationEnd, Router} from "@angular/router";
import {filter} from "rxjs";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    NavComponent,
    NgIf
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})

export class HeaderComponent implements OnInit{
  showCarousel: boolean;

  constructor(private router: Router) {
    this.showCarousel = false;
  }

  ngOnInit() {
    // Escuchar los eventos de navegación del router
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      // Verificar si la ruta actual es 'home-page'
      this.showCarousel = event.urlAfterRedirects === '/home-page';
    });
  }
}
