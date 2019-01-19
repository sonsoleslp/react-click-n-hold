'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ClickNHold = function (_Component) {
    _inherits(ClickNHold, _Component);

    function ClickNHold(props) {
        _classCallCheck(this, ClickNHold);

        var _this = _possibleConstructorReturn(this, (ClickNHold.__proto__ || Object.getPrototypeOf(ClickNHold)).call(this, props));

        _this.state = {
            holding: false,
            start: 0,
            ended: 'begin',
            clickEvent: null
        };

        _this._timer = null;
        _this._unmounted = false;

        _this.start = _this.start.bind(_this);
        _this.end = _this.end.bind(_this);
        _this.timeout = _this.timeout.bind(_this);
        _this.clickCapture = _this.clickCapture.bind(_this);
        return _this;
    }

    _createClass(ClickNHold, [{
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            this._unmounted = true;
            clearTimeout(this._timer);
            this._timer = null;
        }

        /* componentDidUpdate(nextState) {
           if (this.state.holding !== nextState.holding) {
             if (this.state.holding === false && this.state.ended === false) {
               document.documentElement.addEventListener('mouseup', this.end);
             }
           }
         }*/

        /*Start callback*/

    }, {
        key: 'start',
        value: function start(e) {
            var ended = this.state.ended;
            var start = Date.now();
            var eCopy = Object.assign({}, e);
            eCopy.type = "ClickNHold";
            this.setState({ start: start, holding: true, ended: false, clickEvent: eCopy, isEnough: false });
            var rightNumber = this.props.time && this.props.time > 0;
            var time = rightNumber ? this.props.time : 2;
            if (!rightNumber) {
                console.warn("You have specified an unvalid time prop for ClickNHold. You need to specify a number > 0. Default time is 2.");
            }
            if (ended) {
                this._timer = setTimeout(function () {
                    this.timeout(start);
                }.bind(this), time * 1000 + 1);
            }
            if (this.props.onStart) {
                this.props.onStart(e);
            }
            document.documentElement.addEventListener('mouseup', this.end);
        }

        /*End callback*/

    }, {
        key: 'end',
        value: function end(e) {
            document.documentElement.removeEventListener('mouseup', this.end);
            if (this.state.ended || this._unmounted) {
                return false;
            }
            var endTime = Date.now(); //End time
            var minDiff = this.props.time * 1000; // In seconds
            var startTime = this.state.start; // Start time
            var diff = endTime - startTime; // Time difference
            var isEnough = diff >= minDiff; // It has been held for enough time

            this.setState({ holding: false, ended: true, clickEvent: null, isEnough: isEnough });
            if (this.props.onEnd) {
                this.props.onEnd(e, isEnough);
            }
        }
    }, {
        key: 'clickCapture',
        value: function clickCapture(e) {
            if (this.state.isEnough) e.stopPropagation();
        }

        /*Timeout callback*/

    }, {
        key: 'timeout',
        value: function timeout(start) {
            if (!this.state.ended && start === this.state.start) {
                if (this.props.onClickNHold) {
                    this.props.onClickNHold(start, this.state.clickEvent);
                    this.setState({ holding: false });
                    return;
                }
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var classList = this.props.className ? this.props.className + ' ' : ' ';
            classList += this.state.holding ? 'cnh_holding ' : '';
            classList += this.state.ended ? 'cnh_ended ' : '';
            return _react2.default.createElement(
                'div',
                { style: this.props.style,
                    className: classList,
                    onMouseDown: this.start,
                    onTouchStart: this.start,
                    onMouseUp: this.end,
                    onClickCapture: this.clickCapture,
                    onTouchCancel: this.end,
                    onTouchEnd: this.end },
                _typeof(this.props.children) === 'object' ? _react2.default.cloneElement(this.props.children, { ref: function ref(n) {
                        return _this2.node = n;
                    } }) : null
            );
        }
    }]);

    return ClickNHold;
}(_react.Component);

exports.default = ClickNHold;

