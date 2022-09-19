import { FC, useEffect, useRef, useState } from 'react';
import { TOOL_TYPE, ToolInstanceType, ToolTypeName } from '../types';
import { ToolBar } from '../ToolBar';
import { TOOLS_WITH_CLASSIC_PROPERTIES } from '../config';
import Paste from '../tools/Paste';
import Crop from '../tools/Crop';
import styles from './PaintMain.module.scss';

export const PaintMain: FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [tool, setTool] = useState<ToolInstanceType | null>(null);

  const [fillStyle, setFillStyle] =
    useState<CanvasRenderingContext2D['fillStyle']>('#000000');

  const [strokeStyle, setStrokeStyle] =
    useState<CanvasRenderingContext2D['strokeStyle']>('#000000');

  const [lineWidth, setLineWidth] = useState<number>(10);

  useEffect(() => {
    if (tool) {
      tool.strokeColor = strokeStyle;
      tool.fillColor = fillStyle;
      tool.lineWidth = lineWidth;
    }
  }, [fillStyle, strokeStyle, lineWidth]);

  useEffect(() => {
    const cb = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && tool instanceof Paste) {
        createTool('brush');
      }
    };

    window.addEventListener('keyup', cb);
    return () => {
      window.removeEventListener('keyup', cb);
    };
  }, [tool]);

  useEffect(() => {
    if (canvasRef.current) {
      createTool('brush');
    }
  }, []);

  const createTool = (toolType: ToolTypeName) => {
    if (!canvasRef.current) {
      return;
    }

    if (tool instanceof Paste) {
      tool.destructor();
    }
    if (tool instanceof Crop) {
      tool.destructor();
    }
    const newTool = new TOOL_TYPE[toolType](canvasRef.current);
    newTool.ctx.globalAlpha = 1;

    if (TOOLS_WITH_CLASSIC_PROPERTIES.includes(toolType)) {
      newTool.strokeColor = strokeStyle;
      newTool.fillColor = fillStyle;
      newTool.lineWidth = lineWidth;
    } else if (toolType === 'eraser') {
      newTool.strokeColor = '#FFFFFF';
      newTool.fillColor = '#FFFFFFF';
      newTool.lineWidth = lineWidth;
    }

    setTool(newTool);
  };

  const canvasClear = () => {
    if (tool) {
      tool.clearCnv();
    }
  };

  const handleSetTool = (toolType: ToolTypeName) => {
    if (!canvasRef.current) {
      return;
    }
    createTool(toolType);
  };

  return (
    <div className={styles.wrap}>
      <div>
        <ToolBar
          setTool={handleSetTool}
          setFillStyle={setFillStyle}
          setStrokeStyle={setStrokeStyle}
          lineWidth={lineWidth}
          setLineWidth={setLineWidth}
          canvasClear={canvasClear}
        />
      </div>
      <div className={styles.canvasWrap}>
        <canvas
          className={styles.canvas}
          ref={canvasRef}
          width={800}
          height={600}
          style={{ backgroundColor: 'white' }}
        />
      </div>
    </div>
  );
};
