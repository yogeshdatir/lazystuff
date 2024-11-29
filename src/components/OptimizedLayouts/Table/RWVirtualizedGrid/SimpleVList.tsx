import { useRef, useEffect, useState } from 'react';
import { VariableSizeList as List } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import styles from './styles';

const SimpleVirtualList = () => {
  // References
  const listRef = useRef<any>();
  const rowHeights = useRef<any>();
  const [additionalItems, setAdditionalItems] = useState<number>(0);

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
            {index % 2 === 0 ? (
              <>
                <div>{index}</div>
                <div>{index}</div>
              </>
            ) : (
              <>
                <div>{index}</div>
                <div>{index}</div>
                <div>{index}</div>
                <div>{index}</div>
              </>
            )}
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
    <>
      <AutoSizer style={styles.messagesContainer}>
        {({ height, width }) => (
          <>
            <List
              height={height - 74}
              itemCount={50 + additionalItems}
              estimatedItemSize={150}
              itemSize={getRowHeight}
              ref={listRef}
              width={width}
            >
              {Row}
            </List>

            <button onClick={() => setAdditionalItems((prev) => prev + 40)}>
              View More
            </button>
          </>
        )}
      </AutoSizer>
    </>
  );
};

export default SimpleVirtualList;
