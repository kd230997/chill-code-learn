"use client";

import { useState } from "react";
import { Button, Card } from "@shared/components";
import styles from "./TicTacToeGame.module.scss";

type Player = "X" | "O" | null;
type Board = Player[];

const WINNING_COMBINATIONS = [
    [0, 1, 2], // top row
    [3, 4, 5], // middle row
    [6, 7, 8], // bottom row
    [0, 3, 6], // left column
    [1, 4, 7], // middle column
    [2, 5, 8], // right column
    [0, 4, 8], // diagonal
    [2, 4, 6], // anti-diagonal
];

function calculateWinner(board: Board): { winner: Player; line: number[] | null } {
    for (const [a, b, c] of WINNING_COMBINATIONS) {
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return { winner: board[a], line: [a, b, c] };
        }
    }
    return { winner: null, line: null };
}

function Square({
    value,
    onClick,
    isWinning,
    disabled,
}: {
    value: Player;
    onClick: () => void;
    isWinning: boolean;
    disabled: boolean;
}) {
    return (
        <Button
            className={`${styles.square} ${value ? styles[`square-${value.toLowerCase()}`] : ""} ${isWinning ? styles["square-winning"] : ""}`}
            onClick={onClick}
            disabled={disabled || value !== null}
            aria-label={value ? `Square with ${value}` : "Empty square"}
        >
            {value && <span className={styles["square-value"]}>{value}</span>}
        </Button>
    );
}

export function TicTacToeGame() {
    const [board, setBoard] = useState<Board>(Array(9).fill(null));
    const [isXNext, setIsXNext] = useState(true);
    const [scores, setScores] = useState({ X: 0, O: 0, draws: 0 });

    const { winner, line: winningLine } = calculateWinner(board);
    const isDraw = !winner && board.every((square) => square !== null);
    const currentPlayer: Player = isXNext ? "X" : "O";
    const gameOver = winner !== null || isDraw;

    const handleClick = (index: number) => {
        if (board[index] || winner) return;

        const newBoard = [...board];
        newBoard[index] = currentPlayer;
        setBoard(newBoard);
        setIsXNext(!isXNext);

        // Check for winner after move
        const result = calculateWinner(newBoard);
        if (result.winner) {
            setScores((prev) => ({
                ...prev,
                [result.winner!]: prev[result.winner!] + 1,
            }));
        } else if (newBoard.every((square) => square !== null)) {
            setScores((prev) => ({ ...prev, draws: prev.draws + 1 }));
        }
    };

    const resetGame = () => {
        setBoard(Array(9).fill(null));
        setIsXNext(true);
    };

    const resetAll = () => {
        resetGame();
        setScores({ X: 0, O: 0, draws: 0 });
    };

    const getStatusMessage = () => {
        if (winner) return `🎉 Player ${winner} wins!`;
        if (isDraw) return "🤝 It's a draw!";
        return `Next player: ${currentPlayer}`;
    };

    return (
        <div className={styles.container}>
            <Card className={styles["game-card"]}>
                <div className={styles["icon-wrapper"]}>
                    <div className={styles["icon-badge"]}>🎮</div>
                </div>

                <h1 className={styles["page-title"]}>Tic Tac Toe</h1>
                <p className={styles["page-subtitle"]}>Classic game, modern design</p>

                {/* Score Board */}
                <div className={styles["score-board"]}>
                    <div className={`${styles["score-item"]} ${styles["score-x"]}`}>
                        <span className={styles["score-label"]}>Player X</span>
                        <span className={styles["score-value"]}>{scores.X}</span>
                    </div>
                    <div className={`${styles["score-item"]} ${styles["score-draw"]}`}>
                        <span className={styles["score-label"]}>Draws</span>
                        <span className={styles["score-value"]}>{scores.draws}</span>
                    </div>
                    <div className={`${styles["score-item"]} ${styles["score-o"]}`}>
                        <span className={styles["score-label"]}>Player O</span>
                        <span className={styles["score-value"]}>{scores.O}</span>
                    </div>
                </div>

                {/* Status */}
                <div
                    className={`${styles.status} ${winner ? styles["status-winner"] : ""} ${isDraw ? styles["status-draw"] : ""}`}
                >
                    {getStatusMessage()}
                </div>

                {/* Game Board */}
                <div className={styles.board}>
                    {board.map((value, index) => (
                        <Square
                            key={index}
                            value={value}
                            onClick={() => handleClick(index)}
                            isWinning={winningLine?.includes(index) ?? false}
                            disabled={gameOver}
                        />
                    ))}
                </div>

                {/* Actions */}
                <div className={styles.actions}>
                    <Button variant="primary" onClick={resetGame}>
                        {gameOver ? "Play Again" : "Restart"}
                    </Button>
                    <Button variant="ghost" onClick={resetAll}>
                        Reset Scores
                    </Button>
                </div>
            </Card>
        </div>
    );
}
