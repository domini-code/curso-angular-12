import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs/operators';

import { Product } from './interfaces/product.interface';

import { ProductsService } from './services/products.service';
import {
  ShoppingCartService
} from 'src/app/shared/services/shopping-cart.service';

@Component({
  selector: 'app-products',
  template: `
  <section class="products">
    <app-product
      (addToCartClick)="addToCart($event)"
      [product]="product"
      *ngFor="let product of products"
    ></app-product>
  </section>
  `,
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products!: Product[];

  constructor(
    private productService: ProductsService,
    private shoppingCartService: ShoppingCartService
  ) { }

  ngOnInit(): void {
    this.productService.getProducts()
      .pipe(tap((products: Product[]) => this.products = products))
      .subscribe();
  }

  addToCart(product: Product): void {
    this.shoppingCartService.updateCart(product);
  }
}
