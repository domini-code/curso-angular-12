import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CheckoutRoutingModule } from './checkout-routing.module';
import { MaterialModule } from 'src/app/material.module';

import { CheckoutComponent } from './checkout.component';
import { DetailsComponent } from './details/details.component';

@NgModule({
  declarations: [
    CheckoutComponent,
    DetailsComponent
  ],
  imports: [
    CheckoutRoutingModule,
    CommonModule,
    FormsModule,
    MaterialModule
  ]
})
export class CheckoutModule { }
