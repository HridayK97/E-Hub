/* eslint-disable react/destructuring-assignment */
import React from 'react';
import PropTypes from 'prop-types';

class MarketImage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loaded: false };
  }

  componentDidMount() {}

  componentWillUnmount() {
    // console.log('UNMOUNT')
    this.setState({ loaded: false });
  }

  componentDidUpdate(prevProps) {
    if (this.props.imageUrl !== prevProps.imageUrl) {
      this.setState({ loaded: false });
    }
  }

  defaultContent() {
    return (
      <img
        style={
          this.state.loaded
            ? {
                padding: 5,
                height: '100%',
                width: '100%',
                objectFit: 'contain'
              }
            : { display: 'none' }
        }
        src={this.props.imageUrl}
        onLoad={() => {
          this.setState({ loaded: true });
        }}
        alt="example"
      />
    );
  }

  mobileContent() {
    // return (
    // );
  }

  render() {
    return <React.Fragment>{this.defaultContent()}</React.Fragment>;
  }
}

MarketImage.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  classes: PropTypes.object.isRequired
};

export default MarketImage;
