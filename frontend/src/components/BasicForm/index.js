import React, { Component } from 'react';
import './style.css';

class Form extends Component {
  constructor(props) {
    super(props);
    this.defaults = Form.getDefaults(props.fields);
    this.state = this.defaults;
  }

  static getDefaults = fields => {
    return fields.reduce((acc, cur) => {
      acc[cur] = '';
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
            {this.props.fields.map((field, i) => (
              <div className="row input-group" key={i}>
                <div className="col-1">
                  <label htmlFor={field}>{field}</label>
                </div>
                <div className="col-4">
                  <input
                    name={field}
                    value={this.state[field]}
                    onChange={this.handleChange}
                    type={
                      field.toLowerCase() === 'password' ? 'password' : 'text'
                    }
                  />
                </div>
              </div>
            ))}
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
