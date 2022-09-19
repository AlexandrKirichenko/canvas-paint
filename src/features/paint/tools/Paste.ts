import { WINDOW_BUFFER_ID } from '../config';
import Tool from './Tool';

export default class Paste extends Tool {
  mouseDown = false;
  tmpCanvas: HTMLCanvasElement | null = null;
  tmpCtx: CanvasRenderingContext2D | null = null;
  offsetX = 0;
  offsetY = 0;

  constructor(canvas: HTMLCanvasElement) {
    super(canvas);
    this.listen();
    const buffer = window[WINDOW_BUFFER_ID];
    if (!buffer) {
      return;
    }

    this.tmpCanvas = document.createElement('canvas');
    document.body.append(this.tmpCanvas);
    this.tmpCanvas.width = buffer.width;
    this.tmpCanvas.height = buffer.height;
    this.tmpCtx = this.tmpCanvas.getContext('2d');
    this.tmpCanvas.style.backgroundColor = '#ffffff';

    if (!this.tmpCtx) {
      return;
    }

    this.tmpCtx.putImageData(buffer, 0, 0);
    this.tmpCanvas.style.position = 'fixed';
    this.tmpCanvas.style.zIndex = '1000';
    document.body.style.cursor = 'none';
  }

  destructor() {
    document.body.style.cursor = 'default';
    if (this.tmpCanvas) {
      this.tmpCanvas.remove();
    }
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
    this.mouseDown = true;
    const buffer = window[WINDOW_BUFFER_ID];

    if (!buffer || !this.tmpCanvas) {
      return;
    }

    this.ctx.putImageData(
      buffer,
      this.offsetX - this.canvas.offsetLeft,
      this.offsetY - this.canvas.offsetTop,
    );
  }

  mouseMoveHandler(e: MouseEvent): void {
    if (!e.target) {
      return;
    }

    const target = e.target as HTMLElement;

    this.draw(e.pageX - target.offsetLeft, e.pageY - target.offsetTop);
  }

  draw(x: number, y: number): void {
    const buffer = window[WINDOW_BUFFER_ID];

    if (!buffer || !this.tmpCanvas) {
      return;
    }

    this.offsetX = x + buffer.width / 2;
    this.offsetY = y + buffer.height / 2;

    this.tmpCanvas.style.left = `${this.offsetX}px`;
    this.tmpCanvas.style.top = `${this.offsetY}px`;
  }
}
