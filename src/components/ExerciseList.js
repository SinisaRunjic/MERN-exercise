import React, { Component } from 'react';
import axios from 'axios';
import Exercise from './Exercise';

class ExerciseList extends Component {
    constructor(props) {
        super(props)

        this.state = {
            exercises: []
        }
    }

    componentDidMount() {
        axios.get('http://localhost:5000/exercises/')
            .then(res => {
                this.setState({
                    exercises: res.data,
                })
            })
            .catch(error => {
                console.log(error)
            })
    }

    deleteExercise = (id) => {
        console.log(id)
        axios.delete(`http://localhost:5000/exercises/${id}`)
            .then(res => console.log(res.data));
        this.setState({
            exercises: this.setState.exercises.filter(el => el._id !== id)
        })
    }
    exerciseList = () => (
        this.state.exercises.map(currentExercise => (
            <Exercise exercise={currentExercise} deleteExercise={this.deleteExercise} key={currentExercise._id} />
        ))
    )
    render() {
        return (
            <div>
                <h3>Logged Exercises</h3>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th>Username</th>
                            <th>Description</th>
                            <th>Duration</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.exerciseList()}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default ExerciseList;