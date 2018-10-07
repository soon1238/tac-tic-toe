import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';


import { TacTicRoutingModule } from './tac-tic-routing.module';
import { WrapperComponentComponent } from './components/wrapper-component/wrapper-component.component';
import { TacTicToeComponent } from '../../components/tac-tic-toe/tac-tic-toe.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { PusherService } from './services/pusher.service';
import { GameService } from './services/game.service';

@NgModule({
  imports: [
    CommonModule,
    TacTicRoutingModule,
    FlexLayoutModule,
    MatGridListModule,
    FormsModule,
    MatButtonModule,
    MatSelectModule,
    MatInputModule
  ],
  declarations: [WrapperComponentComponent, TacTicToeComponent],
  providers: [PusherService, GameService]
})
export class TacTicModule { }
