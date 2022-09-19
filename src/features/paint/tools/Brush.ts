import Tool from './Tool';

export default class Brush extends Tool {
  mouseDown = false;
  constructor(canvas: HTMLCanvasElement) {
    super(canvas);
    this.listen();
  }

  listen(): void {
    this.canvas.onmousemove = this.mouseMoveHandler.bind(this);
    this.canvas.onmousedown = this.mouseDownHandler.bind(this);
    this.canvas.onmouseup = this.mouseUpHandler.bind(this);
  }

  mouseUpHandler(): void {
    this.mouseDown = false;
  }
  mouseDownHandler(e: MouseEvent): void {
    if (!e.target) {
      return;
    }
    const target = e.target as HTMLElement;
    this.mouseDown = true;
    this.ctx.beginPath();
    this.ctx.moveTo(e.pageX - target.offsetLeft, e.pageY - target.offsetTop);
  }
  mouseMoveHandler(e: MouseEvent): void {
    if (!e.target) {
      return;
    }
    const target = e.target as HTMLElement;
    if (this.mouseDown) {
      this.draw(e.pageX - target.offsetLeft, e.pageY - target.offsetTop);
    }
  }

  draw(x: number, y: number): void {
    this.ctx.lineTo(x, y);
    this.ctx.stroke();
  }
}
