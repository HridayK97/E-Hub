/* eslint-disable react/destructuring-assignment */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { bindActionCreators } from 'redux';
import Responsive from 'react-responsive';
import { Layout, Row, Col, Breadcrumb, Button } from 'antd';
import { setUserDetails, setSelectedTab } from '../../reducers/main';

const Mobile = props => <Responsive {...props} maxWidth={767} />;
const Default = props => <Responsive {...props} minWidth={768} />;

// import { Provider, Heading, Subhead } from 'rebass'
// import {
//   Hero, CallToAction, ScrollDownIndicator
// } from 'react-landing-page'
const { Content } = Layout;

class MarketView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // mainLoading: false,
    };
    this.goToMarket = this.goToMarket.bind(this);
    this.goToForums = this.goToForums.bind(this);
  }

  componentDidMount() {
    this.props.setSelectedTab([]);
  }

  goToMarket() {
    this.props.history.push('/main/market');
  }

  goToForums() {
    this.props.history.push('/main/forums');
  }

  defaultContent() {
    return (
      <React.Fragment>
        <Layout style={{ margin: '16px 0', padding: '24px 0', background: '#fff' }}>
          <Content style={{ padding: '0 24px', minHeight: '100vh' }}>
            <Row type="flex" justify="center" align="middle">
              <Col xs={24}>
                <Default>
                  <h1 style={{ fontSize: '50px', textAlign: 'center' }}>Welcome to E-Hub.</h1>
                  <h3 style={{ fontSize: 32, textAlign: 'center', marginTop: '-25px' }}>
                    <i>The one-stop-shop for all your electronic needs.</i>
                  </h3>
                </Default>
                <Mobile>
                  <h1 style={{ textAlign: 'center' }}>Welcome to E-Hub.</h1>
                  <h2 style={{ textAlign: 'center' }}>
                    <i>The one-stop-shop for all your electronic needs.</i>
                  </h2>
                </Mobile>
              </Col>
              <Col xs={24} md={12}>
                <p style={{ fontSize: '20px', textAlign: 'center' }}>
                  E-Hub is divided into two halves, each allowing you to explore the field of
                  electronics easily while getting the parts and guidance you need. <br />
                  <br />
                  Explore and have fun!
                </p>
              </Col>
            </Row>
            <Row type="flex" justify="center">
              <Mobile>
                <Col style={{ marginTop: 10 }} xs={24}>
                  <Button
                    block
                    onClick={this.goToMarket}
                    style={{ display: 'block', margin: 'auto', fontSize: 30, height: '70px' }}
                    type="primary"
                    icon="appstore"
                    size="large"
                  >
                    Market Place
                  </Button>
                </Col>
                <Col style={{ marginTop: 10 }} span={24}>
                  <p style={{ fontSize: '18px', textAlign: 'center' }}>
                    Searching for parts to build your project?
                    <br />
                    Or finding a way to sell off unwanted parts?
                    <br />
                    <br />
                    The E-Hub Marketplace allows you to,
                    <br />
                  </p>

                  <p style={{ fontSize: '18px', textAlign: 'left' }}>
                    1. <b>Buy</b> parts to carry out your project work,
                    <br />
                    2. <b>Sell</b> or <b>Rent</b> parts that you have but might not need.
                  </p>
                </Col>
                <Col style={{ marginTop: 10 }} xs={24}>
                  <Button
                    block
                    onClick={this.goToForums}
                    style={{ display: 'block', margin: 'auto', fontSize: 30, height: '70px' }}
                    type="primary"
                    icon="team"
                    size="large"
                  >
                    Project Forums
                  </Button>
                </Col>
                <Col style={{ marginTop: 10 }} span={24}>
                  <p style={{ fontSize: '18px', textAlign: 'center' }}>
                    Can't seem to find people to work with?
                    <br />
                    Looking for guidance on a certain project?
                    <br />
                    <br />
                    The E-Hub Forums let you,
                    <br />
                  </p>

                  <p style={{ fontSize: '18px', textAlign: 'left' }}>
                    1. <b>Meet</b> people with similar project interests to work together,
                    <br />
                    2. <b>Learn</b> those who have already carried out those projects.
                  </p>
                </Col>
              </Mobile>

              <Default>
                <Col style={{ marginTop: 10, padding: 15 }} md={12}>
                  <Row type="flex" justify="center">
                    <Col span={24}>
                      <Button
                        block
                        onClick={this.goToMarket}
                        style={{
                          display: 'block',
                          margin: 'auto',
                          height: 'auto',
                          fontSize: 35,
                          paddingTop: 10
                        }}
                        type="primary"
                        icon="appstore"
                        size="large"
                      >
                        Market Place
                        <Col style={{ marginTop: 10 }} span={24}>
                          <p style={{ fontSize: '18px', textAlign: 'center' }}>
                            Searching for parts to build your project?
                            <br />
                            Or finding a way to sell off unwanted parts?
                            <br />
                            <br />
                            The E-Hub Marketplace allows you to,
                            <br />
                          </p>

                          <p style={{ fontSize: '18px', textAlign: 'left' }}>
                            1. <b>Buy</b> parts to carry out your project work,
                            <br />
                            2. <b>Sell</b> or <b>Rent</b> parts that you have but might not need.
                          </p>
                        </Col>
                      </Button>
                    </Col>
                  </Row>
                </Col>
                <Col style={{ marginTop: 10, padding: 15 }} md={12}>
                  <Row type="flex" justify="center">
                    <Col span={24}>
                      <Button
                        block
                        onClick={this.goToForums}
                        style={{
                          display: 'block',
                          margin: 'auto',
                          height: 'auto',
                          fontSize: 35,
                          paddingTop: 10
                        }}
                        type="primary"
                        icon="team"
                        size="large"
                      >
                        Project Forums
                        <Col style={{ marginTop: 10 }} span={24}>
                          <p style={{ fontSize: '18px', textAlign: 'center' }}>
                            Can't seem to find people to work with?
                            <br />
                            Looking for guidance on a certain project?
                            <br />
                            <br />
                            The E-Hub Forums let you,
                            <br />
                          </p>

                          <p style={{ fontSize: '18px', textAlign: 'left' }}>
                            1. <b>Meet</b> people with similar project interests to work together,
                            <br />
                            2. <b>Learn</b> those who have already carried out those projects.
                          </p>
                        </Col>
                      </Button>
                    </Col>
                  </Row>
                </Col>
              </Default>
            </Row>
          </Content>
        </Layout>
      </React.Fragment>
    );
  }

  mobileContent() {
    return (
      <React.Fragment>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>Account</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb>
        <Layout style={{ padding: '24px 0', background: '#fff' }}>
          <Content style={{ padding: '0 24px', minHeight: 280 }}>Account Page</Content>
        </Layout>
      </React.Fragment>
    );
  }

  render() {
    return <React.Fragment>{this.defaultContent()}</React.Fragment>;
  }
}

MarketView.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  classes: PropTypes.object.isRequired
};
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setUserDetails,
      setSelectedTab
    },
    dispatch
  );

const mapStateToProps = state => ({
  uid: state.main.uid,
  userDetails: state.main.userDetails
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(MarketView)
);
