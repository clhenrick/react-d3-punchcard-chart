import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import D3Chart from './d3Chart';

window.D3Chart = D3Chart;

class Chart extends Component {
	static propTypes = {
		margin: PropTypes.object
	}

	constructor(props) {
		super(props);
		this.state = {
			data: props.data,
			siteName: props.siteName
		};
		this.chart = new D3Chart("punchcard");
		window.chart = this.chart;
	}

	componentWillMount() {

	}

	componentDidMount() {
		const { siteName, data } = this.state;
		this.chart.root = ReactDOM.findDOMNode(this);
		this.chart.site = siteName;
		this.chart.data = data;
		this.chart.init();
		this.chart.update();
	}

	shouldComponentUpdate() {
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
