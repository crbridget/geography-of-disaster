// Get all sections and nav links
const sections = document.querySelectorAll('.section');
const navLinks = document.querySelectorAll('.sidenav a');

// Function to update active link
function updateActiveLink() {
  let current = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    
    if (window.scrollY >= sectionTop - 100) {
      current = section.getAttribute('id');
    }
  });
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
}

window.addEventListener('scroll', updateActiveLink);
updateActiveLink();

//  MITIGATION OVER TIME VISUALIZATION 

// Global variable to store all data
let allData = [];

document.addEventListener('DOMContentLoaded', function() {
    loadMitigationData();  // Changed from createMitigationTimeline()
});

function loadMitigationData() {
    d3.csv("data/merged_df.csv").then(function(data) {
        // Convert strings to numbers
        data.forEach(d => {
            d.year = +d.year;
            d.obligatedTotalAmount = +d.obligatedTotalAmount / 1000000;
        });
        
        // Filter out rows with NaN values
        data = data.filter(d => !isNaN(d.year) && !isNaN(d.obligatedTotalAmount));
        
        // Store all data globally
        allData = data;
        
        console.log("Data loaded:", allData.length, "rows");
        
        // Get unique disaster types and populate dropdown
        const disasterTypes = [...new Set(data.map(d => d.incidentType))].sort();
        const select = d3.select("#disaster-type");
        
        disasterTypes.forEach(type => {
            if (type) {
                select.append("option")
                    .attr("value", type)
                    .text(type);
            }
        });
        
        // Initial render with all data
        createMitigationTimeline("all");
        
        // Add event listener for dropdown changes
        document.getElementById("disaster-type").addEventListener("change", function() {
            d3.select("#chart1").html("");
            createMitigationTimeline(this.value);
        });
    });
}

function createMitigationTimeline(filterType) {
    // Filter data based on selection
    let filteredData = allData;
    if (filterType !== "all") {
        filteredData = allData.filter(d => d.incidentType === filterType);
    }
    
    console.log(`Showing data for: ${filterType}, Rows: ${filteredData.length}`);
    
    // Group by year and sum amounts
    const yearlyData = d3.rollup(
        filteredData,
        v => d3.sum(v, d => d.obligatedTotalAmount),
        d => d.year
    );

    const aggregatedData = Array.from(yearlyData, ([year, amount]) => ({year, amount}));
    aggregatedData.sort((a, b) => a.year - b.year);

    const width = 900;
    const height = 500;
    const margin = {top: 40, right: 40, bottom: 60, left: 100};

    const svg = d3.select("#chart1")
        .append("svg")
        .attr("width", width)
        .attr("height", height);

    const xScale = d3.scaleLinear()
        .domain(d3.extent(aggregatedData, d => d.year))
        .range([margin.left, width - margin.right]);

    const yScale = d3.scaleLinear()
        .domain([0, d3.max(aggregatedData, d => d.amount)])
        .nice()
        .range([height - margin.bottom, margin.top]);

    const line = d3.line()
        .x(d => xScale(d.year))
        .y(d => yScale(d.amount))
        .curve(d3.curveMonotoneX);

    // X axis
    svg.append("g")
        .attr("transform", `translate(0,${height - margin.bottom})`)
        .call(d3.axisBottom(xScale).tickFormat(d3.format("d")))
        .style("font-size", "14px");

    // Y axis
    svg.append("g")
        .attr("transform", `translate(${margin.left},0)`)
        .call(d3.axisLeft(yScale).tickFormat(d => `$${d.toFixed(0)}M`))
        .style("font-size", "14px");

    // Y axis label
    svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", margin.left - 80)
        .attr("x", -(height / 2))
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .text("Mitigation Funding ($ Millions)");

    // X axis label
    svg.append("text")
        .attr("x", width / 2)
        .attr("y", height - 10)
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .text("Year");

    // Line
    svg.append("path")
        .datum(aggregatedData)
        .attr("fill", "none")
        .attr("stroke", "#097969")
        .attr("stroke-width", 3)
        .attr("d", line);

    // Dots
    svg.selectAll("circle")
        .data(aggregatedData)
        .join("circle")
        .attr("cx", d => xScale(d.year))
        .attr("cy", d => yScale(d.amount))
        .attr("r", 5)
        .attr("fill", "#097969")
        .attr("stroke", "white")
        .attr("stroke-width", 2);
}
