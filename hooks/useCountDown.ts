import * as React from 'react';

export const useCountDown = (initialCount: number) => {
  const [count, setCount] = React.useState(-1);

  const handleStartCounter = () => setCount(initialCount);

  React.useEffect(() => {
    const timer = setInterval(() => {
      if (count === 0) return;
      setCount(count - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [count]);

  return {
    count,
    handleStartCounter,
  };
};
