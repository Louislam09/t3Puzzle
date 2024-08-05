class BlockGameScorer {
  private score: number = 0;
  private combo: number = 0;

  // Award points for placing a block
  placeBlock(): void {
    console.log("placeBlock");
    this.score += 1;
    this.combo = 0; // Reset combo when placing a single block
  }

  // Award points for completing a line (row or column)
  completeLine(): void {
    const basePoints = 10;
    this.combo += 1;
    const comboMultiplier = this.getComboMultiplier();
    this.score += basePoints * comboMultiplier;
  }

  private getComboMultiplier(): number {
    if (this.combo <= 1) return 1;
    if (this.combo === 2) return 1.5;
    if (this.combo === 3) return 2;
    return 3; // Max multiplier for combos of 4 or more
  }

  getScore(): number {
    return this.score;
  }

  getCombo(): number {
    return this.combo;
  }
  resetGame(): void {
    this.score = 0;
    this.combo = 0;
  }
}

export default BlockGameScorer;
