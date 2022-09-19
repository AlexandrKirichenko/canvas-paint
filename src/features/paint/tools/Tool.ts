export default class Tool {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  canvasPos: DOMRect;
  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.canvasPos = canvas.getBoundingClientRect();
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      throw Error('Error to get context!');
    }

    this.ctx = ctx;
    this.destroyEvents();
  }
  set fillColor(color: CanvasRenderingContext2D['fillStyle']) {
    this.ctx.fillStyle = color;
  }
  set strokeColor(color: CanvasRenderingContext2D['strokeStyle']) {
    this.ctx.strokeStyle = color;
  }

  set lineWidth(width: number) {
    this.ctx.lineWidth = width;
  }

  clearCnv(): void {
    this.ctx.clearRect(0, 0, 800, 600);
    // this.canvas.width = 800;
  }

  destroyEvents(): void {
    this.canvas.onmousemove = null;
    this.canvas.onmousedown = null;
    this.canvas.onmouseup = null;
    this.canvas.onkeydown = null;
  }
}
