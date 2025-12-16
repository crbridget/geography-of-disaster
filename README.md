# geography-of-disaster

# The Geography of Disaster

Interactive data visualization analyzing FEMA disaster funding patterns across the United States. This project explores the distribution of federal disaster relief funding, revealing geographic patterns, funding disparities, and trends in disaster response.

## Description

This project uses D3.js to create interactive visualizations that answer key questions about disaster funding:
- Which states receive the most FEMA funding?
- How does funding correlate with disaster frequency and severity?
- Are there geographic patterns in disaster declarations?
- What types of disasters receive the most federal support?
- How has funding changed over time?

Built as a data science exploration project to understand the economic impact of natural disasters and federal disaster response.

## Features

- **Interactive choropleth map** - Visualize FEMA funding by state
- **Time series analysis** - Track funding trends over multiple years
- **Disaster type breakdown** - Compare funding across hurricanes, floods, wildfires, etc.
- **Per capita analysis** - Normalize funding by state population
- **Responsive design** - Works on desktop and mobile devices
- **Tooltips and legends** - Detailed information on hover

## Tech Stack

- **D3.js** - Data visualization and interactive graphics
- **JavaScript** - Core functionality and data processing
- **HTML/CSS** - Structure and styling
- **FEMA API/Dataset** - Disaster declaration and funding data
- **TopoJSON** - Optimized geographic data

## Installation

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Local web server (optional, but recommended)
- Node.js (if using a development server)

### Setup

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/geography-of-disasters.git
cd geography-of-disasters
```

2. **No build step required** - This is a static website

3. **Run a local server** (recommended to avoid CORS issues):

Using Python:
```bash
python -m http.server 8000
```

Using Node.js:
```bash
npx http-server
```

Using VS Code Live Server:
- Install "Live Server" extension
- Right-click `index.html` → Open with Live Server

4. **Open in browser**
```
http://localhost:8000
```

## Project Structure

```
geography-of-disasters/
├── index.html           # Main HTML file
├── css/
│   └── styles.css       # Styling
├── js/
│   ├── main.js          # Main visualization logic
│   ├── map.js           # Map rendering
│   └── charts.js        # Chart components
├── data/
│   ├── fema_data.csv    # FEMA funding data
│   ├── us-states.json   # US state boundaries (TopoJSON)
│   └── README.md        # Data source documentation
├── assets/
│   └── images/          # Screenshots and icons
└── README.md
```

## Data Sources

**FEMA Disaster Declarations**
- Source: [OpenFEMA Dataset](https://www.fema.gov/about/openfema/data-sets)

**US Census Data**
- Population statistics for per capita calculations
- Source: US Census Bureau

**Geographic Boundaries**
- TopoJSON US state boundaries
- Source: [Mike Bostock's TopoJSON collection](https://github.com/topojson/us-atlas)

## Usage

### Interacting with the Visualization

**Map View:**
- Hover over states to see detailed funding information
- Click states to highlight and filter data
- Use the legend to understand the color scale

**Time Controls:**
- Adjust the time slider to view different years
- Play button for animated timeline
- Reset button to return to default view

**Filters:**
- Select disaster types from dropdown
- Toggle between total funding and per capita views
- Switch between different metrics (declarations, funding, deaths)

### Example Insights

The visualization reveals several key patterns:
- Coastal states receive disproportionate funding due to hurricanes
- Per capita funding shows different patterns than total funding
- Certain states have significantly more disaster declarations
- Funding allocation has evolved over time

## Development

### Adding New Features

To add a new visualization:

1. Create a new JavaScript file in `js/`
2. Define your D3.js visualization function
3. Import and call it in `main.js`
4. Add corresponding HTML container in `index.html`

Example:
```javascript
// js/timeline.js
function createTimeline(data) {
  const svg = d3.select("#timeline")
    .append("svg")
    .attr("width", 800)
    .attr("height", 400);
  
  // Your D3.js code here
}
```

### Updating Data

To update with new FEMA data:

1. Download latest data from OpenFEMA
2. Process/clean the data (see `data/README.md`)
3. Replace `data/fema_data.csv`
4. Update date references in `index.html`

### Customizing Styles

Edit `css/styles.css` to change:
- Color schemes
- Layout and spacing
- Responsive breakpoints
- Typography

## Performance Optimization

- TopoJSON used instead of GeoJSON (smaller file size)
- Data aggregated pre-processing when possible
- Lazy loading for large datasets
- Debounced interaction handlers

## Browser Compatibility

Tested and working on:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

**Note:** Internet Explorer is not supported due to ES6 features.

## Future Enhancements

- [ ] Add county-level granularity
- [ ] Include economic impact estimates
- [ ] Compare with climate change projections
- [ ] Add export functionality (PNG, SVG, PDF)
- [ ] Implement data comparison tool (state vs state)
- [ ] Create mobile-optimized version
- [ ] Add narrative scrollytelling feature

## Contributing

This is an academic project, but suggestions and improvements are welcome:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/improvement`)
3. Make your changes
4. Test thoroughly across browsers
5. Submit a pull request

Please include:
- Clear description of changes
- Screenshots of visual changes
- Any new data sources used

## Acknowledgments

- **FEMA OpenFEMA** for providing public disaster data
- **D3.js community** for excellent documentation and examples
- **Mike Bostock** for TopoJSON and D3.js
- **Northeastern University** Data Science program

## Authors

**Bridget Crampton**
- Data Science '28, Northeastern University
**Vanessa Veloso**
- Data Science '28, Northeastern University

## License

This project is for educational purposes. Data sources have their own licenses:
- FEMA data: Public domain
- Census data: Public domain
- TopoJSON boundaries: Open source


## Project Context

Created as part of DS42000 at Northeastern University. This project demonstrates:
- Data visualization skills with D3.js
- Geographic data analysis
- Interactive web development
- Statistical analysis and interpretation
- Public policy data exploration

## Resources

**Learning D3.js:**
- [D3.js Official Documentation](https://d3js.org/)
- [Observable HQ](https://observablehq.com/)
- [D3 Graph Gallery](https://d3-graph-gallery.com/)

**FEMA Data:**
- [OpenFEMA Data Sets](https://www.fema.gov/about/openfema/data-sets)
- [FEMA API Documentation](https://www.fema.gov/about/openfema/api-documentation)

**Geographic Data:**
- [Natural Earth Data](https://www.naturalearthdata.com/)
- [TopoJSON](https://github.com/topojson/topojson)

---

**View the live project:** [https://crbridget.github.io/geography-of-disaster/]
