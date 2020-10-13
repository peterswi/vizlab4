
const width = 600;
const height = 600;

d3.csv('wealth-health-2014.csv', d3.autoType).then(data=>{


    const svg = d3.select('.chart').append('svg')
        .attr('width', width)
        .attr('height', height)
    
    const life=[]
    const income=[]
    var i;
    for (i=0; i < data.length; i++){
        life[i]=data[i].LifeExpectancy
        income[i]=data[i].Income        
    }

    
    const xScale=d3.scaleLinear()
        .domain([Math.min(... income),Math.max(...income)])
        .range([50,550])
    
    const yScale=d3.scaleLinear()
        .domain([Math.min(...life), Math.max(...life)])
        .range([50,550])
    
})
