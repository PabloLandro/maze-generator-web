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
    let unvisitedTiles = [...maze.tiles];
    MazeFunctions.setInitialTiles(maze);
    console.log(unvisitedTiles.length);
    while(unvisitedTiles.length > 0) {
        let randomTile = unvisitedTiles[MazeFunctions.randomIntFromInterval(0, unvisitedTiles.length-1)];
        kruskalVisit(maze, randomTile, unvisitedTiles);
        let unvisitedNeighbour = randomUnconnectedNeighbour(maze, randomTile);
        MazeFunctions.breakWalls(randomTile, unvisitedNeighbour);
        joinTileSets(randomTile, unvisitedNeighbour);
        animations.push(randomTile);
        animations.push(unvisitedNeighbour);
    }
    return animations;
}

function randomUnconnectedNeighbour (
    maze,
    tile
) {
    let unconnectedNeighbours = [];
    let adyacentTiles = MazeFunctions.getAdyacentTiles(maze, tile);
    unconnectedNeighbours = adyacentTiles.filter(adyacentTile => {
        if (tile.set === undefined) {
            return true;
        } else if (adyacentTile.set === undefined) {
            return true;
        } else {
            return tile.set.includes(adyacentTile);
        }
        
    });
    return unconnectedNeighbours[MazeFunctions.randomIntFromInterval(0, unconnectedNeighbours.length-1)];
}

function kruskalVisit (
    maze,
    tile,
    unvisitedTiles
) {
    tile.visited = true;
    //We also eliminate the tile from the unvisited tiles array
    unvisitedTiles.splice(unvisitedTiles.indexOf(tile), 1);
}

//Adds tile2 to tile1's set and viceversa
function joinTileSets (
    tile1,
    tile2
) {
    addToSet(tile1, tile2);
    addToSet(tile2, tile1);
}

function addToSet (
    tile1,
    tile2
) {
    if (tile1.set === undefined) {
        tile1.set = [tile1, tile2];
    } else {
        tile1.set.push(tile2);
    }
}