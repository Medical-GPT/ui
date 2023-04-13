import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbStepperModule, NbCardModule, NbButtonGroupModule, NbButtonModule } from '@nebular/theme';
import { HomepageComponent } from './homepage.component';

@NgModule({
  declarations: [
    HomepageComponent,
  ],
  imports: [
    CommonModule,
    NbStepperModule,
    NbCardModule,
    NbButtonGroupModule,
    NbButtonModule,
  ]
})
export class HomepageModule { }
