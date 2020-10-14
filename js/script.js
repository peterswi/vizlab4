
const margin = ({top: 20, right: 20, bottom: 20, left: 20})
const width = 1000- margin.left - margin.right;
const height = 1000- margin.top - margin.bottom;

d3.csv('wealth-health-2014.csv', d3.autoType).then(data=>{


    const svg = d3.select('.chart').append('svg')
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
	    .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    
  
    console.log(data)
    
    const xScale=d3.scaleLinear()
        .domain(d3.extent(data, d=>d.Income))
        .range([0,width])
    
    const xAxis = d3.axisBottom()
	    .scale(xScale)
    
    const yScale=d3.scaleLinear()
        .domain(d3.extent(data, d=>d.LifeExpectancy))
        .range([height,0])
    
    const yAxis = d3.axisLeft()
        .scale(yScale)

    const popScale =d3.scaleLinear()
        .domain(d3.extent(data, d=>d.Population))
        .range([8,30])

    const popOp =d3.scaleLinear()
        .domain(d3.extent(data, d=>d.Population))
        .range([0.3,1])

    svg.selectAll('.chart')
        .data(data)
        .enter()
        .append('circle')
        .attr('cx',d=>xScale(d.Income))
        .attr('cy',d=>yScale(d.LifeExpectancy))
        .attr('r',d=>popScale(d.Population))
        .style('fill', 'purple')
        .style('opacity', d=>popOp(d.Population))
    

        // Draw the axis
    svg.append("g")
        .attr("class", "axis x-axis")
        .attr("transform", `translate(0, ${height})`)
        .call(xAxis);
    

})
