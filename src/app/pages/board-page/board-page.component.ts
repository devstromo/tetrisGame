import { AfterViewInit, Component, ElementRef, HostListener, ViewChild } from '@angular/core';

const BLOCK_SIZE: number = 20;
const BOARD_WIDTH: number = 14;
const BOARD_HEIGHT: number = 30;

interface Position {
  x: number;
  y: number;
}

interface Piece {
  position: Position;
  shape: number[][];
}

const board = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1],
]

// 4. piece
const piece: Piece = {
  position: { x: 5, y: 5 },
  shape: [
    [1, 1],
    [1, 1]
  ]
}

@Component({
  selector: 'app-board-page',
  templateUrl: './board-page.component.html',
  styleUrls: ['./board-page.component.css']
})
export class BoardPageComponent implements AfterViewInit {
  @ViewChild('myCanvas', { static: true })
  public canvas: ElementRef<HTMLCanvasElement>;
  private context!: CanvasRenderingContext2D;

  constructor() {
    this.canvas = {} as ElementRef<HTMLCanvasElement>;
  }

  ngAfterViewInit(): void {
    const context = this.canvas.nativeElement.getContext('2d');
    if (context !== null) {
      this.context = context;
      this.canvas.nativeElement.width = BLOCK_SIZE * BOARD_WIDTH;
      this.canvas.nativeElement.height = BLOCK_SIZE * BOARD_HEIGHT;
      this.context.scale(BLOCK_SIZE, BLOCK_SIZE);

      requestAnimationFrame(() => this.update());
    } else {
      console.error('2D context not supported');
    }
  }

  //2. game loop
  update(): void {
    this.draw();
    requestAnimationFrame(() => this.update());
  }

  draw(): void {
    if (this.context) {
      this.context.fillStyle = '#000';
      this.context.fillRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);

      board.forEach((row, y) => {
        row.forEach((value, x) => {
          if (value === 1) {
            this.context!.fillStyle = 'yellow'
            this.context!.fillRect(x, y, 1, 1)
          }
        })
      })

      piece.shape.forEach((row, y) => {
        row.forEach((value, x) => {
          if (value) {
            this.context.fillStyle = 'red';
            this.context.fillRect(x + piece.position.x, y + piece.position.y, 1, 1);
          }
        })
      })
    }
  }
  /**
   * 
   * Since the update method is already being 
   * called continuously due to the requestAnimationFrame loop, 
   * you don't need to call this.update() again within the onKeydown method. 
   * Every time piece position changes, the next call to update (and thus draw)
   *  will reflect those changes.
   */
  @HostListener('window:keydown', ['$event'])
  onKeydown(event: KeyboardEvent): void {
    switch (event.key) {
      case 'ArrowLeft':
        piece.position.x--;
        if (this.checkCollisions(piece)) {
          piece.position.x++;
        }
        break;
      case 'ArrowRight':
        piece.position.x++;
        if (this.checkCollisions(piece)) {
          piece.position.x--;
        }
        break;
      case 'ArrowDown':
        piece.position.y++;
        if (this.checkCollisions(piece)) {
          piece.position.y--;
        }
        break;
      default:
        break;
    }
  }


  checkCollisions(piece: Piece) {
    return piece.shape.find((row, y) => {
      return row.find((value, x) => {
        return (
          value !== 0 &&
          board[y + piece.position.y]?.[x + piece.position.x] !== 0
        )
      })
    })
  }

}
