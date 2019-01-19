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
							<h1>react-click-n-hold</h1><br/><br/><br/>
							<span className="up">Long press event for react. Click and hold wrapper component.</span>
								<br/><br/>
				                <ClickNHold
				                    time={this.state.time}
 				                    onStart={(e)=>this.setState({events: [...this.state.events, {color:'rgba(194, 207, 178, 1)', event:'START'}]})}
				                    onClickNHold={(t, target)=>{this.setState({events: [...this.state.events, {color: 'rgba(250, 175, 190, 1)', event:('CLICK AND HOLD')}]})}}
				                    onEnd={(e, enough)=>this.setState({events: [...this.state.events, {color:'rgba(126, 137, 135, 1)', event:('END ' + (enough ?'enough time':'too soon'))}]})}>
				                    <button id="but" onClick={(evt) => console.log('click event received')}>Click and hold</button>
				                </ClickNHold>
				                <div>
				                    <br/><br/>
				                    <span id="timelabel">Time</span>
				                    <input type="number" id="timeinput" step={1} value={this.state.time} onChange={e=>{
				                    	let time = this.state.time;
				                    	if(e.target.value && !isNaN(e.target.value) && e.target.value > 0){
				                    		time = e.target.value
				                    	}
				                    	this.setState({time: time});
 				                    	var sheet =  document.getElementsByTagName("style")[0];
				                    	sheet.innerHTML = ".cnh_holding button { -webkit-animation: fill " + e.target.value + "s forwards infinite;  animation: fill " + e.target.value + "s forward infinite;}";
 				                    }}/>
				                    <span id="timeunits"> s</span>
				                    <br/><br/><br/>
				                    <span className="down"><a href="https://github.com/sonsoleslp/react-click-n-hold">See this project on Github </a></span>
				                    <span className="down" onClick={e=>this.setState({page:2})}>Example usage</span>


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
						<div className="col-xs-12 myCol">
							<h3>Usage Example</h3>
							<p className="pre" id="code">

							import <span className="g">React</span> from <span className="g">'react'</span>;<br/>
							import <span className="g">ClickNHold</span> from <span className="g">'react-click-n-hold'</span>; <br/>

							export default class <span className="g">Example</span> extends <span className="g">React.Component</span> &#123;<br/>
							&emsp;	start(e)&#123;<br/>
							<span className="jsx">
							&emsp;&emsp; console.log('START');	<br/>
							</span>
							&emsp;&#125;	<br/>
							&emsp;	end(e, enough)&#123;<br/>
							<span className="jsx">
							&emsp;&emsp; console.log('END');	<br/>
							&emsp;&emsp; console.log(enough ? 'Click released after enough time': 'Click released too soon');	<br/>
							</span>
							&emsp;&#125;	<br/>
							&emsp;	clickNHold(e)&#123;<br/>
							<span className="jsx">
							&emsp;&emsp; console.log('CLICK AND HOLD');	<br/>
							</span>
							&emsp;&#125;	<br/>
							&emsp;	render()&#123;<br/>
							&emsp;&emsp;		return ( <br/><span className="jsx">
							&emsp;&emsp;&emsp;			&lt;ClickNHold <br/>
							&emsp;&emsp;&emsp;&emsp;				time=&#123;<span className="g">2</span>&#125; <br/>
							&emsp;&emsp;&emsp;&emsp;				onStart=&#123;<span className="g">this.start</span>&#125; <br/>
							&emsp;&emsp;&emsp;&emsp;				onClickNHold=&#123;<span className="g">this.clickNHold</span>&#125; <br/>
							&emsp;&emsp;&emsp;&emsp;				onEnd=&#123;<span className="g">this.end</span>&#125; &gt;<br/>
							&emsp;&emsp;&emsp;&emsp;					&lt;button&gt;<span className="g">Click and hold</span>&lt;/button&gt; <br/>
							&emsp;&emsp;&emsp;			&lt;/ClickNHold&gt;<br/></span>
							&emsp;&emsp;			); <br/>
							&emsp;	&#125;<br/>
							&#125;<br/>
							</p>
 			             </div>
		             	<div className="col-xs-12 myCol">
		             		<h3>Animation Example</h3>
	 						<p className="pre" id="css_code"><br/>
								<span className="jsx">@-webkit-keyframes fill &#123; <br/></span>
								&emsp;  to &#123;<br/>
								&emsp;&emsp;    background-size: 100% 0; <br/>
								&emsp;  &#125;<br/>
								<span className="jsx">&#125; <br/></span>
								<br/>
								<span className="jsx">@keyframes fill &#123; <br/></span>
								&emsp;  to &#123; <br/>
								 &emsp;&emsp;   background-size: 100% 0;<br/>
								&emsp;  &#125;<br/>
								<span className="jsx">&#125;<br/></span>
								<br/>
								<span className="com">//The wrapper has the .cnh_holding class while the button is being pressed<br/></span>
								<span className="jsx">.cnh_holding button &#123;<br/></span>
								&emsp;  background: -webkit-linear-gradient( white , white) rgb(255,215,235) no-repeat 0 0;<br/>
								&emsp;  background: linear-gradient( white , white) rgb(255,215,235) no-repeat 0 0;<br/>
								&emsp;  mix-blend-mode: multiply;<br/>
								&emsp;  background-size: 100% 100%;<br/>
								&emsp;  -webkit-animation: fill 2s forwards;<br/>
								&emsp;  animation: fill 2s forwards;<br/>
								<span className="jsx">&#125;<br/></span>
								<br/>
							</p>
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
    




