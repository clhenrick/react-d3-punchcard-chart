import React, { PropTypes } from 'react';

const DropDown = (props) => {

	function createOptions(sites) {
		return sites.map(site => {
			return (
				<option key={site} value={site}>{site}</option>
			);
		});
	}

	const { siteName, allSites, handleChange } = props;

	return (
		<select className={'dropdown'}
			onChange={(e) => handleChange(e.target.value)}
			defaultValue={siteName}>
			{ allSites && createOptions(allSites) }
		</select>
	);
}

DropDown.propTypes = {
	siteName: PropTypes.string,
	allSites: PropTypes.arrayOf(PropTypes.string),
	handleChange: PropTypes.func.isRequired
};

export default DropDown;
