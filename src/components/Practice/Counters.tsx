import { useState, useEffect } from 'react';

const Counter = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCount((prevCount) => {
        if (prevCount < 9) {
          return prevCount + 1;
        } else {
          clearInterval(intervalId);
          return 0;
        }
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  Array.prototype.sum = function () {
    return this.reduce((acc, curr) => acc + curr, 0);
  };

  console.log([1, 2, 3].sum());

  type WithSum<T extends Array<any>> = T & { sum(): number };

  function withSum<T extends Array<any>>(arr: T): WithSum<T> {
    return {
      ...arr,
      sum() {
        return arr.reduce((acc, curr) => (acc as number) + (curr as number), 0);
      },
    };
  }

  const numbers: WithSum<number[]> = withSum([1, 2, 3, 4, 5]);
  console.log(numbers.sum()); // Output: 15

  return (
    <div>
      <h1>{count}</h1>
    </div>
  );
};

export default Counter;
