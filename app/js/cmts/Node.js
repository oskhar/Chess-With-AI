class Node {
    constructor(board, pihak) {
      this.board = board;
      this.pihak = pihak;
      this.parent = null;
      this.children = [];
      this.visits = 0;
      this.totalScore = 0;
      this.move = null;
      this.untriedMoves = this.board.all_legal_move(this.pihak);
    }
  
    selectChild() {
  
      let selectedNode = null;
      let bestScore = -Infinity;
      const explorationParameter = 1.4;
  
      for (const child of this.children) {
        const score = (child.totalScore / child.visits) + explorationParameter * Math.sqrt((2 * Math.log(this.visits)) / child.visits);
        if (score > bestScore) {
          selectedNode = child;
          bestScore = score;
        }
      }
      return selectedNode;
  
    }
  
  
    expand() {
  
      const possibleMoves = this.board.all_legal_move(this.pihak);
      for (const move of possibleMoves) {
          const newBoard = this.board.copy();
          newBoard.makeMove(move, this.pihak);
          const newPlayer = this.board.getNextPlayer(this.pihak);
          const newNode = new Node(newBoard, newPlayer, move, this);
          this.children.push(newNode);
      }
  
    }
  
  
    simulate() {
  
      const simBoard = this.board.copy();
      let simPlayer = this.pihak;
  
      while (!simBoard.isTerminal()) {
          const possibleMoves = simBoard.all_legal_move(simPlayer);
          const randomMove = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
          simBoard.makeMove(randomMove, simPlayer);
          simPlayer = simBoard.getNextPlayer(simPlayer);
      }
  
      const winner = simBoard.getWinner();
      if (winner === this.pihak) {
          return 1;
      } else if (winner === this.pihak.opponent) {
          return 0;
      } else {
          return 0.5;
      }
  
    }
  
    update(score) {
      this.visits++;
      this.totalScore += score;
    }
  
    getBestChild(maxDepth) {
  
      let bestChild = null;
      let bestScore = -Infinity;
  
      for (const child of this.children) {
          const score = child.getUCTScore();
          if (score > bestScore) {
          bestChild = child;
          bestScore = score;
          }
      }
  
      if (bestChild === null || maxDepth === 0) {
          return this;
      }
  
      return bestChild.getBestChild(maxDepth - 1);
    }
  
  }

function getBestMove(board, player, maxDepth, maxTime) {

  const startTime = new Date().getTime();
  const endTime = startTime + (maxTime * 1000);
  const root = new Node(board, player);

  while (new Date().getTime() < endTime) {

    let node = root;

    // selection
    while (node.children.length > 0) {
      node = node.selectChild();
    }

    // expansion
    if (node.visits > 0) {
      node.expand();
      node = node.selectChild();
    }

    // simulation
    const simulationResult = node.simulate();

    // backpropagation
    while (node !== null) {
      node.update(simulationResult);
      node = node.parent;
    }

  }

  const bestChild = root.getBestChild(maxDepth);
  return bestChild.move;
}