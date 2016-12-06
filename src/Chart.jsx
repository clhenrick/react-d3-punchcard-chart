import React, { Component, PropTypes } from 'react';
import * as d3 from 'd3';

class Chart extends Component {
	static propTypes = {
		margin: PropTypes.object
	}

	constructor(props) {
		super(props);
		this.state = {
			data: null
		}
	}

	componentWillReceiveProps(nextProps) {
		const { data } = nextProps;
		if (data) {
			d3.select('svg').datum(data);
		}
	}

	render() {
		return (
			<svg></svg>
		);
	}
}

export default Chart;
