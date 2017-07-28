import React from 'react';
import ReactDOM from 'react-dom';  
import ClickNHold from '../src/ClickNHold.jsx';  

 
export default class App extends React.Component {
	constructor(props) {
        super(props);
        this.state = {
	        events:[]
        }

         
    }

	render(){
		return(<div className="container">
					<div className="row">
						<div className="col-md-6 col-xs-12 middle">
			                <ClickNHold
			                    time={2}
			                    onStart={(e)=>this.setState({events: [...this.state.events, {color:'rgba(194, 207, 178, 1)', event:'START'}]})}
			                    onTimeOut={(e)=>this.setState({events: [...this.state.events, {color:'rgba(141, 181, 128, 1)', event:'TIMEOUT'}]})}
			                    onClickNHold={(e, from)=>this.setState({events: [...this.state.events, {color:'rgba(250, 175, 190, 1)', event:('CLICK AND HOLD'+from)}]})}
			                    onEnd={(e)=>this.setState({events: [...this.state.events, {color:'rgba(126, 137, 135, 1)', event:'END'}]})}>
			                    <button>Click and hold</button>
			                 </ClickNHold>
		             	</div>
		             	<div className="col-md-6 col-xs-12">
							 <ul id="eventList">
							 	{this.state.events.map((ev, index)=>{
							 		return(<li key={index} style={{color: ev.color}}>{ev.event}</li>)
							 	})}							 	
							 </ul>
						</div>
	                 </div>
	            </div>);
	}

	componentDidUpdate(){
		let list = document.getElementById('eventList');
		list.scrollTop = list.scrollHeight;
	}

}

ReactDOM.render(<App/>, document.getElementById('container'));
    




