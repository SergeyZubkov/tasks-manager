import React, { Component } from 'react';
import './Column.css';
import Card from '../card/Card';
import {Panel, Button,} from 'react-bootstrap';
import _ from 'lodash';
import taskDataService from '../data/taskDataService';
import FontAwesome from 'react-fontawesome';
import FilterModal from './filterModal/FilterModal';

class Column extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen:true,
      showFilterModal: false,
      filterOpts: {}
    }

    this.identifyStatePanel = this.identifyStatePanel.bind(this);

  }

  componentDidMount() {
    this.identifyStatePanel();
  }

  identifyStatePanel() {
    if (window.matchMedia("(max-width: 1266px)").matches) {
      this.setState({isOpen: false});
    } else {
      this.setState({isOpen: true});
    }
  }

  handleClick = () => {
    this.setState((state) => {
      return {
        isOpen: !state.isOpen
      };
    });

  }

  handleClick = () => {
    this.setState((state) => {
      return {
        isOpen: !state.isOpen
      };
    });

  }

  deleteTask = (id) => {
    taskDataService
    .remove(id)
  }

  sortByDateNewFirst(list) {
    return _.sortBy(
      list,
      item => +new Date(item.date)
    ).reverse();
  }

  sortByPriority(list) {
    return _.sortBy(
      list,
      item => item.priority||list.length
    );
  }

  showFilterModal = (e) => {
    this.setState({showFilterModal: true});

    e.stopPropagation();
  }

  closeFilterModal = () => {
    this.setState({showFilterModal: false});
  }

  applyFilter = (filterOpts) => {
    this.setState({filterOpts});

    console.log(filterOpts)
  }

  renderFilter() {
    return <Button
              className={
                _.isEmpty(this.state.filterOpts)
                ? 'btn-filter'
                : "btn-filter btn-filter_filtered"
              }
              bsStyle="default"
              bsSize='small'
              onClick={this.showFilterModal}
            >
              <FontAwesome name='filter' />
            </Button>
  }

  render() {
    const cards = this.sortByPriority(
      this.sortByDateNewFirst(this.props.cards)
    );

    const {filterOpts} = this.state;

    const filteredCards = _.filter(
        cards,
        _.omit(filterOpts, 'fromDate')
      ).filter(c => {
          return new Date(c.date) >= (filterOpts.fromDate
          ? new Date(filterOpts.fromDate)
          : 0)
      }).map(card => {
        return <Card key={card._id} onDeleteTask={this.deleteTask} {...card}/>
      });

    return (
      <div className="column">
         <div
            className="column__header"
            onClick={this.handleClick}
          >
            <h3>
              {this.props.title}
            </h3>
            {this.props.filter&&this.renderFilter()}
            <span
                className='column__counter'
            >
              {filteredCards.length}
            </span>
          </div>
        <Panel
          className='column__panel'
          expanded={this.state.isOpen}
          collapsible
        >
          {filteredCards}
       </Panel>

       <FilterModal
         show={this.state.showFilterModal}
         onHide={this.closeFilterModal}
         onSelectFilterOpts={this.applyFilter}
       />
      </div>
    );
  }
}

export default Column;
