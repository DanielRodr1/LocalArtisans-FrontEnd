import {Component, OnInit} from '@angular/core';
import {environmentLocal} from "../../../../environments/environment.local";
import {PaymentInfo} from "../../../../model/entity/DTOs/payment-info";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {PaymentService} from "../../../../service/payment.service";
import {DecimalPipe, NgIf} from "@angular/common";
import { PaymentRequestPaymentMethodEvent } from '@stripe/stripe-js';
import {CartDataService} from "../../../../service/card-data.service";
import {CartService} from "../../../../service/cart-service";
import {User} from "../../../../model/entity/User";
import {Router} from "@angular/router";


@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [NgIf, DecimalPipe, ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit {

  checkoutFormGroup!: FormGroup;
  totalPrice: number = 0; // Ajustar este valor según la lógica de tu app
  public user: User | null = null;
  stripe: any;
  paymentInfo: PaymentInfo = new PaymentInfo();
  cardElement: any;
  displayError: any = "";

  constructor(
    private cartDataService: CartDataService,
    private formBuilder: FormBuilder,
    private paymentService: PaymentService,
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Retrieve total amount
    this.totalPrice = this.cartDataService.getTotalAmount();
    console.log('Total amount in checkout:', this.totalPrice);

    this.loadUserFromSession();

    // Checkout reactive form
    this.checkoutFormGroup = this.formBuilder.group({
      deliveryInfo: this.formBuilder.group({
        address: ['', [Validators.required, Validators.minLength(2)]],
        city: ['', [Validators.required, Validators.minLength(2)]],
        postalCode: ['', [Validators.required, Validators.minLength(2)]]
      })
    });

    // Load Stripe script
    if (!document.querySelector('script[src="https://js.stripe.com/v3/"]')) {
      const script = document.createElement('script');
      script.src = 'https://js.stripe.com/v3/';
      script.async = true;
      script.onload = () => {
        this.stripe = Stripe(environmentLocal.stripePublishableKey);
        this.setupStripePaymentForm();
      };
      document.body.appendChild(script);
    } else {
      this.stripe = Stripe(environmentLocal.stripePublishableKey);
      this.setupStripePaymentForm();
    }
  }

  setupStripePaymentForm() {
    const elements = this.stripe.elements();

    // Configurar Payment Request (Apple Pay)
    const paymentRequest = this.stripe.paymentRequest({
      country: 'US', // Cambia a tu país si es necesario
      currency: 'usd', // Ajusta según tu moneda
      total: {
        label: 'Total a Pagar',
        amount: Math.round(this.totalPrice * 100) // Convertir a la unidad más baja de la moneda (centavos)
      },
      requestPayerName: true,
      requestPayerEmail: true
    });

    // Crear el botón de Apple Pay si es compatible
    paymentRequest.canMakePayment().then((result: any) => {
      if (result) {
        const prButton = elements.create('paymentRequestButton', {
          paymentRequest: paymentRequest
        });
        prButton.mount('#payment-request-button');
      } else {
        console.log('Apple Pay no está disponible en este navegador.');
      }
    });

    // Manejar eventos de pago de Apple Pay
    paymentRequest.on('paymentmethod', (event: PaymentRequestPaymentMethodEvent) => {
      // Configura los detalles del PaymentInfo antes de hacer la solicitud
      this.paymentInfo.amount = this.totalPrice * 100; // convertir a centavos
      this.paymentInfo.currency = 'usd'; // o "pen" para soles

      this.paymentService.createPaymentIntent(this.paymentInfo).subscribe(
        (paymentIntentResponse) => {
          event.complete('success');
          this.stripe.confirmCardPayment(paymentIntentResponse.client_secret, {
            payment_method: event.paymentMethod.id
          }).then((result: any) => {
            if (result.error) {
              alert(`Hubo un error: ${result.error.message}`);
            } else {
              alert('Pago realizado con éxito!');
              this.updateOrderAfterPayment();   // Change order to final and delivery info
              this.resetCart();
            }
          });
        },
        (error) => {
          event.complete('fail');
          console.error('Error creando el Intent de pago:', error);
        }
      );
    });

    // Card Element Configuration
    this.cardElement = elements.create('card', { hidePostalCode: true });
    this.cardElement.mount('#card-element');

    this.cardElement.on('change', (event: any) => {
      this.displayError = document.getElementById('card-errors');
      if (event.complete) {
        this.displayError.textContent = "";
      } else if (event.error) {
        this.displayError.textContent = event.error.message;
      }
    });
  }

  onSubmit() {
    console.log("Handling the submit button");

    if (this.checkoutFormGroup.invalid) {
      this.checkoutFormGroup.markAllAsTouched();
      return;
    }

    this.paymentInfo.amount = Math.round(this.totalPrice * 100); // convertir a centavos
    this.paymentInfo.currency = "usd"; // o "pen" para soles

    if (!this.checkoutFormGroup.invalid && this.displayError.textContent === "") {
      this.paymentService.createPaymentIntent(this.paymentInfo).subscribe(
        (paymentIntentResponse) => {
          this.stripe.confirmCardPayment(paymentIntentResponse.client_secret,
            {
              payment_method: {
                card: this.cardElement
              }
            }, { handleActions: false })
            .then((result: any) => {
              if (result.error) {
                alert(`There was an error: ${result.error.message}`);
              } else {
                // Lógica de confirmación de pago exitosa
                alert('Pago realizado con éxito!');
                this.updateOrderAfterPayment();
                this.resetCart();
              }
            });
        }
      );
    } else {
      this.checkoutFormGroup.markAllAsTouched();
      return;
    }
  }

  // Recoge la información de entrega y otros detalles de la orden
  updateOrderAfterPayment() {
    const deliveryInfo = this.checkoutFormGroup.value.deliveryInfo;
    if (this.user && this.user.userId) {
      const userId = this.user.userId;
      const amount = this.totalPrice; // Usa el totalPrice ya calculado

      this.cartService.checkoutFromCart(userId, amount, {
        deliveryAddress: deliveryInfo.address,
        deliveryCity: deliveryInfo.city,
        deliveryPostalCode: deliveryInfo.postalCode
      }).subscribe(
        response => {
          console.log('Order finalized successfully:', response);
        },
        error => {
          console.error('Error finalizing the order:', error);
        }
      );
    }
  }


  private loadUserFromSession(): void {
    let userLogin = sessionStorage.getItem("userLogin");
    if (userLogin) {
      try {
        this.user = JSON.parse(userLogin);
      } catch (error) {
        console.error("Error parsing userLogin JSON:", error);
        this.user = null;
      }
    } else {
      console.warn('No user found in session storage');
    }
  }

  resetCart() {
    console.log("Resetting cart...");
    // Puedes mostrar una notificación o alerta
    alert("El pedido se ha procesado exitosamente. Gracias por tu compra.");

    // Redirigir al usuario a la página principal o una página de confirmación de pedido
    this.router.navigate(['/']);
  }

}
