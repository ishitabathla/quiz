import React from 'react';
import data from '../src/data.json';
import Question from '../src/Question';

var newEntry = [];
class QuizMain extends React.Component{
	constructor(props){
		super();
		this.state={
			questionList:data,
			answeredList:[]
		}
	}
	validateQuiz=()=>{
		if(this.state.answeredList.length < 4){
			var validatedArr = this.state.questionList.map((answer)=>{
				
				if(answer.optionSelected == null){
					 answer.validate = false;
				} else{
					answer.validate = true;
				} 
				return answer;
			})
			this.setState({answeredList:validatedArr})
			
			return false;
		}else{
			return true;
		}
	}

	handleClear=()=>{
		window.location.reload();
	}

	handleSubmit=()=>{
		var finalArray = this.state.answeredList;
		var correct = 0;
		var incorrect = 0;
		if(this.validateQuiz()){
			finalArray = finalArray.map((answer)=>{
				var correctAnswer = answer.options.filter((option)=>{
					return  option.correct === true;
				})[0];
				if(correctAnswer.id === parseInt(answer.optionSelected)){
					answer.correctlyAnswered = true;
					correct ++;
				}else{
					answer.correctlyAnswered = false;
					incorrect++;
				}
				return answer;
			})
			this.setState({questionList:finalArray},()=>{
				this.props.setChartValues(correct,incorrect);
			});
		}
	}
	sendAnswer=(questionAnswered)=>{
		questionAnswered.validate = true;
		if(newEntry.length > 0){
			var foundIndex = newEntry.findIndex(answered => answered.id === questionAnswered.id);
			if(foundIndex !== -1){
				newEntry[foundIndex] = questionAnswered;
			}else{
			newEntry.push(questionAnswered);
			}
		}else{
			newEntry.push(questionAnswered);
		}
		this.setState({answeredList:newEntry});
	}
	render(){
		return(
			<div className="container">
				{this.state.questionList.map((question)=>{
					return <Question key={question.id} data={question} sendAnswer={this.sendAnswer}/>
				})}
				<div className="row">
					<div className="col-md-12">
						<div>
							<input onClick={this.handleSubmit} style={{margin:'10px'}} className="btn btn-primary btn-lg" type="button" value="Submit"/>
						
							<input onClick={this.handleClear} className="btn btn-default btn-lg" type="button" value="Clear"/>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default QuizMain;