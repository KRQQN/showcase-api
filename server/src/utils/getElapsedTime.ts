export const getElapsedTime = (timestamp: number) => {
    const elapsedMilliseconds = new Date().getTime() - timestamp;
    
    const totalSeconds = Math.floor(elapsedMilliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return { minutes, seconds };
  };