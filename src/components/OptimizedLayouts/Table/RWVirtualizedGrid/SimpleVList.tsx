import { useRef, useEffect } from 'react';
import { VariableSizeList as List } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import styles from './styles';
import './index.css';

const SimpleVirtualList = () => {
  // References
  const listRef = useRef<any>();
  const rowHeights = useRef<any>();

  function getRowHeight(index: string | number) {
    return rowHeights?.current?.[index] ?? (0 + 8 || 82);
  }

  function Row({ index, style }: any) {
    const rowRef = useRef<any>();

    useEffect(() => {
      if (rowRef.current) {
        setRowHeight(index, rowRef.current.clientHeight);
      }
      // eslint-disable-next-line
    }, [rowRef]);

    return (
      <div style={style}>
        <div ref={rowRef} style={styles.newMessageContainer}>
          <div style={styles.newMessage}>
            {Array.from(Array(index).keys()).map((el) => (
              <span key={el}>{el}</span>
            ))}
          </div>
        </div>
      </div>
    );
  }

  function setRowHeight(index: any, size: any) {
    listRef.current.resetAfterIndex(0);
    rowHeights.current = { ...rowHeights.current, [index]: size };
  }

  return (
    <AutoSizer style={styles.messagesContainer}>
      {({ height, width }) => (
        <List
          className="list"
          height={height - 74}
          itemCount={5}
          itemSize={getRowHeight}
          ref={listRef}
          width={width}
        >
          {Row}
        </List>
      )}
    </AutoSizer>
  );
};

export default SimpleVirtualList;
