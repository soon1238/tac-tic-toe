import { Component, OnInit } from '@angular/core';
import { Block } from '../../models/block.model';
import * as _ from 'underscore';

@Component({
  selector: 'tac-tic-toe',
  templateUrl: './tac-tic-toe.component.html',
  styleUrls: ['./tac-tic-toe.component.scss']
})
export class TacTicToeComponent implements OnInit {

  blocks: any = [];

  constructor() { }

  ngOnInit(): void {
    this.initBlocks();
  }

  initBlocks(): void {
    this.blocks = [];

    for (let i = 1; i <= 9; ++i) {
      let block = new Block();

      block['free'] = true;
      block['userId'] = "";
      block['symbol'] = "";
      block['title'] = i;

      this.blocks.push(block);
    }
  }


}
