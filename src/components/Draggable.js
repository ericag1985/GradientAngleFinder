/**
 *	* https://github.com/tongyy/react-native-draggable
 *  * Making my own updates to the pan responder functions to get the functionality that I need.
 */

import React, {Component} from 'react';
import {
	View,
	Text,
	PanResponder,
	Animated,
	TouchableOpacity
} from 'react-native';
import PropTypes from 'prop-types';

export default class Draggable extends Component {

	constructor(props, defaultProps) {
		super(props, defaultProps);
		const {pressDragRelease, onMove} = props;
		this.state = {
			pan: new Animated.ValueXY({x, y} = this.props),
			_value: {
				x: 0,
				y: 0
			}
		};

		this.panResponder = PanResponder.create({
			onMoveShouldSetPanResponder: (evt, gestureState) => true,
			onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
			onPanResponderGrant: (e, gestureState) => {
				this.state.pan.setOffset({x, y} = this.props);
			},

			onPanResponderMove: Animated.event([
				null, {
					dx: this.state.pan.x,
					dy: this.state.pan.y
				}
			], {listener: onMove}),
			onPanResponderRelease: (e, gestureState) => {
				if (pressDragRelease)
					pressDragRelease(this.state.pan, this.state._value);
				this.state.pan.flattenOffset();
			}
		});
	}
	componentWillReceiveProps(nP) {
		Animated.spring(this.state.pan, {
			toValue: {
				x,
				y
			} = nP
		}).start();
	}
	componentWillMount() {
		this.state.pan.addListener((c) => this.state._value = c);
	}

	componentWillUnmount() {
		this.state.pan.removeAllListeners();
	}

	_dragItemCss = () => {
		const {renderShape, renderSize, renderColor} = this.props;
		if (renderShape == 'circle') {
			return {
				backgroundColor: renderColor,
				width: renderSize * 2,
				height: renderSize * 2,
				marginLeft: -renderSize,
				marginTop: -renderSize,
				borderRadius: renderSize
			};
		} else if (renderShape == 'square') {
			return {
				backgroundColor: renderColor,
				width: renderSize * 2,
				height: renderSize * 2,
				borderRadius: 0
			};
		}
	}

	_dragItemTextCss = () => {
		const {renderSize} = this.props;
		return {
			marginTop: renderSize - 10,
			marginLeft: 5,
			marginRight: 5,
			textAlign: 'center',
			color: '#fff'
		};
	}


	render() {
		return (<View style={{zIndex: 1000, position: 'absolute'}}>
			<Animated.View {...this.panResponder.panHandlers} style={this.state.pan.getLayout()}>
				<TouchableOpacity style={this._dragItemCss()}>
					<Text style={this._dragItemTextCss(this.props.renderSize)}>{this.props.renderText}</Text>
				</TouchableOpacity>
			</Animated.View>
		</View>);
	}
	static propTypes = {
		renderText: PropTypes.string,
		renderShape: PropTypes.string,
		renderSize: PropTypes.number,
		renderColor: PropTypes.string,
		pressDrag: PropTypes.func,
		onMove: PropTypes.func,
		pressDragRelease: PropTypes.func,
		longPressDrag: PropTypes.func,
		pressInDrag: PropTypes.func,
		pressOutDrag: PropTypes.func,
		z: PropTypes.number,
		x: PropTypes.number,
		y: PropTypes.number

	};

	static defaultProps = {
		renderShape: 'circle',
		renderColor: 'yellowgreen',
		renderText: '＋',
		renderSize: 36
	}
}
