import React from "react"
import PropTypes from "prop-types"
class HelloWorld extends React.Component {
  render () {
    return (
      <div>
        <div>Greeting: {this.props.greeting}</div>
      </div>
    );
  }
}

HelloWorld.propTypes = {
  greeting: PropTypes.string
};
export default HelloWorld

class Post extends React.Component {
  render() {
    return <h1>{this.props.title}</h1>
  }
}
