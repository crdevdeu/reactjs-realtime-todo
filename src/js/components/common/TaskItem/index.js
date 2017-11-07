import React, { Component } from 'react';
import Proptypes from 'prop-types';

import { Button, Glyphicon } from 'react-bootstrap';

import './styles.scss';

class TaskItem extends Component {
  constructor(props) {
    super(props);
    this.handleOnEdit = this.handleOnEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleOnEdit() {
    this.props.onEdit(this.props.id);
  }

  handleDelete() {
    this.props.onDelete(this.props.id);
  }

  render() {
    return (
      <div className="task-item">
        <div className="task-info">
          <div className="task-title">{this.props.title}</div>
          <div className="task-description">{this.props.description}</div>
        </div>
        <div className="task-item-buttons">
          <Button
            bsStyle="primary"
            className="edit-button"
            onClick={this.handleOnEdit}
          >
            <Glyphicon glyph="pencil" />
          </Button>
          <Button
            bsStyle="danger"
            className="trash-button"
            onClick={this.handleDelete}
          >
            <Glyphicon glyph="trash" />
          </Button>
        </div>
      </div>
    );
  }
}

TaskItem.propTypes = {
  title: Proptypes.string.isRequired,
  description: Proptypes.string.isRequired,
  id: Proptypes.string.isRequired,
  onEdit: Proptypes.func,
  onDelete: Proptypes.func
};

export default TaskItem;
