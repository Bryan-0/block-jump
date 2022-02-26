import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [isJumping, setIsJumping] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

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
      if (gameOver || !gameStarted) return;

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
    return <div className="obstacle obstacle-medium"></div>;
  };

  if (!gameStarted) {
    return (
      <div className="startMenuWrapper">
        <div className="startMenuContainer">
          <div className="startMenuTitle">Block Jump</div>
          <button
            onClick={() => {
              setGameOver(false);
              setGameStarted(true);
            }}
            className="startBtn"
          >
            Start
          </button>
        </div>
      </div>
    );
  }

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
            <button onClick={() => setGameStarted(false)} className="menuBtn">
              Main Menu
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
