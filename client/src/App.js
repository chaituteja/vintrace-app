import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import SearchFilter from '../src/Components/SearchFilter';
import WineInfo from '../src/Components/WineInfo';
import CompositionInfo from '../src/Components/CompositionInfo';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      apiResponse: "",
      lists: [],
      filteredList:[],
      search: '',
      selectedWine: "",
      selectedWineInfo: [],
      selectedComposition: "",
      selectedCompositionBreakdown: [],
      breakDownLimit: 5,
      showButton: false
    };
}

callAPI() {
    fetch("http://localhost:9000/wines")
        .then(res => res.json())
        .then(data => {
          let wineList = data.map(item => {
            let description = item.description ? item.description : " ";
            return {id :item.lotCode, value: item.lotCode + '  ' + description }
          });
          this.setState({ apiResponse: data })
          this.setState({
            lists: wineList
          })
          this.setState({filteredList : this.state.lists})
        })
}

getWine = (event) => {
  this.setState({selectedWine: event.target.value})
  let wineInfo = this.state.apiResponse.find(wine => wine.lotCode === event.target.value);
  this.setState({selectedWineInfo : wineInfo})
  this.setState({selectedComposition: ""})
}

getCompositionBreakDown = (event) => {
  this.setState({selectedComposition: event.target.value})
  this.setState({breakDownLimit : 5 })
  let apiCall = event.target.value;
  let lotCode = this.state.selectedWine;
  let url = "http://localhost:9000/" + apiCall + "/" +lotCode

    fetch(url)
    .then(res => res.json())
    .then(data => {
      let breakDownType = data.breakDownType;
      let breakDownComponents = data.breakDown;
      this.setState({
        selectedCompositionType: breakDownType
      })
      this.setState({
        selectedCompositionBreakdown: breakDownComponents
      })
    })
    setTimeout(this.scrollIntoView, 100)
}

scrollIntoView () {
  let element = document.getElementById("composition-breakdown");
  if(element) {
    element.scrollIntoView({behavior: 'smooth', block: 'center'})
  }
}

onLoadMore = () => {
  this.setState({
    breakDownLimit: this.state.breakDownLimit + 5
  });
  if (this.state.selectedCompositionBreakdown.length < this.state.breakDownLimit) {
    this.setState({showButton : true})
  }
}

filterList = (event) => {
  this.setState({search: event.target.value});
  let filteredList = this.state.lists
  filteredList = filteredList.filter(item => {
    return item.value.toLowerCase().indexOf(event.target.value.toLowerCase()) >= 0
  })
  this.setState({filteredList})
}

componentDidMount() {
    this.callAPI()
}

  render() {
    return (
      <div className="App">
        <Container>
          <SearchFilter
            search={this.filterList}
            term={this.state.search}
            selectedWine={this.state.selectedWine}
            getWine={this.getWine}
            filteredList={this.state.filteredList} />

        {!this.state.selectedWine && <p>Please make your selection from above list</p>}
        {this.state.selectedWine && 
        <div>
          <WineInfo
            selectedWine={this.state.selectedWineInfo} />

          <CompositionInfo
            selectedComposition={this.state.selectedComposition}
            getCompositionBreakDown={this.getCompositionBreakDown}
            selectedCompositionBreakdown={this.state.selectedCompositionBreakdown}
            breakDownLimit={this.state.breakDownLimit}
            selectedCompositionType={this.state.selectedCompositionType}
            loadMore={this.onLoadMore}/>

        </div>
        }
      </Container>
      </div>
    );
  }
}

export default App;
