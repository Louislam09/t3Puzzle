export const BOARD_ROWS_COLS = 9;
export const BLOCK_SIZE = 43.5;
export type Block = number[][];

export const createEmptyBoard = (rows: number, cols?: number): number[][] => {
    return Array(cols || rows)
        .fill(null)
        .map(() => Array(rows).fill(0));
};

export const BLOCKS: Block[] = [
    [[1]], // Single square = 1
    [[1, 1]], // Horizontal duo = 2
    [[1], [1]], // Vertical duo = 3
    [
        [1, 1],
        [1, 1],
    ], // 2x2 square = 4
    [[1, 1, 1]], // Horizontal trio = 5
    [[1], [1], [1]], // Vertical trio = 6
    [
        [1, 1],
        [1, 0],
    ], // L-shape   = 7
    [
        [1, 1],
        [0, 1],
    ], // Reverse L-shape  = 8
    // Additional shapes  = 8
    [
        [1, 1, 1, 1],
    ], // Horizontal quartet  = 9
    [
        [1], [1], [1], [1],
    ], // Vertical quartet  = 10
    [
        [1, 1, 0],
        [0, 1, 1],
    ], // Z-shape  = 11
    [
        [0, 1, 1],
        [1, 1, 0],
    ], // Reverse Z-shape  = 12
];


export const generateNextBlocks = (): number[] => {
    // Generate 3 random blocks
    return Array(3)
        .fill(null)
        .map(() => Math.floor(Math.random() * BLOCKS.length));
};