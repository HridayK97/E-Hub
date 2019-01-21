/* eslint-disable react/destructuring-assignment */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Router, Route, Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { Layout, Row, Col, Spin, Menu, Breadcrumb, Icon, Button } from 'antd';
import Responsive from 'react-responsive';
import { setUserDetails, setSelectedTab } from '../../reducers/main';
import firebase from '../../config/config';

const Mobile = props => <Responsive {...props} maxWidth={767} />;
const Default = props => <Responsive {...props} minWidth={768} />;

const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;

//  Initalize firestore reference
const db = firebase.firestore();

class MarketView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mainLoading: false
    };
  }

  componentDidMount() {
    this.props.setSelectedTab(['1']);
    this.setState({ mainLoading: true });
  }

  defaultContent() {
    return (
      <React.Fragment>
        <Layout style={{ padding: '24px 0', background: '#fff' }}>
          <Content style={{ padding: '0 24px', minHeight: 280 }}>
            <h1>Item Name</h1>
            <Breadcrumb>
              <Breadcrumb.Item>Category</Breadcrumb.Item>
              <Breadcrumb.Item>Sub-Category</Breadcrumb.Item>
            </Breadcrumb>
            <Row gutter={24} type="flex" justify="start" align="middle">
              <Col xs={24} md={8}>
                <div style={{ height: 300, width: '100%' }}>
                  <img
                    style={{
                      padding: 5,
                      height: '100%',
                      width: '100%',
                      objectFit: 'contain'
                    }}
                    alt="example"
                    src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                  />
                </div>
              </Col>
              <Col md={16}>
                <Row type="flex" justify="start" align="middle">
                  <Col style={{ paddingTop: 10 }} xs={24}>
                    <Button type="primary" size={'large'}>
                      Buy 100 Rs
                    </Button>
                  </Col>

                  <Col style={{ paddingTop: 10 }} xs={24}>
                    <Button type="primary" size={'large'}>
                      Rent 100 Rs
                    </Button>
                  </Col>
                  <Col style={{ paddingTop: 10 }} xs={24}>
                    <h3>Seller: Philip Mathew</h3>
                  </Col>
                  <Col xs={24}>
                    <h3>Contact: 9973655323</h3>
                  </Col>
                </Row>
              </Col>
              <Col xs={24} md={12}>
                <p>
                  This is the item description. Lorem ipsum dolor sit amet, consectetur adipiscing
                  elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
                  ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                  commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                  cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
                  proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>
              </Col>
            </Row>
          </Content>
        </Layout>
      </React.Fragment>
    );
  }

  mobileContent() {
    return (
      <React.Fragment>
        <Layout style={{ padding: '24px 0', background: '#fff' }}>
          <Content style={{ padding: '0 24px', minHeight: 280 }}>
            <h1>Item Name</h1>
            <Breadcrumb>
              <Breadcrumb.Item>Category</Breadcrumb.Item>
              <Breadcrumb.Item>Sub-Category</Breadcrumb.Item>
            </Breadcrumb>
            <Row gutter={24} type="flex" justify="start" align="middle">
              <Col xs={24}>
                <div style={{ height: 300, width: '100%' }}>
                  <img
                    style={{
                      padding: 5,
                      height: '100%',
                      width: '100%',
                      objectFit: 'contain'
                    }}
                    alt="example"
                    src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                  />
                </div>
              </Col>
              <Col sm={24}>
                <Row type="flex" justify="start" align="middle">
                  <Col xs={12}>
                    <Button type="primary" size={'large'}>
                      Buy 100 Rs
                    </Button>
                  </Col>

                  <Col xs={12}>
                    <Button type="primary" size={'large'}>
                      Rent 100 Rs
                    </Button>
                  </Col>
                  <Col style={{ paddingTop: 10 }} xs={24}>
                    <h3>Seller: Philip Mathew</h3>
                  </Col>
                  <Col xs={24}>
                    <h3>Contact: 9973655323</h3>
                  </Col>
                </Row>
              </Col>
              <Col xs={24} md={12}>
                <p>
                  This is the item description. Lorem ipsum dolor sit amet, consectetur adipiscing
                  elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
                  ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                  commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                  cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
                  proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>
              </Col>
            </Row>
          </Content>
        </Layout>
      </React.Fragment>
    );
  }

  render() {
    const { mainLoading } = this.state;
    return (
      <React.Fragment>
        <Mobile>{this.mobileContent()}</Mobile>
        <Default>{this.defaultContent()}</Default>
      </React.Fragment>
    );
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

const mapStateToProps = () => ({});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(MarketView)
);
