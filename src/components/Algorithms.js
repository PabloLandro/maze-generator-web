import * as MazeFunctions from '../Functions/MazeFunctions';


export function recursiveAlgorithm (
    maze,
    animations,
) {
    MazeFunctions.setInitialTiles(maze);
    const initialTile = MazeFunctions.getTile(maze, maze.start.col, maze.start.row);
    recursiveAlgorithmIteration(maze, animations, initialTile);
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