import React, { Component } from 'react';
import './Hangman.css';
import {Randomword} from './words'
import step0 from './images/0.jpg';
import step1 from './images/1.jpg';
import step2 from './images/2.jpg';
import step3 from './images/3.jpg';
import step4 from './images/4.jpg';
import step5 from './images/5.jpg';
import step6 from './images/6.jpg';

class Hangman extends Component {

    static defaultProps = {
        maxWrongs : 6,
        images : [step0,step1,step2,step3,step4,step5,step6]
    }
    
    constructor(props){
        super(props);
        this.state = {
            mistakes : 0,
            guessed: new Set([]),
            answer: Randomword()
        }
    }

    guessWord = () => {
        const answer  = this.state.answer
        const answerarray = answer.split("");
        return answerarray.map(letter => this.state.guessed.has(letter)?letter:" _ ")
         
    }

    handleGuess = (e) => {

      let letter = e.target.value;
      this.setState(state => ({...state,guessed: state.guessed.add(letter),mistakes:(state.answer.includes(letter)? state.mistakes: state.mistakes + 1)}))

    }
       generateButtons = () => {

        return "abcdefghijklmnopqrstuvwxyz".split("").map(letter => <button disabled={this.state.guessed.has(letter)} onClick={this.handleGuess} key={letter} className='btn  btn-dark btn-m m-2' value={letter}>{letter}</button>)
    }

    resetState  = () => {

        this.setState(state => ({...state,guessed: new Set([]),mistakes:0,answer:Randomword()}))
    }


    render() { 

        
        const gameOver = this.state.mistakes >= this.props.maxWrongs;
        const result = this.guessWord().join("");
        const gameStat = this.generateButtons();
        return (<div className='Hangman container'>
            <h1 className='text-center'>Hangman</h1>
            <div className='float-right'>Wrong Guesses : {this.state.mistakes}/{this.props.maxWrongs}</div>
            <div className='tex-center'>
                <img src={this.props.images[this.state.mistakes]} alt='step0'/>
            </div>
            <div className='text-center'>
                <p><strong>Guess the Word !</strong></p>
             
            

                {result === this.state.answer?<div className='alert alert-success'>{`You Won,The Word was "${this.state.answer}"!`}</div> :null} 
                 
                <p>{!gameOver ? this.guessWord() : <div className='alert  alert-danger'>{`You Lost! The Word was "${this.state.answer}"`}</div>}</p>
           
            </div>
<p>{gameStat}</p>
<button className='btn btn-primary btn-lg' onClick={this.resetState}>Reset</button>
        </div>);
    }
}
 
export default Hangman;