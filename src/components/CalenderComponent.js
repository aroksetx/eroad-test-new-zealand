import {Component} from 'react';
import { balanceDates, calendarDatesList, getDateArray } from '../helpers/DatesGenerator';
import { daysTitles, holidaysType } from '../constants';
import styled, {css} from 'styled-components';
import React from 'react';

export class CalenderComponent extends Component{
    static property = {
        year: new Date().getUTCFullYear()
    }

    state ={
        calendarDates: null,
        activeHoliday: null
    };


    componentWillMount() {
        const {year} = this.props;
        this.setState({calendarDates: this.generateCalendar(year)})
    }

    componentWillReceiveProps(nextProps, nextContext) {
        const {year} = this.props;
        if(nextProps.year !== year){
            this.setState({calendarDates: this.generateCalendar(nextProps.year)})
        }
    }

    generateCalendar = (year) => {
        const values = calendarDatesList(getDateArray(year));
        Array.from(values.keys())
            .forEach((m) => {
                const newDates = balanceDates(m, values.get(m));
                values.set(m, newDates)
            });
        return values;
    }


    markAsHoliday (month, searchDate) {
        const {calendarDates, activeHoliday} = this.state;
        const selectedMonthDates = calendarDates.get(month);
        const dateIndex = selectedMonthDates.findIndex(({date}) => date === searchDate);
        selectedMonthDates[dateIndex].isMarked = !selectedMonthDates[dateIndex].isMarked;
        selectedMonthDates[dateIndex].holidayColor = activeHoliday;
        calendarDates.set(month, selectedMonthDates);
        this.setState({calendarDates: calendarDates})
    }

    setAllDatesForWeekDay = (month, monthDatesList, index) => monthDatesList
        .filter(({dayIndex}) => dayIndex === index)
        .map(({date, isMarked, holidayColor}) => (
            <DateContainer hilightOf={date === 0}
                           key={month + date}
                           style={{backgroundColor: isMarked ? holidayColor : null}}
                           onClick={() => date !== 0 ? this.markAsHoliday(month, date) : null}>
                {date !== 0 ? date : '-'}
            </DateContainer>)
        );


    renderWeekDayWithDates = (month) => {
        const {calendarDates} = this.state;
        const monthDates = calendarDates.get(month);
        return daysTitles.map((day, index) => {
            return(
                <CalenderMonthDayWrapper key={index}>
                    <DayOfWeekContainer>{day}</DayOfWeekContainer>
                    <div>
                        {this.setAllDatesForWeekDay(month, monthDates, index)}
                    </div>
                </CalenderMonthDayWrapper>
            );
        })
    }

    renderCalenderForMonth = () => {
        const {calendarDates} = this.state;
        const keys = Array.from(calendarDates.keys());
        return keys.map((month, index) => {
            return(
                <CalenderMonthWrapper key={month + index}>
                    <CalenderMonthTitle>{month}</CalenderMonthTitle>
                    <CalenderMonthDatesWrapper>
                        {this.renderWeekDayWithDates(month)}
                    </CalenderMonthDatesWrapper>
                </CalenderMonthWrapper>
            );
        })
    }

    renderTypesOfHolidays = () => holidaysType.map(({title, color}, index) => {
        const {activeHoliday} = this.state;
        return(
            <HolidaysTypeListContainer style={{border: activeHoliday === color ? `1px solid ${color}` : 'none'}}
                                       key={index}
                                       onClick={() => this.setState({activeHoliday: activeHoliday === color ? null : color})}>
                <HolidaysTypeListTitle>{title}</HolidaysTypeListTitle>
                <HolidaysTypeListColor style={{backgroundColor: color}}/>
            </HolidaysTypeListContainer>
        );
    });

    render() {
        return (
            <Wrapper >
                <HolidaysTypesList>
                    {this.renderTypesOfHolidays()}
                </HolidaysTypesList>
                <CalenderWrapper>
                    {this.renderCalenderForMonth()}
                </CalenderWrapper>
            </Wrapper>
        );
    }
}

/**
 * STYLED COMPONENT BLOCK
 */
const Wrapper = styled.div`

`;

const HolidaysTypesList = styled.div`
    margin: auto;
    width: 90%;
    background-color: #fff;
    padding: 10px;
    position: relative;
    box-shadow: 0 0 13px 5px #aeaaaab5;
    display: flex;
    flex-wrap: wrap;
`;

const HolidaysTypeListContainer = styled.div`
   display: flex;
   padding: 5px;
   cursor: pointer;
   flex: 1 1;
`;

const HolidaysTypeListTitle = styled.div`
  padding-right: 5px;
`;

const HolidaysTypeListColor = styled.div`
    height: 20px;
    width: 20px;
`;

const CalenderWrapper = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    padding: 15px;
`


const CalenderMonthWrapper = styled.div`
    background: #1a82d2;
    box-shadow: 0 0 16px 0px #8b9195;
    flex: 1 0 30%;
    margin: 10px;
    flex-direction: column;
`;

const CalenderMonthTitle = styled.div`
    text-align: center;
    padding: 10px;
    color: #fff;
    font-weight: 700;
`;

const CalenderMonthDatesWrapper = styled.div`
   display: flex;
   flex-direction: row;
`;

const CalenderMonthDayWrapper = styled.div`
  flex: 1 1;
  padding: 5px;
  text-align: center;
  background-color: bisque;
`;

const DayOfWeekContainer = styled.div`
  text-decoration: underline;
  color: #084f7e;
`;

const DateContainer = styled.div`
  cursor: pointer;
  transition: .5s;
  
  &:hover {
  background-color: aqua;
  ${props => props.hilightOf && css`
    background: none !important;
  `}
    
  }
`;