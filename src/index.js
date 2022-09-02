import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

const axisElementsNumber = 3;
const lrDiagonal = Array.from([...Array(axisElementsNumber).keys()], x => x * (axisElementsNumber + 1));
const rlDiagonal = Array.from([...Array(axisElementsNumber).keys()], x => (axisElementsNumber - 1) * (x + 1));

function Cell(props) {
  return (
      <button className={`cell ${ props.value }`} onClick={props.onClick}>
      </button>
  );
}

function WinningMessage(props) {
  return (
      <div className={`winning-message ${ props.showWinningMessage }`}>
        <button>Restart</button>
      </div>
  );
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cells: Array(9).fill(null),
      cellType: 'x',
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

    if (this.isWinner(index, currentCellType, cells)) {
      console.log(`${currentCellType} is a winner!`);

      // сюда нужно поставить ресет ячеек, сделать кнопку с Reset
    }
  }

  isWinner(index, currentCellType, cells) {
    const columnIndex = this.getColumnIndex(index, axisElementsNumber);
    const rowIndex = this.getRowIndex(index, columnIndex, axisElementsNumber);
    const columnElementsIndexes = this.getColumnElementsIndexes(columnIndex, axisElementsNumber);
    const rowElementsIndexes = this.getRowElementsIndexes(rowIndex, axisElementsNumber);
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

  getColumnIndex = (elementIndex, axisElementsNumber) => elementIndex % axisElementsNumber;
  getRowIndex = (elementIndex, columnIndex, axisElementsNumber) => (elementIndex - columnIndex) / axisElementsNumber;
  getRowElementsIndexes = (rowIndex, axisElementsNumber) => Array.from([...Array(axisElementsNumber).keys()], x => rowIndex * axisElementsNumber + x);
  getColumnElementsIndexes = (columnIndex, axisElementsNumber) => Array.from([...Array(axisElementsNumber).keys()], x => columnIndex + axisElementsNumber * x);

  resetBoard() {
    this.setState({
      cells: Array(9).fill(null),
      cellType: 'x',
    });
  }

  renderCell(index) {
    return (
        <Cell
        value={ this.state.cells[index] }
        onClick={ () => this.handleClick(index) }
        />
    );
  }

  renderWinningMessage() {
    return (
        <WinningMessage
            showWinningMessage={ this.state.showWinningMessage }
        />
    );
  }

  render() {
    return (
        <div className={`board ${ this.state.cellType }`}>
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
  render() {
    return (
            <Board />
    );
  }
}

// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game />);