import React, {Component} from 'react';

export default class ClickNHold extends Component {
    constructor(props) {
        super(props);
        this.state = {
            holding: false,
            start: 0,
            ended: 'begin'
        }

        this.start = this.start.bind(this);
        this.end = this.end.bind(this);
        this.timeout = this.timeout.bind(this);
    }

    /*Start callback*/
    start(e){
        let ended = this.state.ended;
        this.setState({start: Date.now(), holding: true, ended: false});
        if (ended) {
            setTimeout(this.timeout, this.props.time*1000+1);
        }
        if (this.props.onStart) {
            this.props.onStart(e);
        }
    }

    /*End callback*/
    end(e) {
        let endTime = Date.now(); //End time
        let minDiff = this.props.time*1000; // In seconds
        let startTime = this.state.start; // Start time
        let diff = endTime - startTime; // Time difference
        let isEnough = diff >= minDiff; // It has been held for enough time

        // Two options: trigger click and hold event when enough time has passed (false, default), or trigger it on mouse up if enough time has passed  (true)
        if (this.props.forceEnd && isEnough ){ // If we need to trigger on mouseup, and enough time has passed
          if (this.props.onClickNHold){
            this.props.onClickNHold(e, ' when mouse up'); // Throw onClickNHold passed event if exists
          }
          this.setState({ended: true, holding: false, editing: true});
        } else {
          this.setState({holding: false, ended: true});
        }
        if (this.props.onEnd){
            this.props.onEnd(e);
        }
         // e.stopPropagation()
    }

    /*Timeout callback*/
    timeout(e){
        if (this.props.onTimeOut){
            this.props.onTimeOut(e);
        }
        if (!this.state.ended && !this.props.forceEnd){
            if(this.props.onClickNHold){
                this.props.onClickNHold(e, ' when timeout');
                this.setState({ holding: false, editing: true});
                return;
            }
        }
    }

    render() {
        let classList = ' ';
        classList += this.state.holding ? 'cnh_holding ':'';
        classList += this.state.ended ? 'cnh_ended ':'';
         return (
            <div style={this.props.style} 
                 className={this.props.className + classList}
                 onMouseDown={this.start}
                 onTouchStart={this.start}
                 onMouseUp={this.end}
                 onTouchCancel={this.end}
                 onTouchEnd={this.end}>
                    {this.props.children}
            </div>);
    }

}