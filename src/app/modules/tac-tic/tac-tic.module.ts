import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TacTicRoutingModule } from './tac-tic-routing.module';
import { WrapperComponentComponent } from './components/wrapper-component/wrapper-component.component';

@NgModule({
  imports: [
    CommonModule,
    TacTicRoutingModule
  ],
  declarations: [WrapperComponentComponent]
})
export class TacTicModule { }
