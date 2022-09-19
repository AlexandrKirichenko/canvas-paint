import { WINDOW_BUFFER_ID } from '../config';
import { RectItem } from '../types';
import Tool from './Tool';

export default class Rect extends Tool {
  private mouseDown = false;
  private startX = 0;
  private startY = 0;
  private saved = '';
  private width = 0;
  private height = 0;
  private imData: any = null;
  private rect: RectItem | null = null;

  constructor(canvas: HTMLCanvasElement) {
    super(canvas);
    this.canvas.tabIndex = 1000;
    this.listen();
    this.imData = this.ctx.getImageData(
      0,
      0,
      this.canvas.width,
      this.canvas.height,
    );
  }

  listen(): void {
    this.canvas.onmousemove = this.mouseMoveHandler.bind(this);
    this.canvas.onmousedown = this.mouseDownHandler.bind(this);
    this.canvas.onmouseup = this.mouseUpHandler.bind(this);
  }

  mouseUpHandler(): void {
    this.mouseDown = false;

    if (this.imData) {
      this.ctx.putImageData(this.imData, 0, 0);
    }

    if (this.rect) {
      window[WINDOW_BUFFER_ID] = this.ctx.getImageData(
        this.rect.x,
        this.rect.y,
        this.rect.w,
        this.rect.h,
      );
    }
  }
  mouseDownHandler(e: MouseEvent): void {
    if (!e.target) {
      return;
    }

    const target = e.target as HTMLElement;
    this.mouseDown = true;
    this.ctx.beginPath();
    this.imData = this.ctx.getImageData(
      0,
      0,
      this.canvas.width,
      this.canvas.height,
    );
    this.startX = e.pageX - target.offsetLeft;
    this.startY = e.pageY - target.offsetTop;
    this.saved = this.canvas.toDataURL();
  }
  mouseMoveHandler(e: MouseEvent): void {
    if (!e.target) {
      return;
    }
    const target = e.target as HTMLElement;
    if (this.mouseDown) {
      const currentX = e.pageX - target.offsetLeft;
      const currentY = e.pageY - target.offsetTop;
      this.width = currentX - this.startX;
      this.height = currentY - this.startY;
      this.draw(this.startX, this.startY, this.width, this.height);
    }
  }

  draw(x: number, y: number, w: number, h: number): void {
    const img = new Image();

    img.src = this.saved;

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
    this.ctx.beginPath();
    this.ctx.lineWidth = 1;
    this.ctx.strokeStyle = 'blue';
    this.ctx.setLineDash([10, 10]);
    this.rect = { x, y, w, h };
    this.ctx.rect(x, y, w, h);
    this.ctx.fill();
    this.ctx.stroke();
    this.ctx.setLineDash([]);
    this.ctx.fillStyle = 'transparent';
  }
}
