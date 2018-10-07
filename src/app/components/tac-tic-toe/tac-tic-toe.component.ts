import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { PusherService } from '../../modules/tac-tic/services/pusher.service';
import { GameService } from '../../modules/tac-tic/services/game.service';
import * as _ from 'underscore';

@Component({
  selector: 'tac-tic-toe',
  templateUrl: './tac-tic-toe.component.html',
  styleUrls: ['./tac-tic-toe.component.scss'],
  providers: [PusherService]
})
export class TacTicToeComponent implements OnInit {


  blocks: any = [];
  lock: boolean = false;
  messages: Array<any>;
  userName: string = '';
  messageText: string = '';

  @ViewChild('textContent') textContent: ElementRef;

  constructor(private pusherService: PusherService, public gameService: GameService) {
    this.messages = [];

  }

  ngOnInit(): void {

    this.gameService.initBlocks();
    this.pushListener();
    this.blocks = this.gameService.blocks;

  }

  /** 
     * User click function
     */
  playerClick(event: any, block: any): void {

    if ((this.gameService.blocks[block.id - 1].isLocked || this.lock == true) || !this.gameService.isYourTurn(this.userName)) {
      return;
    }

    this.gameService.freeBlocksRemaining -= 1;
    this.gameService.blocks[block.id - 1].isLocked = true;

    if (this.gameService.turn == 0) {
      this.gameService.blocks[block.id - 1].symbol = 'tick';

    } else {
      this.gameService.blocks[block.id - 1].symbol = 'cross';
    }
    this.gameService.changeTurn();
    let complete: boolean = this.gameService.blockSetComplete(),
      gameStatus: object = { isCompletd: complete, userName: this.userName, remCount: this.gameService.freeBlocksRemaining };

    this.gameService.userClick(this.gameService.blocks[block.id - 1], gameStatus);
    if (complete == false) {

      if (this.gameService.freeBlocksRemaining <= 0) {
        this.lock = true;
        this.textContent.nativeElement.textContent = `Game is draw!`;
        setTimeout(() => {
          this.resetGame();
        }, 5000);
      }
      return;

    } else {
      this.lock = true;
      this.textContent.nativeElement.textContent = `You are the winner!`;
      setTimeout(() => {
        this.resetGame();
      }, 5000);
    }

  }

  /** 
 * Initiate the player.
 */
  initPlayer(): void {
    this.gameService.initPlayer(this.userName);
  }


  /** 
   * Function to subscribe to the channel
   */
  pushListener(): void {
    this.pusherService.messagesChannel.bind('client-tac-tic', (response) => {

      let result: any = this.gameService.pushListener(response);

      if (!this.lock && result && result['isCompletd'] && response.action == 'user-turn') {

        this.lock = true;
        this.textContent.nativeElement.textContent = (result['userName'] == this.userName) ? `You are the winner!` : `${result['userName']} is the winner!`;
        setTimeout(() => {
          this.resetGame();
        }, 5000);

      } else if (!this.lock && result && !result['isCompletd'] && response.action == 'user-turn' && result['remCount'] <= 0) {
        this.lock = true;
        this.textContent.nativeElement.textContent = `Game is draw!`;
        setTimeout(() => {
          this.resetGame();
        }, 5000);

      } else if (!this.lock && result && response.action == 'init-player') {

        let found: object = result.find((element) => {
          return element.name != this.userName;;
        });
        if (found) {
          this.textContent.nativeElement.textContent = `${found['name']} joined!`;
        }
      }
    });
    this.pusherService.messagesChannel.bind('pusher:subscription_succeeded', (members) => { });
  }

  disableFields(): boolean {
    return this.gameService.players.length == 2;
  }

  /** 
    * Reset the game.
    */
  resetGame(): void {
    this.gameService.freeBlocksRemaining = 9;
    this.gameService.initBlocks();
    this.lock = false;
    this.gameService.turn = 0;
    location.reload();
  }

  /** 
   * This function uses to change the theme.
   */
  onChangeTheme(event: object): void {
    let selectedTheme: string = event['value'];
    this.gameService.changeTheme(selectedTheme);
  }

  /** 
     * Validate the userName - input alphanumeric characters in user name, additionally - and _ are
  also allowed in user name.
     */
  isValidUserName(userName: string): boolean {
    let patt: any = /^[A-Za-z_-]+$/;
    return patt.test(userName.trim());
  }

}
