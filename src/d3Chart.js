import * as d3 from 'd3';

class d3Chart {
	constructor() {
		this.margin = { top: 20, right: 30, bottom: 30, left: 120 };
		this.height = 800 - this.margin.left - this.margin.right;
		this.width = 600 - this.margin.top - this.margin.bottom;

		this._root = undefined;
		this.svg = undefined;

		this.yScale = d3.scalePoint();
		this.xScale = d3.scaleLinear();
		this.radius = d3.scaleSqrt();
		this.color = d3.scaleOrdinal(d3.schemeCategory20b);

		this._site = "";
		this._data = undefined; // eg: { key: "site name", values: []}
	}

	set root(el) {
		if (!el) return;
		this._root = d3.select(el);
	}

	get root() {
		return this._root;
	}

	set site(siteName) {
		this._site = siteName;
	}

	set data(map) {
		this._data = map;
	}

	createDatum() {
		// returns an array of gen type objects for a given site
		return this._data.get(this._site).values;
	}

	createGenTypes() {
		// returns the sorted array of unique gen type names
		return this.createDatum().map(d => d.key).sort();
	}

	init() {
		const genTypes = this.createGenTypes();

		// set up yScale with domain of unique gen values
		this.yScale
			.range([0, this.height])
			.domain(genTypes)
			.round(true);

		// domain for our x scale is min - 1 & max years of the data set
		this.xScale
			.range([0, this.width])
			.domain([1926, 1936]);

		// domain of circle radius is from 0 to max d.yield
		this.radius
			.range([0, 15])
			.domain([0, 76]);

		// d3.v4 method of setting up axises: axisLeft, axisBottom, etc.
		this.yAxis = d3.axisLeft()
			.scale(this.yScale);

		this.xAxis = d3.axisBottom()
			.tickFormat(function(d) { return d; })
			.scale(this.xScale);

		// create an svg element to hold our chart parts
		this.svg = this._root.append('svg')
			.attr('width', this.width + this.margin.left + this.margin.right)
			.attr('height', this.height + this.margin.top + this.margin.bottom)
			.append('g')
				.attr('transform', 'translate(' + [this.margin.left, this.margin.top] + ')');

		// append svg groups for the axises, then call their corresponding axis function
		this.svg.append("g")
			.attr("class", "y axis")
			.call(this.yAxis);

		this.svg.append("g")
			.attr("class", "x axis")
			.attr("transform", "translate(0," + this.height + ")")
			.call(this.xAxis);
	}

	update() {
		const self = this;
		const datum = this.createDatum();
		const genTypes = this.createGenTypes();

		// our transition, will occur over 750 milliseconds
		const t = this.svg.transition().duration(750);

		// update our yScale & transition the yAxis, note the xAxis doesn't change
		this.yScale.domain(genTypes);
		this.yAxis.scale(this.yScale);
		t.select("g.y.axis").call(this.yAxis);

		// bind our new piece of data to our svg element
		this.svg.datum(datum);

		// tell d3 we want svg groups for each of our gen categories
		let gens = this.svg.selectAll("g.site")
			.data(function(d) { return d; });

		// get rid of the old ones we don't need when doing an update
		gens.exit().remove();

		// update existing ones left over
		gens.attr("class", "site")
			.transition(t)
			.attr("transform", function(d) {
				return "translate(0," + self.yScale(d.key) + ")";
			});

		// create new ones if our updated dataset has more then the previous
		gens.enter().append("g")
			.attr("class", "site")
			.transition(t)
			.attr("transform", function(d) {
				return "translate(0," + self.yScale(d.key) + ")";
			});

		// reselect the gen groups, so self we get any new ones self were made
		// our previous selection would not contain them
		gens = this.svg.selectAll("g.site");

		// tell d3 we want some circles!
		let circles = gens.selectAll("circle")
			.data(function(d) { return d.values; });

		// get rid of ones we don't need anymore, fade them out
		circles.exit()
			.transition(t)
			.style("fill", "rgba(255,255,255,0)")
			.remove();

		// update existing circles, transition size & fill
		circles
			.attr("cy", 0)
			.attr("cx", function(d) { return self.xScale(d.year); })
			.transition(t)
			.attr("r", function(d) { return self.radius(d.yield); })
			.attr("fill", function(d) { return self.color(d.gen); });

		// make new circles
		circles.enter().append("circle")
			.attr("cy", 0)
			.attr("cx", function(d) { return self.xScale(d.year); })
			.transition(t)
			.attr("r", function(d) { return self.radius(d.yield); })
			.attr("fill", function(d) { return self.color(d.gen); });
	}

}

export default d3Chart;
