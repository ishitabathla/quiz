import React from 'react';

class Question extends React.Component{
	constructor(props){
		super(props);
		this.state={
			question:props.data,
			
		}
	}
	
	handleChange=(event)=>{
		let questionValue = this.state.question;
		questionValue.optionSelected=event.target.value;
		this.setState({question:questionValue},()=>{
			this.props.sendAnswer(this.state.question);
		})
	}
	render(){
		const {question} = this.state;
		
		return(
			<div>
				<div className="question-value text-left">
					<h4 style={{
						color:question.correctlyAnswered === false ?
						"red"
						:""}}>Question {question.id}: {question.title}</h4>
				</div>
				<select className="form-control" value={this.state.optionSelected} onChange={this.handleChange}>
				<option value={null}>Choose</option>
					{question.options.map((option)=>{
						return <option key={option.id} 
						value={option.id}>{option.value}</option>
					})}
				</select>
				{question.validate === false &&
					<p className="text-left" style={{color:'red'}}>This Question is Mandatory
					</p>}			
				</div>
		);
	}
}

export default Question;