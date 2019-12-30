import React, { useState, useRef } from 'react';
import styles from './index.css';
import classnames from 'classnames';

export interface SashProps {
  /**
   * 侧边内容
   */
  renderSide: React.ReactElement;
  /**
   * 方向, vertical: 垂直, horizontal: 水平
   */
  direction: 'vertical' | 'horizontal';
  /**
   * 默认侧边尺寸
   */
  defaultSize: number;
  /**
   * 侧边最小尺寸
   */
  minSize?: number;
  /**
   * 侧边最大尺寸
   */
  maxSize?: number;
}

/**
 * 可resize的组件
 * @param props
 */
const Sash: React.FC<SashProps> = props => {
  const { renderSide, children, direction, defaultSize, minSize, maxSize } = props;
  const [size, setSize] = useState(defaultSize);
  const [isMoving, setIsMoving] = useState(false);
  const wrapDom = useRef<HTMLDivElement>(null);

  const containerCls = classnames(styles['sash-container-' + direction], {
    [styles['is-moving']]: isMoving,
  });

  const blockStyle =
    direction === 'vertical'
      ? {
          left: 0,
          top: size - 3,
        }
      : {
          top: 0,
          left: size - 3,
        };

  const onMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    e.preventDefault();

    const wrapDomPositon = wrapDom?.current?.getBoundingClientRect?.();

    const wrapDomEvent = {
      X: wrapDomPositon?.x || 0,
      Y: wrapDomPositon?.y || 0,
    };
    const el = e.currentTarget;

    const moveEvent = {
      startX: e.pageX,
      startY: e.pageY,
      currentX: e.pageX,
      currentY: e.pageY,
    };

    const onMove = (e1: any) => {
      moveEvent.currentX = e1.pageX;
      moveEvent.currentY = e1.pageY;

      doResize();
    };

    const onUp = (e2: any) => {
      setIsMoving(false);
      window.removeEventListener('mousemove', onMove, false);
      window.removeEventListener('mouseup', onUp, false);

      el.removeChild(style);
    };

    const style = document.createElement('style');
    style.type = 'text/css';
    el.appendChild(style);

    const updateStyle = () => {
      const cursor = direction === 'vertical' ? `ns-resize` : `ew-resize`;
      style.innerHTML = `*{cursor: ${cursor} !important;}`;
    };

    updateStyle();

    const doResize = () => {
      const size =
        direction === 'vertical'
          ? moveEvent.currentY - wrapDomEvent.Y
          : moveEvent.currentX - wrapDomEvent.X;
      if (size < 0 || (maxSize && size > maxSize)) return;
      if (minSize && size < minSize) {
        if (size < minSize / 2) {
          setSize(0);
        }
      } else {
        setSize(size);
      }
    };

    setIsMoving(true);
    window.addEventListener('mousemove', onMove, false);
    window.addEventListener('mouseup', onUp, false);
  };

  return (
    <div className={containerCls} ref={wrapDom}>
      <div className={styles['sash-render-side']} style={{ flexBasis: size }}>
        {renderSide}
      </div>
      <div className={styles['sash-content']}>{children}</div>
      <div className={styles['sash-block']} onMouseDown={onMouseDown} style={blockStyle}/>
    </div>
  );
};

export default Sash;
