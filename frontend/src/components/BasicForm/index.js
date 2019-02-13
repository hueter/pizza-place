import React, { Component } from 'react';
import './style.css';

class Form extends Component {
  constructor(props) {
    super(props);
    this.defaults = Form.getDefaults(props.fields);
    this.state = this.defaults;
  }

  static getDefaults = fields => {
    return fields.reduce((acc, field) => {
      acc[field.name] = '';
      return acc;
    }, {});
  };

  handleSubmit = e => {
    e.preventDefault();
    const completedForm = { ...this.state };
    this.props.onSubmit(completedForm);
    this.setState(Form.getDefaults(this.props.fields));
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="row">
          <div className="col-1">
            {this.props.fields
              .filter(field => field.show)
              .map((field, i) => {
                return (
                  <div className="row input-group" key={i}>
                    <div className="col-1">
                      <label htmlFor={field.name}>{field.label}</label>
                    </div>
                    <div className="col-4">
                      <input
                        name={field.name}
                        value={this.state[field.name]}
                        onChange={this.handleChange}
                        type={
                          ['email', 'password'].includes(field.name)
                            ? field.name
                            : 'text'
                        }
                        required
                      />
                    </div>
                  </div>
                );
              })}
          </div>
          <button type="submit" className="submit-button">
            Let's Go!
          </button>
        </div>
      </form>
    );
  }
}

export default Form;
