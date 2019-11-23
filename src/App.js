import React from 'react';
import './App.css';
import QuizMain from './QuizMain';
import Chart from 'react-google-charts';
var correctValue;
var incorrectValue;

 
class App extends React.Component {
state={
  showChart:false
}
setChartValues=(correct,incorrect)=>{
  correctValue = correct;
  incorrectValue = incorrect;
  this.setState({showChart:true})
}

render(){
  return (
    <div className="App">
        <h2>Cricket Trivia</h2>
      <div className="container">
          <div>
              <QuizMain setChartValues={this.setChartValues} />   
          </div>
          <div className="text-center">
            {this.state.showChart && 
            <div style={{ display: 'flex', maxWidth: 900}}>
             
              <Chart
                width={300}
                height={300}
                chartType="ColumnChart"
                loader={<div>Loading Chart</div>}
                data={[
                  ['City', 'Corerct', 'Incorrect'],
                  ['Answers', parseInt(correctValue),parseInt(incorrectValue)],
                ]}
                options={{
                  title: 'Quiz Results',
                  chartArea: { width: '70%' },
                  hAxis: {
                    title: 'Answer',
                    minValue: 0,
                  },
                  vAxis: {
                    title: 'Number',
                  },
                }}
                legendToggle
              />
              </div>
              }
            <br/>
          </div>
      </div>
    </div>
  );
  }
}

export default App;
