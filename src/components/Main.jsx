import React from 'react';
import './styles.css';
import * as MazeFunctions from '../Functions/MazeFunctions';
import * as DisplayFunctions from '../Functions/DisplayFunctions';
import * as Algorithms from './Algorithms';

export default class Maze extends React.Component {
    state = {
        maze: null,
        width: this.props.width,
        height: this.props.height
    }

    componentWillMount = () => {
    }

    createMaze = () => {
        let maze = MazeFunctions.createMaze(this.props.width, this.props.height);
        this.setState({ maze: maze });
    }

    runRecusriveAlgorithm = () => {
        this.createMaze();
        let animations;
        let auxMaze = this.state.maze;
        Algorithms.recursiveAlgorithm(auxMaze, animations);
        console.log("THIS");
        this.setState({ maze: auxMaze });
        console.log(this.state.maze);
    }

    render () {
        return (
            <div>
                { this.state.maze === null
                    ? <button onClick={this.createMaze}>CreateMaze</button>
                    : DisplayFunctions.getDisplayMaze(this.state.maze)
                }
                <div>
                    <button onClick={this.runRecusriveAlgorithm}>RecursiveAlgorithm</button>
                </div>
            </div>
        );
    }
}