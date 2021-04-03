import * as MazeFunctions from './MazeFunctions';

var maxIter = 0;

export function recursiveAlgorithm (
    maze,
    animations,
) {
    const tile = maze.tiles[0];
    tile.walls[3] = false;
    tile.walls[1] = false;
    recursiveAlgorithmIteration(maze, animations, tile);
}


function recursiveAlgorithmIteration (
    maze,
    animations,
    tile
) {
    console.log("visiting:", tile.row, ",", tile.col);
    tile.visited = true;
    while(MazeFunctions.getUnvisitedNeighbours(maze, tile).length > 0 && maxIter < 20) {
        let randomTile = MazeFunctions.getRandomUnvisitedNeighbour(maze, tile);
        MazeFunctions.breakWalls(tile, randomTile);
        console.log("breaking:", tile, ",", randomTile);
        maxIter++;
        recursiveAlgorithmIteration(maze, animations, randomTile);
    }
}