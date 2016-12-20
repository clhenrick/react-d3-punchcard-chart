import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import D3Chart from './D3Chart';

class Chart extends Component {
	static propTypes = {
		siteName: PropTypes.string.isRequired,
		data: PropTypes.object
	}

	constructor() {
		super();
		this.chart = new D3Chart();
		// window.chart = this.chart; // for debugging purposes, if desired
	}

	componentDidMount() {
		const { siteName, data } = this.props;
		this.chart.root = ReactDOM.findDOMNode(this);
		this.chart.site = siteName;
		this.chart.data = data;
		this.chart.init();
		this.chart.update();
	}

	shouldComponentUpdate() {
		// let d3 control this part of the DOM
		return false;
	}

	componentWillReceiveProps(nextProps) {
		const { siteName } = nextProps;
		this.chart.site = siteName;
		this.chart.update();
	}

	render() {
		return (
			<div className="d3-root" ref='d3Root' />
		);
	}
}

export default Chart;
