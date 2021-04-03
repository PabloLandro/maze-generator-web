import React from 'react';
import './styles.css';
import * as MazeFunctions from './MazeFunctions';
import * as Algorithms from './Algorithms';

export default class Maze extends React.Component {
    state = {
        tiles: [],
        width: this.props.width,
        height: this.props.height
    }

    createTiles = () => {
        let tiles = [];
        for(let i = 0; i < 5; i++) {
            tiles.push({
                id:{i}
            });
        }
        this.setState({ tiles: tiles });
    }

    componentDidMount = () => {
        this.createTiles();
        this.createMaze();
    }

    getTileId = (row, col) => {
        return row*this.state.width + this.state.height;
    }

    createMaze = () => {
        let maze = MazeFunctions.createMaze(this.props.width, this.props.height);
        let animations;
        Algorithms.recursiveAlgorithm(maze, animations);
        console.log(maze);
    }

    render () {

        let rows = [];

        for (let i = 0; i < this.state.height; i++) {
            rows.push([]);
            for (let j = 0; j < this.state.width; j++) {
                rows[i].push(
                    <div 
                        className="tile"
                        id={this.getTileId(i, j)}
                    />    
                )
            }
        }

        return (
            <div>
                { rows.map(row => (
                    <div
                        className="tile-row"
                    >
                        {
                            row.map(tile => (
                                <div 
                                    className="tile"
                                />
                            ))
                        }
                    </div>
                ))}
            </div>
        );
    }
}