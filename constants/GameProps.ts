export type BlockType = number[][];

export const createEmptyBoard = (rows: number): number[][] => {
  return Array(rows)
    .fill(null)
    .map(() => Array(rows).fill(0));
};

export const BLOCKS: BlockType[] = [
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
  [[1, 1, 1, 1]], // Horizontal quartet  = 9
  [[1], [1], [1], [1]], // Vertical quartet  = 10
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

export const getColor = (value: number): string => {
  // const colors = [
  //   "#2C3E50", // Deep blue-grey
  //   "#E74C3C", // Bright red
  //   "#3498DB", // Sky blue
  //   "#F1C40F", // Sunflower yellow
  //   "#1ABC9C", // Turquoise
  //   "#9B59B6", // Amethyst purple
  //   "#27AE60", // Nephritis green
  //   "#F39C12", // Orange
  //   "#16A085", // Green sea
  //   "#D35400", // Pumpkin orange
  //   "#34495E", // Wet asphalt blue
  //   "#2ECC71", // Emerald green
  // ];
  const colors = [
    "#FF5733", // Fiery Red
    "#33FF57", // Bright Green
    "#3357FF", // Vivid Blue
    "#FF33A8", // Hot Pink
    "#FFD700", // Golden Yellow
    "#33FFF5", // Cyan
    "#FF8C33", // Orange
    "#8D33FF", // Electric Purple
    "#33FFDD", // Aqua
    "#FF3333", // Red
    "#33FF33", // Lime
    "#FFFFFF", // White
  ];

  return colors[value] || "#FFFFFF"; // Blanco por defecto
};

export let DEFAULT_BOARD = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
];
