import React, { Component } from 'react'

import firebase from 'firebase';

var uuid = require('uuid');


var config = {
    apiKey: "AIzaSyBZppH_jr5SFu3vKVuv0C2c9oB5I464yXE",
    authDomain: "survey-app-react.firebaseapp.com",
    databaseURL: "https://survey-app-react.firebaseio.com",
    projectId: "survey-app-react",
    storageBucket: "survey-app-react.appspot.com",
    messagingSenderId: "931131549451"
  };
  firebase.initializeApp(config);


class Survey extends Component{

    constructor(props){
        super(props);
        this.state={
            uid: uuid.v1(),
            studentName: '',
            answers: {
                answer01: '',
                answer02: '',
                answer03: '',
                answer04: ''
            },
            isSubmitted: false
        };

        this.nameSubmit = this.nameSubmit.bind(this);
        this.answerSelected =this.answerSelected.bind(this);
        this.questionsSubmit = this.questionsSubmit.bind(this);
    }

    nameSubmit(event){
        var studentName = this.refs.name.value;
        this.setState({
            studentName: studentName, function(){console.log(this.state)}
        });
    }
    
    answerSelected(event){
        var answers = this.state.answers;
        if(event.target.name === 'answer01'){
             answers.answer01 = event.target.value;
        }else if(event.target.name === 'answer02'){
            answers.answer02 = event.target.value;
        }else if(event.target.name === 'answer03'){
            answers.answer03 = event.target.value;
        }else if(event.target.name === 'answer04'){
            answers.answer04 = event.target.value;
        }

        this.setState({answers: answers});
    }
    questionsSubmit(){
        firebase.database().ref('survey/' + this.state.uid).set({
            studentName : this.state.studentName,
            answers : this.state.answers
        });

        this.setState({isSubmitted: true, function(){console.log(this.state)}});
    }

    render(){
        var studentName;
        var questions;
        if(this.state.studentName === '' && this.state.isSubmitted === false){
            studentName = <div>
                <h2>Hey, first please let us know your name: </h2>
                <form id="loginForm" onSubmit={this.nameSubmit}>
                    <input type="text" placeholder="Enter your name" ref="name" />
                </form>
            </div>
        }else if(this.state.studentName !== '' && this.state.isSubmitted === false){
            studentName =<h2>Hey, {this.state.studentName} welcome to our survey! </h2>
            questions = <div>
                <h2>Here are some questions</h2>
                <form onSubmit={this.questionsSubmit}>
                    <div className="card">
                        <label>You are a ?</label> <br />
                        <input type="radio" name="answer01" value="Student" onChange={this.answerSelected} />  Student
                        <input type="radio" name="answer01" value="Worker" onChange={this.answerSelected} />  Worker
                        <input type="radio" name="answer01" value="Job-Seeker" onChange={this.answerSelected} />  Job seeker
                    </div>

                    <div className="card">
                        <label>Waht is your favourite feild in Technology ?</label> <br />
                        <input type="radio" name="answer02" value="Web-applications" onChange={this.answerSelected} />  Web applications
                        <input type="radio" name="answer02" value="Mobile-applications" onChange={this.answerSelected} />  Mobile applications
                        <input type="radio" name="answer02" value="Hacking" onChange={this.answerSelected} />  Hacking
                    </div>

                    <div className="card">
                        <label>Waht is your favourite social network ??</label> <br />
                        <input type="radio" name="answer03" value="Instagram" onChange={this.answerSelected} />  Instagram
                        <input type="radio" name="answer03" value="Facebook" onChange={this.answerSelected} />  Facebook
                        <input type="radio" name="answer03" value="Twitter" onChange={this.answerSelected} />  Twitter
                    </div>
                  
                    <div className="card">
                        <label>Your love with ?</label> <br />
                        <input type="radio" name="answer04" value="React-js" onChange={this.answerSelected} />  ReactJs
                        <input type="radio" name="answer04" value="Angular-js" onChange={this.answerSelected} />  AngularJs
                        <input type="radio" name="answer04" value="Vue-js" onChange={this.answerSelected} />  VueJs
                    </div>
                    <input className="feedback-button" type="submit" value="submit here" />

                </form>
                </div>
                           
        }else if(this.state.isSubmitted === true){
            studentName =<h2>Hey, {this.state.studentName} Thank You! keep in touch. </h2>
        }
        return(
            <div >
                {studentName}
                -----------------------------------------
                {questions}

            </div>
        );
    }
}

export default Survey;