import React from 'react';
import './styles.css';
import * as MazeFunctions from '../Functions/MazeFunctions';
import * as DisplayFunctions from '../Functions/DisplayFunctions';
import * as Algorithms from './Algorithms';


export default class Maze extends React.Component {
    state = {
        maze: null,
        width: this.props.width,
        height: this.props.height,
        animation_speed: 0
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
            }, i*this.state.animation_speed);
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
                    ? <button onClick={this.createMaze}>Create Maze</button>
                    : DisplayFunctions.getDisplayMaze(this.state.maze)
                }
                <div>
                    <input
                        name="width"
                        placeholder="Width"
                        value={this.state.width}
                        onChange={this.handleChange}
                    />
                    <input
                        name="height"
                        placeholder="Height"
                        value={this.state.height}
                        onChange={this.handleChange}
                    />
                </div>
                <div>
                    <input
                        name="animation_speed"
                        placeholder="Animation Speed"
                        value={this.state.animation_speed}
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