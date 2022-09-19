import { Dispatch, FC } from 'react';
import { GiPencilBrush, GiLargePaintBrush } from 'react-icons/gi';
import { BsEraserFill, BsFileX, BsCrop } from 'react-icons/bs';
import { FaPaste } from 'react-icons/fa';
import { MdOutlineEditOff } from 'react-icons/md';
import { ToolTypeName } from '../types';
import styles from './ToolBar.module.scss';

interface ToolBarProps {
  setTool: (toolType: ToolTypeName) => void;
  setFillStyle: Dispatch<CanvasRenderingContext2D['fillStyle']>;
  setStrokeStyle: Dispatch<CanvasRenderingContext2D['strokeStyle']>;
  lineWidth: number;
  setLineWidth: Dispatch<number>;
  canvasClear: () => void;
}

export const ToolBar: FC<ToolBarProps> = ({
  setTool,
  setStrokeStyle,
  setFillStyle,
  lineWidth,
  setLineWidth,
  canvasClear,
}) => {
  return (
    <div className={styles.wrap}>
      <div className={styles.buttonsBlock}>
        <button className={styles.toolButton} onClick={() => setTool('marker')}>
          <GiLargePaintBrush size="2em" color="#69a5e1" />
        </button>
        <button className={styles.toolButton} onClick={() => setTool('brush')}>
          <GiPencilBrush size="2em" color="#69a5e1" />
        </button>
        <button className={styles.toolButton} onClick={() => setTool('line')}>
          <MdOutlineEditOff size="2em" color="#69a5e1" />
        </button>
        <button className={styles.toolButton} onClick={() => setTool('eraser')}>
          <BsEraserFill size="2em" color="#ff9999" />
        </button>

        <button className={styles.toolButton} onClick={() => setTool('rect')}>
          <svg viewBox="0 0 4 2.5">
            <rect
              width="4"
              height="2.5"
              style={{
                fill: 'transparent',
                strokeWidth: '0.15',
                strokeDasharray: '0.3',
                stroke: '#262a2e',
              }}
            />
          </svg>
        </button>
        <button className={styles.toolButton} onClick={() => setTool('crop')}>
          <BsCrop size="2em" color="#69a5e1" />
        </button>
        <button className={styles.toolButton} onClick={() => setTool('paste')}>
          <FaPaste size="2em" color="#69a5e1" />
        </button>
        <button className={styles.toolButton} onClick={() => canvasClear()}>
          <BsFileX size="2em" color="red" />
        </button>
        <div className={styles.buttonsBlockTittle}>Instruments</div>
      </div>
      <div className={styles.colorsWrap}>
        <span className={styles.toolColor}>
          <label>fill</label>
          <input type="color" onChange={(e) => setFillStyle(e.target.value)} />
        </span>

        <span className={styles.toolColor}>
          <label>stroke</label>
          <input
            type="color"
            onChange={(e) => setStrokeStyle(e.target.value)}
          />
        </span>

        <span className={styles.toolLineWidth}>
          <label>width</label>
          <input
            type="number"
            onChange={(e) => setLineWidth(Number.parseInt(e.target.value))}
            value={lineWidth}
            max={20}
            min={1}
          />
        </span>
        <div className={styles.colorsTittle}>Colors</div>
      </div>
    </div>
  );
};
