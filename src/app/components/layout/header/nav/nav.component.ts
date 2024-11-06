import {Component, OnInit} from '@angular/core';
import {NgIf, NgOptimizedImage} from "@angular/common";
import {User} from "../../../../model/entity/User";
import {AuthServiceService} from "../../../../service/AuthService.service";
import {RouterLink} from "@angular/router";
import {UserType} from "../../../../model/entity/enums/user-type";
import {CartService} from "../../../../service/cart-service";

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

  public isLogged : boolean = false;
  public user: User;
  public userTypeEnum = UserType;
  public cartItemCount: number = 0;

  constructor(private _authService: AuthServiceService,private _cartService: CartService) {
    this.user = new User();
  }

  public ngOnInit() {

    this.getProfile();

    this._authService.isLoggedIn$.subscribe(status => {
      this.isLogged = status;
      console.log('Navbar updated. User is logged in:', this.isLogged);
      if (status) {
        this.loadUserFromSession();
        this.updateCartCount();
      } else {
        this.user = new User(); // Reset user at logged out
        this.cartItemCount = 0; // Reset cart count
      }
    });

  }

  private loadUserFromSession(): void {
    const userLogin = sessionStorage.getItem("userLogin");
    if (userLogin) {
      try {
        this.user = JSON.parse(userLogin);
        console.log('User loaded from session:', this.user);
      } catch (error) {
        console.error("Error parsing userLogin from session:", error);
      }
    }
  }

  private updateCartCount(): void {
    if (this.user && this.user.userId) {
      this._cartService.updateCartItemCount(this.user.userId);
      // Observable for Cart item count
      this._cartService.cartItemCount$.subscribe((count) => {
        this.cartItemCount = count;
        console.log('Cart item count updated:', this.cartItemCount);
      });
    }
  }

  public getProfile(): string {
    switch (this.user.userType) {
      case UserType.ADMIN:
        return '/admin';
      case UserType.ARTISAN:
        return '/vendedor';
      case UserType.CLIENT:
        return '/cliente';
      default:
        return '/';
    }
  }

  public logout(){
    this._authService.logout();
    console.log("Logged out user");
  }

}
