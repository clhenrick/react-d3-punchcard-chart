import React, { Component } from 'react';
import * as d3 from 'd3';
import './App.css';
import DropDown from './DropDown';
import Chart from './Chart';

// do this if you want to play around with d3 in the console
// window.d3 = d3;

class App extends Component {
  constructor() {
    super();
    this.state = {
      allSites: undefined,
      curSite: 'Morris',
      data: undefined
    }
  }

  componentDidMount() {
    // use d3.csv to load data async
    d3.csv('../../data/barley.csv', (err, rsp) => {
      if (err) throw err;
      // console.log(rsp);

      const nested = d3.nest()
        .key(function(d) { return d.site; })
        .key(function(d) { return d.gen; })
        .entries(rsp);

      const map = d3.map(nested, function(d) { return d.key; });
      const allSites = map.keys().sort();

      this.setState({
        data: map,
        allSites
      });
    });
  }

  handleDropdownChange(siteName) {
    this.setState({ curSite: siteName });
  }

  render() {
    const { data, curSite, allSites } = this.state;

    return (
      <div className="App">
        {
          allSites &&
            <DropDown handleChange={this.handleDropdownChange.bind(this)}
              siteName={curSite}
              allSites={allSites} />
        }
        {
          data &&
            <Chart siteName={curSite} data={data} />
        }
      </div>
    );
  }
}

export default App;
