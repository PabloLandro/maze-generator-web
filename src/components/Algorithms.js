import * as MazeFunctions from '../Functions/MazeFunctions';


/*----------------------------------RECURSIVE-----------------------------------------*/
export function recursiveAlgorithm (
    width,
    height
) {
    let animations = [];
    let maze = MazeFunctions.createMaze(width, height);
    MazeFunctions.setInitialTiles(maze);
    const initialTile = MazeFunctions.getTile(maze, maze.start.col, maze.start.row);
    recursiveAlgorithmIteration(maze, animations, initialTile);
    return animations;
}

function recursiveAlgorithmIteration (
    maze,
    animations,
    tile
) {
    tile.visited = true;
    while(MazeFunctions.getUnvisitedNeighbours(maze, tile).length > 0) {
        let randomTile = MazeFunctions.getRandomUnvisitedNeighbour(maze, tile);
        animations.push(tile);
        animations.push(randomTile);
        MazeFunctions.breakWalls(tile, randomTile);
        recursiveAlgorithmIteration(maze, animations, randomTile);
    }
}


/*----------------------------------KRUSKAL-------------------------------------------*/


export function kruskalAlgorithm (
    width,
    height
) {
    let animations = [];
    let maze = MazeFunctions.createMaze(width, height);
    MazeFunctions.setInitialTiles(maze);
    let wallArray = getWallArray(maze);
    while(wallArray.length > 0) {
        let idx = MazeFunctions.randomIntFromInterval(0, wallArray.length-1);
        let wall = wallArray[idx];
        wallArray.splice(idx, 1);
        let tile1 = MazeFunctions.getTile(maze, wall.col1, wall.row1);
        let tile2 = MazeFunctions.getTile(maze, wall.col2, wall.row2);
        if (!sameSet(tile1, tile2)) {
            joinTileSets(tile1, tile2);
            MazeFunctions.breakWalls(tile1, tile2);
            animations.push(tile1);
            animations.push(tile2);
        }
    }
    return animations;
}

function getWallArray (
    maze
) {
    let wallArray = [];
    for (let i = 0; i < maze.rows; i++) {
        for (let j = 0; j < maze.cols; j++) {
            if (j < maze.cols-1) {
                wallArray.push({
                    col1: j,
                    row1: i,
                    col2: j+1,
                    row2: i
                });
            }
            if (i < maze.rows-1) {
                wallArray.push({
                    col1: j,
                    row1: i,
                    col2: j,
                    row2: i+1
                });
            }
            let tile = MazeFunctions.getTile(maze, j, i);
            tile.set = [tile];
        }
    }
    return wallArray;
}

function sameSet (
    tile1,
    tile2
) {
    if (tile1.set === undefined || tile2.set === undefined) {
        return false;
    } else {
        return tile1.set.includes(tile2) || tile2.set.includes(tile1);
    }
}

//Adds tile2 to tile1's set and viceversa
function joinTileSets (
    tile1,
    tile2
) {
    tile1.set.forEach(tile => {
        tile2.set.forEach(aux => {
            if (!tile.set.includes(aux)) {
                tile.set.push(aux);
            }
        });
    });
    tile2.set.forEach(tile => {
        tile1.set.forEach(aux => {
            if (!tile.set.includes(aux)) {
                tile.set.push(aux);
            }
        });
    })
    tile1.visited = true;
    tile2.visited = true;
}