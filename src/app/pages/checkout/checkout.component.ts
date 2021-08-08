import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { delay, switchMap, tap } from 'rxjs/operators';

import { Details, Order } from '../../shared/interfaces/order.interface';
import { Store } from '../../shared/interfaces/stores.interface';
import { Product } from '../products/interfaces/product.interface';

import { DataService } from '../../shared/services/data.service';
import { ProductsService } from '../products/services/products.service';
import {
  ShoppingCartService
} from '../../shared/services/shopping-cart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  model = {
    city: '',
    name: 'Dominicode',
    shippingAddress: '',
    store: ''
  };
  isDelivery = true;
  cart: Product[] = [];
  stores: Store[] = []

  constructor(
    private dataService: DataService,
    private productsService: ProductsService,
    private router: Router,
    private shoppingCartService: ShoppingCartService
  ) {
    this.checkIfCartIsEmpty();
  }

  ngOnInit(): void {
    this.getStores();
    this.getDataCart();
    this.prepareDetails();
  }

  onPickupOrDelivery(value: boolean): void {
    this.isDelivery = value;
  }

  onSubmit({ value: formData }: NgForm): void {
    const data: Order = {
      ...formData,
      date: this.getCurrentDay(),
      isDelivery: this.isDelivery
    };

    this.dataService.saveOrder(data)
      .pipe(
        switchMap(({ id: orderId }) => {
          const details = this.prepareDetails();

          return this.dataService.saveDetailsOrder({ details, orderId });
        }),
        tap(() => this.router.navigate(['/checkout/thank-you-page'])),
        delay(2000),
        tap(() => this.shoppingCartService.resetCart())
      )
      .subscribe();
  }

  private getStores(): void {
    this.dataService.getStores()
      .pipe(
        tap((stores: Store[]) => this.stores = stores))
      .subscribe();
  }

  private getCurrentDay(): string {
    return new Date().toLocaleDateString();
  }

  private prepareDetails(): Details[] {
    const details: Details[] = [];

    this.cart.forEach((product: Product) => {
      const {
        id: productId,
        name: productName,
        qty: quantity,
        stock
      } = product;
      const updateStock = stock - quantity;

      this.productsService.updateStock(productId, updateStock)
        .pipe(
          tap(() => details.push({ productId, productName, quantity }))
        )
        .subscribe();
    });

    return details;
  }

  private getDataCart(): void {
    this.shoppingCartService.cartAction$
      .pipe(
        tap((products: Product[]) => this.cart = products)
      )
      .subscribe();
  }

  private checkIfCartIsEmpty(): void {
    this.shoppingCartService.cartAction$
      .pipe(
        tap((products: Product[]) => {
          if (Array.isArray(products) && !products.length) {
            this.router.navigate(['/products']);
          }
        })
      )
      .subscribe();
  }
}
