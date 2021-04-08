import React from 'react';
import * as MazeFunctions from './MazeFunctions';

export function getDisplayMaze (
    maze
) {
    let displayRows = [];
    for (let row=0; row < maze.rows; row++) {
        displayRows.push(topDisplayRow(maze, row));
        displayRows.push(midDisplayRow(maze, row));
    }
    displayRows.push(botDisplayRow(maze, maze.rows-1));
    return (
        <div>
            {
                displayRows.map(displayRow => (
                    <div className="display-row" key={"" + displayRow.row}>
                        {
                            displayRow.displayTiles.map(displayTile => (
                                <div
                                    className="display-tile"
                                    key={"" + displayRow.row + ", " + displayTile.col}
                                    style={{
                                        backgroundColor: displayTile.color
                                    }}
                                />
                            ))
                        }
                    </div>
                ))
            }
        </div>
    );
}

function topDisplayRow (
    maze,
    row
) {
    let displayRow = {
        displayTiles: [],
        row: row*3
    };

    /*
        We check the different scenearios in which the tile is black, these are:
            -The column is an odd number (there cannot be a path in a tile with an odd column and row, so it'll be black)
            -There is a wall in the up direction from this row's tile
            -There is a wall in the down direction from the row above and that row exists (the row number is greater or equal to zero)
        If none of this conditions is true, then the tile is a path, then the color is white
    */
    for(let col = 0; col < (maze.cols)*2 + 1; col++) {
        let color = "black";
        if (col % 2 === 0) {
            color = "black";
        } else if (MazeFunctions.getTile(maze, (col-1)/2, row).walls[0] === false) {
            color = "white";
        } else if (row > 0) {
            if (MazeFunctions.getTile(maze, (col-1)/2, row-1).walls[2] === false) {
                color = "white";
            }
        }
        displayRow.displayTiles.push({
            color: color,
            col: col
        });
    }

    return displayRow;
}

function midDisplayRow (
    maze,
    row
) {
    let displayRow = {
        displayTiles: [],
        row: row*3 + 1
    };

    for(let col = 0; col < maze.cols*2 + 1; col++) {
        let color = "black";
        if (col % 2 === 1) {
            if (MazeFunctions.getTile(maze, (col-1)/2, row).visited === true) {
                color = MazeFunctions.getTile(maze, (col-1)/2, row).current ? "blue": "white";
            }
        } else {
            if (col < maze.cols*2) {
                if (MazeFunctions.getTile(maze, col/2, row).walls[3] === false) {
                    color = "white";
                }
            }
            if(col > 0) {
                if (MazeFunctions.getTile(maze, (col-2)/2, row).walls[1] === false) {
                    color = "white";
                }
            }
        }
        displayRow.displayTiles.push({
            color: color,
            col: col
        });
    }

    return displayRow;
}

function botDisplayRow (
    maze,
    row
) {
    let displayRow = {
        displayTiles: [],
        row: row*3 + 2
    };

    for(let col = 0; col < (maze.cols)*2 + 1; col++) {
        let color = "black";
        if (col % 2 === 0) {
            color = "black";
        } else if (MazeFunctions.getTile(maze, (col-1)/2, row).walls[2] === false) {
            color = "white";
        } else if (row < maze.rows-1) {
            if (MazeFunctions.getTile(maze, (col-1)/2, row+1).walls[0] === false) {
                color = "white";
            }
        }
        displayRow.displayTiles.push({
            color: color,
            col: col
        });
    }

    return displayRow;
}