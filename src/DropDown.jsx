import React, { Component, PropTypes } from 'react';

class DropDown extends Component {
	static propTypes = {
		siteName: PropTypes.string,
		allSites: PropTypes.arrayOf(PropTypes.string),
		handleChange: PropTypes.func.isRequired
	}

	createOptions(sites) {
		return sites.map(site => {
			return (
				<option key={site} value={site}>{site}</option>
			);
		});
	}

	render() {
		const { siteName, allSites, handleChange } = this.props;

		return (
			<select className={'dropdown'}
				onChange={(e) => handleChange(e.target.value)}
				defaultValue={siteName}>
				{ allSites && this.createOptions(allSites) }
			</select>
		);
	}
}

export default DropDown;
