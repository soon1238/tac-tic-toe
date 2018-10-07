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
  selectedTheme: string = '#FCFCFC';
  themes: Array<any> = [
    { theme: 'White', color: '#FFFF' },
    { theme: 'Tiffany', color: '#81D8D0' },
    { theme: 'Baby Blue', color: '#7EF9FF' },
    { theme: 'Carnation', color: '#FFA6C9' },
    { theme: 'Laurel Green', color: '#A9BA9D' }
  ];

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

    let block1: Block = this.blocks[0];
    let block2: Block = this.blocks[1];
    let block3: Block = this.blocks[2];

    let block4: Block = this.blocks[3];
    let block5: Block = this.blocks[4];
    let block6: Block = this.blocks[5];

    let block7: Block = this.blocks[6];
    let block8: Block = this.blocks[7];
    let block9: Block = this.blocks[8];

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

  pushListener(response): any {

    let result: object = {};
    if (response.action == 'init-player') {
      this.players = response.data;
    } else if (response.action == 'user-turn') {
      result = this.fillBlock(response);
    } else if (response.action == 'user-color') {
      this.fillTheme(response);
    }

    return result;
  }

  userClick(block: object, completed: boolean, userName: string): void {
    let userTurn: object = {
      turn: this.turn,
      block: block,
      completed: { isCompletd: completed, userName: userName }
    };
    this.userAction('user-turn', userTurn);
  }

  isYourTurn(userName: string): boolean {
    let found: object = this.players.find((element) => {
      return element.name == userName && element.id == this.turn;
    });

    return (found) ? true : false;
  }

  fillBlock(response: any): any {
    this.turn = response.data.turn;
    let changedBlock = response.data.block;

    this.blocks.forEach((block, index) => {
      if (block.id === changedBlock.id) {
        block.isLocked = changedBlock.isLocked;
        block.symbol = changedBlock.symbol;
      }
    });
    return response.data.completed;
    
  }

  changeTheme(color: string) {
    let theme: object = {
      color: color,
    };
    this.userAction('user-color', theme);
  }

  fillTheme(response: any): void {
    this.selectedTheme = response.data.color;
  }
}
