import { useEffect, useState } from 'react';

function App() {
  const [isJumping, setIsJumping] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {}, []);

  useEffect(() => {
    const handlePlayerJump = () => {
      if (isJumping) return;
      if (gameOver) {
        setGameOver(false);
        return;
      }

      setIsJumping(true);
      setTimeout(() => {
        setIsJumping(false);
      }, 750);
    };
    document.addEventListener('keydown', handlePlayerJump);

    const isGameOver = () => {
      const domRect1 = document
        .querySelector('.player')
        .getBoundingClientRect();
      const domRect2 = document
        .querySelector('.obstacle')
        .getBoundingClientRect();

      return !(
        domRect1.top > domRect2.bottom ||
        domRect1.right < domRect2.left ||
        domRect1.bottom < domRect2.top ||
        domRect1.left > domRect2.right
      );
    };

    const intervalId = setInterval(() => {
      if (isGameOver()) {
        setGameOver(true);
      }
    }, 100);

    return () => {
      document.removeEventListener('keydown', handlePlayerJump);
      clearInterval(intervalId);
    };
  });

  const renderObstacles = () => {
    return <div className="obstacle obstacle-easy"></div>;
  };

  return (
    <div className="gameWrapper">
      <div className="gameContainer">
        {!gameOver && (
          <>
            <div
              className={isJumping ? 'player player-jumping' : 'player'}
            ></div>
            {renderObstacles()}
          </>
        )}
        {gameOver && (
          <>
            <div className="gameOverText">Game Over!</div>
            <div className="smallText">Press any key to restart...</div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
