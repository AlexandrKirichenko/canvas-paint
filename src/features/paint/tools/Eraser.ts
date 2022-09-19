import Brush from './Brush';

export default class Eraser extends Brush {
  constructor(canvas: HTMLCanvasElement) {
    super(canvas);
  }

  destroyEvents(): void {
    super.destroyEvents();
  }

  draw(x: number, y: number): void {
    this.ctx.strokeStyle = 'white';
    this.ctx.lineTo(x, y);
    this.ctx.stroke();
  }
}
