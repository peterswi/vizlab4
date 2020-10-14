
const margin = ({top: 20, right: 20, bottom: 20, left: 20})
const width = 1000- margin.left - margin.right;
const height = 1000- margin.top - margin.bottom;

d3.csv('wealth-health-2014.csv', d3.autoType).then(data=>{


    const svg = d3.select('.chart').append('svg')
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
	    .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    
    const incomeEx=d3.extent(data, d=>d.Income)
    
    incomeEx[0]=incomeEx[0]-3000
    incomeEx[1]=incomeEx[1]+10000

    
    const xScale=d3.scaleLinear()
        .domain(incomeEx)
        .range([0,width])
    
    const xAxis = d3.axisBottom()
        .scale(xScale)
        .ticks(5, "s")

    const lifeExpEx=d3.extent(data, d=>d.LifeExpectancy)
    lifeExpEx[0]=lifeExpEx[0]-2
    lifeExpEx[1]=lifeExpEx[1]+2

    
    const yScale=d3.scaleLinear()
        .domain(lifeExpEx)
        .range([height,0])
    
    const yAxis = d3.axisLeft()
        .scale(yScale)
        .ticks(10)

    const popScale =d3.scaleLinear()
        .domain(d3.extent(data, d=>d.Population))
        .range([8,30])

    const popOp =d3.scaleLinear()
        .domain(d3.extent(data, d=>d.Population))
        .range([0.5,0.3])

    const fillColor=d3.scaleOrdinal(d3.schemeTableau10)

    svg.selectAll('.chart')
        .data(data)
        .enter()
        .append('circle')
        .attr('cx',d=>xScale(d.Income))
        .attr('cy',d=>yScale(d.LifeExpectancy))
        .attr('r',d=>popScale(d.Population))
        .attr('align','center')
        .style('fill', d=>fillColor(d.Region))
        .style('opacity', d=>popOp(d.Population))

    console.log(d=>fillColor(d.Region))

        // Draw the axis
    svg.append("g")
        .attr("class", "axis x-axis")
        .attr("transform", `translate(0, ${height})`)
        .call(xAxis);

    svg.append("g")
        .attr("class", "axis y-axis")
        //.attr("transform", `translate(0, ${height})`)
        .call(yAxis);

    svg.append('text')
        .attr('class', 'xaxisTitle')
        .attr('x', xScale(incomeEx[1]-10000)+30)
        .attr('y', yScale(lifeExpEx[0]+2)+40)
        .text("Income")
        .style('text-anchor','middle')
    svg.append('text')
        .attr('class','yaxisTitle')
        .attr("transform", "rotate(-90)")
        .attr('x', xScale(incomeEx[0]+5000)-120)
        .attr('y', yScale(lifeExpEx[1]-2)-20)
        .text("Life Expectancy")
        .style('text-anchor','middle')
    svg.append('text')
        .attr('class','graphTitle')
        .attr('x',(xScale(incomeEx[0])+xScale(incomeEx[1])/2))
        .attr('y',yScale(lifeExpEx[1]-2)-30)
        .text("Health and Wealth of Nations")
        .style('text-anchor','middle')
        .style('font-weight','bolder')

    
    
    const svgLegend = d3.select('.chart').append('svg')
        .attr("width", 100)
        .attr("height", 100)
	    .append("g")

    svgLegend.selectAll('.chart')
        .data(fillColor(data.Region))
})
