import { Injectable } from '@angular/core';
import { Block } from '../../../models/block.model';
import { Player } from '../../../models/player.model';
import { PusherService } from './pusher.service';
import { Message } from '../../../models/message.model';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  blocks: Array<Block> = [];
  players: Array<Player> = [];
  freeBlocksRemaining = 9;
  turn: number = 0;
  draw: number = 0;

  constructor(private pusherService: PusherService) {

  }

  initBlocks(): void {
    this.blocks = [];

    for (let i = 1; i <= 9; ++i) {
      let block = new Block();

      block['userId'] = "";
      block['symbol'] = "";
      block['id'] = i;
      block['title'] = i;

      this.blocks.push(block);
    }
  }

  setSymbol(symbol: string, blockID): void {
    this.blocks[blockID]['symbol'] = symbol;
  }

  initPlayer(userName: string) {

    if (this.players.length == 2) {
      return;
    }

    let player = new Player();
    player.locked = true;
    player.name = userName;
    player.id = (this.players.length == 1) ? 1 : 0;

    this.players.push(player);
    this.userAction('init-player', this.players);
  }

  changeTurn() {

    if (this.turn == 1) {
      this.turn = 0;
    } else {
      this.turn = 1;
    }

    return this.turn;
  }

  blockSetComplete(): boolean {

    var block1: Block = this.blocks[0];
    var block2: Block = this.blocks[1];
    var block3: Block = this.blocks[2];

    var block4: Block = this.blocks[3];
    var block5: Block = this.blocks[4];
    var block6: Block = this.blocks[5];

    var block7: Block = this.blocks[6];
    var block8: Block = this.blocks[7];
    var block9: Block = this.blocks[8];

    if (
      (block1.isLocked && block2.isLocked && block3.isLocked && (block1.symbol == block2.symbol) && (block1.symbol == block3.symbol)) ||
      (block1.isLocked && block4.isLocked && block7.isLocked && (block1.symbol == block4.symbol) && (block1.symbol == block7.symbol)) ||
      (block1.isLocked && block5.isLocked && block9.isLocked && (block1.symbol == block5.symbol) && (block1.symbol == block9.symbol)) ||
      (block2.isLocked && block5.isLocked && block8.isLocked && (block2.symbol == block5.symbol) && (block2.symbol == block8.symbol)) ||
      (block3.isLocked && block6.isLocked && block9.isLocked && (block3.symbol == block6.symbol) && (block3.symbol == block9.symbol)) ||
      (block3.isLocked && block5.isLocked && block7.isLocked && (block3.symbol == block5.symbol) && (block3.symbol == block7.symbol)) ||
      (block4.isLocked && block5.isLocked && block6.isLocked && (block4.symbol == block5.symbol) && (block4.symbol == block6.symbol)) ||
      (block7.isLocked && block8.isLocked && block9.isLocked && (block7.symbol == block8.symbol) && (block7.symbol == block9.symbol))
    ) {
      return true;
    }
    return false;
  }

  userAction(action: string, data: any) {
    let message: Message = {
      action: action,
      data: data
    }
    this.pusherService.messagesChannel.trigger('client-tac-tic', message);
  }

  pushListener(response): void {
    if (response.action == 'init-player') {
      this.players = response.data;
    } else if (response.action == 'user-turn') {
      this.fillBlock(response);
    }
  }

  userClick(block: object): void {
    let userTurn: object = {
      turn: this.turn,
      block: block
    };
    this.userAction('user-turn', userTurn);
  }

  isYourTurn(userName: string): boolean {
    let found: object = this.players.find((element) => {
      return element.name == userName && element.id == this.turn;
    });

    return (found) ? true : false;
  }

  fillBlock(response: any): void {
    this.turn = response.data.turn;
    let changedBlock = response.data.block;
    this.blocks.forEach((block, index) => {
      if (block.id === changedBlock.id) {
        block.isLocked = changedBlock.isLocked;
        block.symbol = changedBlock.symbol;
      }
    });
  }
}
