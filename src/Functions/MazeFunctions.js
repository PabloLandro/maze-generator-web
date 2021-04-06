
/* maze {
    cols,
    rows,
    tiles [],
} */

/* tile {
    col,
    row,
    visited
    wall[] (4booleans)
} */

export function getTile (
    maze,
    col,
    row,
) {
    return maze.tiles[maze.cols*row + col];
}

export function createMaze (
    cols,
    rows
) {
    let maze = {
        cols: cols,
        rows: rows,
        tiles: []
    }
    for(let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            maze.tiles.push ({
                row: i,
                col: j,
                visited: false,
                walls: [true, true, true, true]
            });
        }
    }
    return maze;
}

export function getUnvisitedNeighbours (
    maze,
    tile
) {
    const adyacentTiles = getAdyacentTiles(maze, tile);
    return adyacentTiles.filter(tile => !tile.visited);
}

export function getRandomUnvisitedNeighbour (
    maze,
    tile
) {
    const unvisitedNeighbours = getUnvisitedNeighbours(maze, tile)
    const bound = unvisitedNeighbours.length-1;
    return unvisitedNeighbours[randomIntFromInterval(0, bound)];
}

function getAdyacentTiles (
    maze,
    tile
) {
    let adyacentTiles = [];
    for (let i = 0; i < 4; i++) {
        let aux = getAdyacentTile(maze, tile, i);
        if (aux !== null) {
            adyacentTiles.push(aux);
        }
    }
    return adyacentTiles;
}

function getAdyacentTile (
    maze,
    tile,
    direction,
) {
    switch (direction) {
        case 0:
            return (tile.row === 0)
                ? null
                : getTile(maze, tile.col, tile.row-1);
        case 1:
            return (tile.col === maze.cols-1)
                ? null
                : getTile(maze, tile.col+1, tile.row);
        case 2:
            return (tile.row === maze.rows-1)
                ? null
                : getTile(maze, tile.col, tile.row+1);
        case 3:
            return (tile.col === 0)
                ? null
                : getTile(maze, tile.col-1, tile.row);
        default:
            return null;
    }
}

 export function randomIntFromInterval(min, max){
    return Math.floor(Math.random() * (max - min + 1) + min);
}

export function breakWalls (
    tile1,
    tile2
) {
    if (tile1.col < tile2.col) {
        tile1.walls[1] = false;
        tile2.walls[3] = false;
    } else if (tile1.col > tile2.col) {
        tile1.walls[3] = false;
        tile2.walls[1] = false;
    } else if (tile1.row < tile2.row) {
        tile1.walls[2] = false;
        tile2.walls[0] = false;
    } else if (tile1.row > tile2.row) {
        tile1.walls[0] = false;
        tile2.walls[2] = false;
    }
}

export function setInitialTiles (
    maze
) {
    const side = randomIntFromInterval(0, 3);
    maze.start = getRandomTileFromBorder(maze, side);
    maze.end = getRandomTileFromBorder(maze, (side+2)%4);
    getTile(maze, maze.start.col, maze.start.row).walls[side] = false;
    getTile(maze, maze.end.col, maze.end.row).walls[(side+2)%4] = false;
}

export function getRandomTileFromBorder (
    maze,
    border
) {
    let tile = {
        row: 0,
        col: 0
    }
    switch (border) {
        case 0:
            tile.row = 0;
            tile.col = randomIntFromInterval(0, maze.cols-1);
            return tile;
        case 1:
            tile.row = randomIntFromInterval(0, maze.rows-1);
            tile.col = maze.rows-1;
            return tile;
        case 2:
            tile.row = maze.rows-1;
            tile.col = randomIntFromInterval(0, maze.cols-1);
            return tile;
        case 3:
            tile.row = randomIntFromInterval(0, maze.rows-1);
            tile.col = 0;
            return tile;
        default:
            tile.row = 0;
            tile.col = 0;
            return tile;
    }
}

export function updateMaze (
    maze,
    tile
) {
    maze.tiles[tile.col+tile.row*maze.cols] = tile;
    return maze;
}