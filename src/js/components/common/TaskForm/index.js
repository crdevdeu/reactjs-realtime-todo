import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap-button-loader';
import { Form, FormControl, FormGroup, ControlLabel } from 'react-bootstrap';

import './styles.scss';

class TaskForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: props.title,
      description: props.description
    };
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleFormSave = this.handleFormSave.bind(this);
  }

  handleTitleChange(event) {
    this.setState({
      title: event.target.value
    });
  }

  handleDescriptionChange(event) {
    this.setState({
      description: event.target.value
    });
  }

  handleFormSave() {
    this.props.handleFormSave(this.state.title, this.state.description, this.props.id);
    this.setState({
      title: '',
      description: ''
    });
  }
  render() {
    return (
      <div className="form-container">
        <div className="form-title">{this.props.formTitle}</div>
        <Form className="task-form">
          <FormGroup
            controlId="taskForm"
          >
            { this.props.titleLabel ? <ControlLabel bsClass="form-label">{this.props.titleLabel}</ControlLabel> : null }
            <FormControl
              className="form-input"
              onChange={this.handleTitleChange}
              placeholder="Title"
              type="text"
              value={this.state.title}
            />
            { this.props.descriptionLabel ? <ControlLabel bsClass="form-label">{this.props.descriptionLabel}</ControlLabel> : null }
            <FormControl
              className="form-input"
              onChange={this.handleDescriptionChange}
              placeholder="Description"
              type="text"
              value={this.state.description}
            />
          </FormGroup>
          <Button
            bsStyle="success"
            disabled={!this.state.title || !this.state.description || this.props.loading}
            loading={this.props.loading}
            onClick={this.handleFormSave}
          >
            { this.props.loading ? 'Saving' : 'Save'}
          </Button>
        </Form>
      </div>
    );
  }
}

TaskForm.propTypes = {
  formTitle: PropTypes.string,
  titleLabel: PropTypes.string,
  descriptionLabel: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  id: PropTypes.string,
  handleFormSave: PropTypes.func,
  loading: PropTypes.bool
};

export default TaskForm;
