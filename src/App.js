import React, { Component } from 'react';
import styled from 'styled-components'
import { CalenderComponent } from './components';

class App extends Component {

  state ={
    year: new Date().getUTCFullYear()
  };

  componentWillMount() {

  }

  setYear = (year) => {
    this.setState({year: year});
  }

  renderYearsList = () => {
    return(
        <YearInputContainer>
            <YearInput type={'number'}
                   defaultValue={new Date().getFullYear().toString()}
                   onBlur={(e)=> this.setYear(e.target.value)}/>
        </YearInputContainer>
    );
  }

  render() {
    const {year} = this.state;

    return (
     <Wrapper>
       {this.renderYearsList()}
        <CalenderComponent year={year}/>
     </Wrapper>
    );
  }
}

const Wrapper = styled.div`
  background-color: #ebe1e1;
    height: 100vh;
    padding: 10px;
`;

const YearInputContainer = styled.div`
  margin: auto;
  text-align: center;
`;

const YearInput = styled.input`
    margin: 20px;
    padding: 5px;
    font-size: 20px;
    text-align: center;
    box-shadow: 0 0 10px 2px #969696;
    border: none;
    border-radius: 5px;
    font-weight: bold;
`;

export default App;