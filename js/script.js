
const width = 600;
const height = 600;

d3.csv('wealth-health-2014.csv', d3.autoType).then(data=>{


    const svg = d3.select('.chart').append('svg')
        .attr('width', width)
        .attr('height', height)
    
    //could try to re-work this
    const life=[]
    const income=[]
    var i;
    for (i=0; i < data.length; i++){
        life[i]=data[i].LifeExpectancy
        income[i]=data[i].Income        
    }
    console.log(data)
    
    const xScale=d3.scaleLinear()
        .domain(d3.extent(income))
        .range([50,550])
    
    const yScale=d3.scaleLinear()
        .domain(d3.extent(life))
        .range([50,550])
    
    svg.selectAll('.chart')
        .data(data)
        .enter()
        .append('circle')
        .attr('cx',data=>xScale(data.Income))
        .attr('cy',data=>yScale(data.LifeExpectancy))
        .attr('r',8)
        

})
