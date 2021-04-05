import * as MazeFunctions from '../Functions/MazeFunctions';


export function recursiveAlgorithm (
    maze,
    animations,
) {
    setInitialTiles(maze);
    animations = [];
    const tile = maze.tiles[0];
    recursiveAlgorithmIteration(maze, animations, tile);
}

function setInitialTiles (
    maze
) {
    const side = MazeFunctions.randomIntFromInterval(0, 3);
    maze.start = getRandomTileFromBorder(maze, side);
    maze.end = getRandomTileFromBorder(maze, (side+2)%4);
    MazeFunctions.getTile(maze, maze.start.col, maze.start.row).walls[side] = false;
    MazeFunctions.getTile(maze, maze.end.col, maze.end.row).walls[(side+2)%4] = false;
}

function getRandomTileFromBorder (
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
            tile.col = MazeFunctions.randomIntFromInterval(0, maze.cols-1);
            return tile;
        case 1:
            tile.row = MazeFunctions.randomIntFromInterval(0, maze.rows-1);
            tile.col = maze.rows-1;
            return tile;
        case 2:
            tile.row = maze.rows-1;
            tile.col = MazeFunctions.randomIntFromInterval(0, maze.cols-1);
            return tile;
        case 3:
            tile.row = MazeFunctions.randomIntFromInterval(0, maze.rows-1);
            tile.col = 0;
            return tile;
        default:
            tile.row = 0;
            tile.col = 0;
            return tile;
    }
}

function recursiveAlgorithmIteration (
    maze,
    animations,
    tile
) {
    console.log("visiting:", tile.row, ",", tile.col);
    tile.visited = true;
    while(MazeFunctions.getUnvisitedNeighbours(maze, tile).length > 0) {
        let randomTile = MazeFunctions.getRandomUnvisitedNeighbour(maze, tile);
        MazeFunctions.breakWalls(tile, randomTile);
        console.log("breaking:", tile, ",", randomTile);
        recursiveAlgorithmIteration(maze, animations, randomTile);
    }
}