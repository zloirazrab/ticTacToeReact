import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

function Cell(props) {
  return (
      <button className={`cell ${ props.value }`} onClick={ props.onClick }>
      </button>
  );
}

function WinningMessage(props) {
  return (
      <div className={`winning-message ${ props.showWinningMessage }`}>
        <div>{`The winner is ${ props.winner === 'x' ? 'X' : 'O' }`}</div>
        <button onClick={ props.onClick }>Restart</button>
      </div>
  );
}

class Board extends React.Component {
  renderCell(index) {
    return (
        <Cell
            value={this.props.cells[index]}
            onClick={() => this.props.onClick(index)}
        />
    );
  }

  render() {
    return (
        <div className={`board ${this.props.cellType}`}>
          {this.renderCell(0)}
          {this.renderCell(1)}
          {this.renderCell(2)}
          {this.renderCell(3)}
          {this.renderCell(4)}
          {this.renderCell(5)}
          {this.renderCell(6)}
          {this.renderCell(7)}
          {this.renderCell(8)}
        </div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cells: Array(9).fill(null),
      cellType: 'x',
      winner: null,
      showWinningMessage: null,
    };
  }

  handleClick(index) {
    const cells = this.state.cells.slice();
    const currentCellType = this.state.cellType;

    if (cells[index]) {
      return;
    }

    cells[index] = currentCellType;

    this.setState({
      cells: cells,
      cellType: this.state.cellType === 'x' ? 'circle' : 'x',
    });

    if (isWinner(index, currentCellType, cells)) {
      this.setState({
        winner: currentCellType,
        showWinningMessage: 'show',
      });
    }
  }

  resetBoard() {
    this.setState({
      cells: Array(9).fill(null),
      cellType: 'x',
      winner: null,
      showWinningMessage: null,
    });
  };

  render() {
    return (
        <div className="game">
          <Board
              cells={this.state.cells}
              onClick={index => this.handleClick(index)}
              cellType={this.state.cellType}
          />
          <WinningMessage
              winner={this.state.winner}
              showWinningMessage={this.state.showWinningMessage}
              onClick={() => this.resetBoard()}
          />
        </div>
    );
  }
}

// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game/>);

const axisElementsNumber = 3;
const lrDiagonal = Array.from([...Array(axisElementsNumber).keys()], x => x * (axisElementsNumber + 1));
const rlDiagonal = Array.from([...Array(axisElementsNumber).keys()], x => (axisElementsNumber - 1) * (x + 1));

function isWinner(index, currentCellType, cells) {
  const columnIndex = getColumnIndex(index, axisElementsNumber);
  const rowIndex = getRowIndex(index, columnIndex, axisElementsNumber);
  const columnElementsIndexes = getColumnElementsIndexes(columnIndex, axisElementsNumber);
  const rowElementsIndexes = getRowElementsIndexes(rowIndex, axisElementsNumber);
  let isWinnerOnRlDiagonal;
  let isWinnerOnLrDiagonal;

  const isWinnerOnColumn = columnElementsIndexes.every(index => {
    return cells[index] === currentCellType;
  });

  const isWinnerOnRow = rowElementsIndexes.every(index => {
    return cells[index] === currentCellType;
  });

  if (rlDiagonal.includes(index)) {
    isWinnerOnRlDiagonal = rlDiagonal.every(index => {
      return cells[index] === currentCellType;
    });
  }

  if (lrDiagonal.includes(index)) {
    isWinnerOnLrDiagonal = lrDiagonal.every(index => {
      return cells[index] === currentCellType;
    });
  }

  return isWinnerOnColumn || isWinnerOnRow || isWinnerOnLrDiagonal || isWinnerOnRlDiagonal;
}

const getColumnIndex = (elementIndex, axisElementsNumber) => elementIndex % axisElementsNumber;
const getRowIndex = (elementIndex, columnIndex, axisElementsNumber) => (elementIndex - columnIndex) / axisElementsNumber;
const getRowElementsIndexes = (rowIndex, axisElementsNumber) => Array.from([...Array(axisElementsNumber).keys()], x => rowIndex * axisElementsNumber + x);
const getColumnElementsIndexes = (columnIndex, axisElementsNumber) => Array.from([...Array(axisElementsNumber).keys()], x => columnIndex + axisElementsNumber * x);
