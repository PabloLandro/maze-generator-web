import React from 'react';
import './styles.css';
import * as MazeFunctions from '../Functions/MazeFunctions';
import * as DisplayFunctions from '../Functions/DisplayFunctions';
import * as Algorithms from './Algorithms';


const ANIMATION_SPEED = 50;

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
        let animations = Algorithms.recursiveAlgorithm(this.state.width, this.state.height);
        let auxMaze = this.createMaze();
        console.log(animations);
        for (let i = 0; i < animations.length; i++) {
            setTimeout(() => {
                MazeFunctions.updateMaze(auxMaze, animations[i]);
                this.setState({ maze: auxMaze });
            }, i*ANIMATION_SPEED);
        }        
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