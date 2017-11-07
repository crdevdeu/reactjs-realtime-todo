import React, { Component } from 'react';
import { Pagination } from 'react-bootstrap';
import PropTypes from 'prop-types';

import './styles.scss';

class TaskListPagination extends Component {
  constructor(props) {
    super(props);
    this.handleSelect = this.handleSelect.bind(this);
  }

  handleSelect(selectedPage) {
    this.setState({
      activePage: selectedPage
    });
    this.props.changePage(selectedPage);
  }

  render() {
    return (
      <Pagination
        activePage={this.props.activePage}
        boundaryLinks
        className="tasks-list-pagination"
        ellipsis
        first
        items={this.props.totalItems}
        last
        maxButtons={1}
        next
        onSelect={this.handleSelect}
        prev
      />
    );
  }
}

TaskListPagination.propTypes = {
  changePage: PropTypes.func,
  totalItems: PropTypes.number,
  activePage: PropTypes.number
};

export default TaskListPagination;
