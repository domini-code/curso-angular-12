import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ThankYouPageRoutingModule } from './thank-you-page-routing.module';
import { ThankYouPageComponent } from './thank-you-page.component';


@NgModule({
  declarations: [
    ThankYouPageComponent
  ],
  imports: [
    CommonModule,
    ThankYouPageRoutingModule
  ]
})
export class ThankYouPageModule { }
