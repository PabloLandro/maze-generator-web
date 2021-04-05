import * as MazeFunctions from '../Functions/MazeFunctions';


export function recursiveAlgorithm (
    maze,
    animations,
) {
    animations = [];
    const tile = maze.tiles[0];
    tile.walls[3] = false;
    recursiveAlgorithmIteration(maze, animations, tile);
}


function recursiveAlgorithmIteration (
    maze,
    animations,
    tile
) {
    tile.visited = true;
    while(MazeFunctions.getUnvisitedNeighbours(maze, tile).length > 0) {
        let randomTile = MazeFunctions.getRandomUnvisitedNeighbour(maze, tile);
        MazeFunctions.breakWalls(tile, randomTile);
        recursiveAlgorithmIteration(maze, animations, randomTile);
    }
}