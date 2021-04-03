import * as MazeFunctions from './MazeFunctions';

export function recursiveAlgorithm (
    maze,
    animations,
) {
    const tile = maze.tiles[5];
    tile.walls[3] = false;
    tile.walls[1] = false;
    recursiveAlgorithmIteration(maze, animations, tile);
}

function recursiveAlgorithmIteration (
    maze,
    animations,
    tile
) {
    tile.visited = true;
    while(MazeFunctions.getUnvisitedNeighbours.length > 0) {
        const randomTile = MazeFunctions.getRandomUnvisitedNeighbour;
        MazeFunctions.breakWalls(tile, randomTile);
        recursiveAlgorithm(maze, animations, randomTile);
    }
}