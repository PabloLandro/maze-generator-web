import * as MazeFunctions from '../Functions/MazeFunctions';


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