import React from 'react';
import ReactDOM from 'react-dom';  
import ClickNHold from '../src/ClickNHold.jsx';  

 
export default class App extends React.Component {
	constructor(props) {
        super(props);
        this.state = {
	        events:[],
 	        time:2,
 	        page: 1
        }
    }

	render() {
		return (<div className="container">
 						<span className={this.state.page == 2 ? 'dot dotselected left' : 'dot left'} onClick={e=>{this.setState({page:2})}}>2</span>
						<span className={this.state.page == 1 ? 'dot dotselected' : 'dot'} onClick={e=>this.setState({page:1})}>1</span>
					
					<div className="row" style={{display: this.state.page == 1 ? 'block' : 'none'}}>
						<div className="col-md-6 col-xs-12 middle">
							<div className="middleAligned">
				                <ClickNHold
				                    time={this.state.time}
 				                    onStart={(e)=>this.setState({events: [...this.state.events, {color:'rgba(194, 207, 178, 1)', event:'START'}]})}
				                    onClickNHold={(e)=>{this.setState({events: [...this.state.events, {color: 'rgba(250, 175, 190, 1)', event:('CLICK AND HOLD')}]})}}
				                    onEnd={(e)=>this.setState({events: [...this.state.events, {color:'rgba(126, 137, 135, 1)', event:'END'}]})}>
				                    <button id="but">Click and hold</button>
				                </ClickNHold>
				                <div>
				                    <br/>
				                    <span id="timelabel">Time</span>
				                    <input type="number" id="timeinput" step={1} value={this.state.time} onChange={e=>{
				                    	this.setState({time: e.target.value});
 				                    	var sheet =  document.getElementsByTagName("style")[0];
				                    	sheet.innerHTML = ".cnh_holding button { -webkit-animation: fill " + e.target.value + "s forwards infinite;  animation: fill " + e.target.value + "s forward infinite;}";
 				                    }}/>
				                    <span id="timeunits"> s</span>
 				                  </div>

		             		</div>
		             	</div>
		             	<div className="col-md-6 col-xs-12">
							 <ul id="eventList">
							 	{this.state.events.map((ev, index)=>{
 
							 		return(<li key={index} style={{color: ev.color}}>{ev.event}</li>);
							 	})}							 	
							 </ul>
						</div>

	                 </div>
					<div className="row" style={{display: this.state.page == 2 ? 'block' : 'none'}}>
						<div className="col-md-6 col-xs-12 middle">
							<div className="middleAligned alignLeft" >
								<code id="code">
									{"<ClickNHold\n"+
					                 "   time={"} <span className='b'>2</span> {"}\n"+
	 				                 "   onStart={"} <span className='b'>this.start</span> {"}\n"+
					                 "   onClickNHold={"} <span className='b'>this.clickNHold</span> {"}\n"+
					                 "   onEnd={"} <span className='b'>this.end</span> {"}>\n\n"}
					                 <span className='g'>{"   	<button>Click and hold</button>\n\n"}</span>
					                {"</ClickNHold>\n"}
								</code>
							</div>
			             </div>
		             	<div className="col-md-6 col-xs-12">
						
						</div>
	                 </div> 
 
	            </div>);
	}

	componentDidUpdate(){
		let list = document.getElementById('eventList');
		list.scrollTop = list.scrollHeight;
	}
 
	componentDidMount(){
    	var sheet = document.createElement('style');
		sheet.innerHTML = ".cnh_holding button { -webkit-animation: fill 3s forwards infinite;  animation: fill 3s forward infinite;}";
		document.body.appendChild(sheet);	
	}
 

}

ReactDOM.render(<App/>, document.getElementById('container'));
    




