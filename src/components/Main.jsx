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

    componentDidMount = () => {
        if (this.state.maze === null) {
            this.createMaze();
        }
    }

    createMaze = () => {
        let maze = MazeFunctions.createMaze(this.state.width, this.state.height);
        this.setState({ maze: maze });
        return maze;
    }

    runRecusriveAlgorithm = () => {
        let auxMaze = this.createMaze();
        let animations = [];
        Algorithms.recursiveAlgorithm(auxMaze, animations);
        console.log(animations);
        this.setState({ maze: auxMaze });
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    render () {
        return (
            <div>
                { this.state.maze === null
                    ? null
                    : DisplayFunctions.getDisplayMaze(this.state.maze)
                }
                <div>
                    <input
                        name="width"
                        value={this.state.width}
                        onChange={this.handleChange}
                    />
                    <input
                        name="height"
                        value={this.state.height}
                        onChange={this.handleChange}
                    />
                </div>
                <div>
                    <button onClick={this.runRecusriveAlgorithm}>RecursiveAlgorithm</button>
               </div>
            </div>
        );
    }
}