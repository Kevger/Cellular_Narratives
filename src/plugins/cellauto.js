class Cell {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.delays = [];
  }
  process() {}
  reset() {}
  cntNeighborsWithVal(neighbors, value) {
    let surrounding = 0;
    for (let i = 0; i < neighbors.length; ++i)
      surrounding += +(neighbors[i] !== null && neighbors[i][value]);
    return surrounding;
  }
  delay(numSteps, fn) {
    this.delays.push({ steps: numSteps, action: fn });
  }
  performDelays() {
    for (let i = 0; i < this.delays.length; ++i) {
      if (--this.delays[i].steps <= 0) {
        this.delays[i].action(this);
        this.delays.splice(i, 1);
        --i;
      }
    }
  }
  avgNeighborsWithVal(neighbors, value) {
    let summed = 0.0;
    for (let i = 0; i < neighbors.length; ++i)
      if (neighbors[i] !== null && neighbors[i][value])
        summed += neighbors[i][value];
    return summed / neighbors.length;
  }
}

export default class CAWorld {
  constructor(options) {
    this.options = options;
    this.TOPLEFT = { index: 0, x: -1, y: -1 };
    this.TOP = { index: 1, x: 0, y: -1 };
    this.TOPRIGHT = { index: 2, x: 1, y: -1 };
    this.LEFT = { index: 3, x: -1, y: 0 };
    this.RIGHT = { index: 4, x: 1, y: 0 };
    this.BOTTOMLEFT = { index: 5, x: -1, y: 1 };
    this.BOTTOM = { index: 6, x: 0, y: 1 };
    this.BOTTOMRIGHT = { index: 7, x: 1, y: 1 };
    this.step = () => {
      for (let y = 0; y < this.height; ++y)
        for (let x = 0; x < this.width; ++x) this.grid[y][x].reset();
      for (let y = this.height - 1; y >= 0; --y)
        for (let x = this.width - 1; x >= 0; --x) {
          const cell = this.grid[y][x];
          cell.process(this.getNeighbors(x, y), this.cellSettings);
          cell.performDelays();
        }
    };

    this.getNeighbors = function(x, y) {
      const NEIGHBORLOCS = [
        {
          dX: -1,
          dY: -1
        },
        {
          dX: 0,
          dY: -1
        },
        {
          dX: 1,
          dY: -1
        },
        {
          dX: -1,
          dY: 0
        },
        {
          dX: 1,
          dY: 0
        },
        {
          dX: -1,
          dY: 1
        },
        {
          dX: 0,
          dY: 1
        },
        {
          dX: 1,
          dY: 1
        }
      ];
      const neighbors = [null, null, null, null, null, null, null, null];
      for (let i = 0; i < NEIGHBORLOCS.length; ++i) {
        let neighborX = x + NEIGHBORLOCS[i].dX;
        let neighborY = y + NEIGHBORLOCS[i].dY;
        if (this.wrap) {
          neighborX = (neighborX + this.width) % this.width;
          neighborY = (neighborY + this.height) % this.height;
        }
        if (
          !this.wrap &&
          (neighborX < 0 ||
            neighborY < 0 ||
            neighborX >= this.width ||
            neighborY >= this.height)
        ) {
          neighbors[i] = null;
        } else {
          neighbors[i] = this.grid[neighborY][neighborX];
        }
      }
      return neighbors;
    };
    this.initialize = function(arrayTypeDist) {
      // sort the cell types by distribution
      arrayTypeDist.sort((a, b) => (a.distribution > b.distribution ? 1 : -1));
      let totalDist = 0;
      // add all distributions together
      for (let i = 0; i < arrayTypeDist.length; ++i) {
        totalDist += arrayTypeDist[i].distribution;
        arrayTypeDist[i].distribution = totalDist;
      }
      this.grid = Array.from(Array(this.height), () => new Array(this.width));
      for (let y = 0; y < this.height; ++y) {
        for (let x = 0; x < this.width; ++x) {
          for (let i = 0; i < arrayTypeDist.length; ++i) {
            if (Math.random() * 100 <= arrayTypeDist[i].distribution) {
              this.grid[y][x] = new this.cellTypes[arrayTypeDist[i].name](x, y);
              break;
            }
          }
        }
      }
    };
    this.cellTypes = {};
    this.registerCellType = function(name, cellOptions, init) {
      this.cellTypes[name] = function(x, y) {
        Cell.call(this, x, y);
        if (init) {
          init.call(this, x, y);
        }
        if (cellOptions) {
          for (var key in cellOptions) {
            if (typeof cellOptions[key] !== "function") {
              // properties get instance
              if (typeof cellOptions[key] === "object") {
                // objects must be cloned
                this[key] = JSON.parse(JSON.stringify(cellOptions[key]));
              } else {
                // primitive
                this[key] = cellOptions[key];
              }
            }
          }
        }
      };
      this.cellTypes[name].prototype = Object.create(Cell.prototype);
      this.cellTypes[name].prototype.constructor = this.cellTypes[name];
      this.cellTypes[name].prototype.cellType = name;
      if (cellOptions) {
        for (var key in cellOptions) {
          if (typeof cellOptions[key] === "function") {
            // functions get prototype
            this.cellTypes[name].prototype[key] = cellOptions[key];
          }
        }
      }
    };
    // apply options
    if (options) {
      for (var key in options) {
        this[key] = options[key];
      }
    }
  }
  initializeFromGrid(values, initGrid) {
    this.grid = Array.from(Array(this.height), () => new Array(this.width));
    for (let y = 0; y < this.height; ++y) {
      for (let x = 0; x < this.width; ++x) {
        for (let i = 0; i < values.length; ++i) {
          if (values[i].gridValue === initGrid[y][x]) {
            this.grid[y][x] = new this.cellTypes[values[i].name](x, y);
            break;
          }
        }
      }
    }
  }
  createGridFromValues(values, defaultValue) {
    const newGrid = Array.from(Array(this.height), () => new Array(this.width));
    for (let y = 0; y < this.height; ++y) {
      for (var x = 0; x < this.width; ++x) {
        newGrid[y][x] = defaultValue;
        const cell = this.grid[y][x];
        for (let i = 0; i < values.length; ++i) {
          if (
            cell.cellType == values[i].cellType &&
            cell[values[i].hasProperty]
          ) {
            newGrid[y][x] = values[i].value;
          }
        }
      }
    }
    return newGrid;
  }
}
