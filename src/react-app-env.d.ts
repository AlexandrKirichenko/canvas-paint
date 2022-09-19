/// <reference types="react-scripts" />
import { WINDOW_BUFFER_ID } from './features/paint/config';

declare global {
  interface Window {
    [WINDOW_BUFFER_ID]: ImageData | null;
  }
}
