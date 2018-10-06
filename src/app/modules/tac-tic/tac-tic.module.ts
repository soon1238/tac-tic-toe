import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';

import { TacTicRoutingModule } from './tac-tic-routing.module';
import { WrapperComponentComponent } from './components/wrapper-component/wrapper-component.component';
import { TacTicToeComponent } from '../../components/tac-tic-toe/tac-tic-toe.component';
import {MatGridListModule} from '@angular/material/grid-list';

@NgModule({
  imports: [
    CommonModule,
    TacTicRoutingModule,
    FlexLayoutModule,
    MatGridListModule
  ],
  declarations: [WrapperComponentComponent, TacTicToeComponent]
})
export class TacTicModule { }
