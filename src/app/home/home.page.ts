import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ChessBoard } from '../model/chess_board';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  chessBoardObject: any;
  showBoard = false;
  current_positon_pawn: any;
  output: String;
  input: String;
  show_output: boolean = false;
  constructor(private alertController: AlertController, public toastController: ToastController) { }

  //initalise board
  ngOnInit() {
    this.chessBoardObject = ChessBoard.showBoard;
    this.showBoard = true;
  }
  
  //Render grid row and coiumn
  calcBoxColor(r, c) {
    return ((r + c) % 2 === 1);
  }

  //Place PAWN on board
  place_pawn(r, c, direction, color) {
    //this.chessBoardObject = ChessBoard.clearBoard;
    this.chessBoardObject[r][c] = {
      rowIndex: r,
      colIndex: c,
      direction: direction,
      img: 'assets/images/' + color + '.png',
    };
    this.current_positon_pawn = {
      rowIndex: r,
      colIndex: c,
      direction: direction,
      img: 'assets/images/' + color + '.png',
    }
    this.input = this.current_positon_pawn.rowIndex + ',' + this.current_positon_pawn.colIndex + ',' + this.current_positon_pawn.direction + ',' + this.current_positon_pawn.img;
    this.show_output = true;
  }

  //PAWN movement logic
  pawn_movement() {
    if (this.current_positon_pawn)
      if (this.current_positon_pawn.direction == "NORTH") {
        console.log('inside north now');
        if (Number(this.current_positon_pawn.rowIndex) - 1 >= 0) {
          this.chessBoardObject[Number(this.current_positon_pawn.rowIndex)][this.current_positon_pawn.colIndex] = {
            rowIndex: Number(this.current_positon_pawn.rowIndex) - 1,
            colIndex: this.current_positon_pawn.colIndex,
            direction: this.current_positon_pawn.direction,
            img: '',
          };
          this.chessBoardObject[Number(this.current_positon_pawn.rowIndex) - 1][this.current_positon_pawn.colIndex] = {
            rowIndex: Number(this.current_positon_pawn.rowIndex) - 1,
            colIndex: this.current_positon_pawn.colIndex,
            direction: this.current_positon_pawn.direction,
            img: this.current_positon_pawn.img,
          };
          this.current_positon_pawn = {
            rowIndex: Number(this.current_positon_pawn.rowIndex) - 1,
            colIndex: this.current_positon_pawn.colIndex,
            direction: this.current_positon_pawn.direction,
            img: this.current_positon_pawn.img,
          }
        }
      } else if (this.current_positon_pawn.direction == "SOUTH") {
        console.log('inside south now');
        if (Number(this.current_positon_pawn.rowIndex) + 1 <= 7) {
          this.chessBoardObject[Number(this.current_positon_pawn.rowIndex)][this.current_positon_pawn.colIndex] = {
            rowIndex: Number(this.current_positon_pawn.rowIndex) + 1,
            colIndex: this.current_positon_pawn.colIndex,
            direction: this.current_positon_pawn.direction,
            img: '',
          };
          this.chessBoardObject[Number(this.current_positon_pawn.rowIndex) + 1][this.current_positon_pawn.colIndex] = {
            rowIndex: Number(this.current_positon_pawn.rowIndex) + 1,
            colIndex: this.current_positon_pawn.colIndex,
            direction: this.current_positon_pawn.direction,
            img: this.current_positon_pawn.img,
          };
          this.current_positon_pawn = {
            rowIndex: Number(this.current_positon_pawn.rowIndex) + 1,
            colIndex: this.current_positon_pawn.colIndex,
            direction: this.current_positon_pawn.direction,
            img: this.current_positon_pawn.img,
          }
        }
      }
      else if (this.current_positon_pawn.direction == "EAST") {
        console.log('inside EAST now');
        if (Number(this.current_positon_pawn.colIndex) + 1 <= 7) {
          this.chessBoardObject[Number(this.current_positon_pawn.rowIndex)][this.current_positon_pawn.colIndex] = {
            rowIndex: Number(this.current_positon_pawn.rowIndex),
            colIndex: this.current_positon_pawn.colIndex,
            direction: this.current_positon_pawn.direction,
            img: '',
          };
          this.chessBoardObject[this.current_positon_pawn.rowIndex][Number(this.current_positon_pawn.colIndex) + 1] = {
            rowIndex: this.current_positon_pawn.rowIndex,
            colIndex: Number(this.current_positon_pawn.colIndex) + 1,
            direction: this.current_positon_pawn.direction,
            img: this.current_positon_pawn.img,
          };
          this.current_positon_pawn = {
            rowIndex: this.current_positon_pawn.rowIndex,
            colIndex: Number(this.current_positon_pawn.colIndex) + 1,
            direction: this.current_positon_pawn.direction,
            img: this.current_positon_pawn.img,
          }
        }

      } else {
        console.log('inside WEST now');
        if (Number(this.current_positon_pawn.colIndex) - 1 >= 0) {
          this.chessBoardObject[Number(this.current_positon_pawn.rowIndex)][this.current_positon_pawn.colIndex] = {
            rowIndex: Number(this.current_positon_pawn.rowIndex),
            colIndex: this.current_positon_pawn.colIndex,
            direction: this.current_positon_pawn.direction,
            img: '',
          };
          this.chessBoardObject[this.current_positon_pawn.rowIndex][Number(this.current_positon_pawn.colIndex) - 1] = {
            rowIndex: this.current_positon_pawn.rowIndex,
            colIndex: Number(this.current_positon_pawn.colIndex) - 1,
            direction: this.current_positon_pawn.direction,
            img: this.current_positon_pawn.img,
          };
          this.current_positon_pawn = {
            rowIndex: this.current_positon_pawn.rowIndex,
            colIndex: Number(this.current_positon_pawn.colIndex) - 1,
            direction: this.current_positon_pawn.direction,
            img: this.current_positon_pawn.img,
          }
        }
      }

  }

  getImageOnBoard(chessCol, r, c) {
    if (chessCol) {
      return chessCol.img;
    }
  }

  ///Place input
  async open_input() {
    await this.clearBoard();
    const alert = await this.alertController.create({
      header: 'Enter Input!',
      inputs: [
        {
          name: 'input1',
          type: 'text',
          placeholder: 'row,column,direction,color'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: (alertData) => {
            console.log(alertData.input1);
            let data = alertData.input1.split(",");
            this.place_pawn(data[0], data[1], data[2], data[3]);
          }
        }
      ]
    });
    await alert.present();
  }
  ///PAWN position selector
  position(position: String) {
    if (this.current_positon_pawn)
      switch (position) {
        case 'EAST':
          this.presentToast('Facing Right');
          this.current_positon_pawn.direction = 'EAST';
          break;
        case 'WEST':
          this.presentToast('Facing left');
          this.current_positon_pawn.direction = 'WEST';
          break;
        case 'SOUTH':
          this.presentToast('Facing down');
          this.current_positon_pawn.direction = 'SOUTH';
          break;
        default:
          this.presentToast('Facing up');
          this.current_positon_pawn.direction = 'NORTH';
          break;
      }
  }
  //Present output 
  report() {
    if (this.current_positon_pawn) {
      this.output = this.current_positon_pawn.rowIndex + ',' + this.current_positon_pawn.colIndex + ',' + this.current_positon_pawn.direction + ',' + this.current_positon_pawn.img;
    }
  }

  //Present direction on toast
  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

  //clear board before placing new PAWN
  async clearBoard() {
    if (this.current_positon_pawn)
      this.chessBoardObject[this.current_positon_pawn.rowIndex][this.current_positon_pawn.colIndex] = {
        rowIndex: '0',
        colIndex: '0',
        direction: '',
        img: '',
      };
    this.show_output = false;
  }
}



