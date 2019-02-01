/* eslint-disable react/destructuring-assignment */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { bindActionCreators } from 'redux';
import Responsive from 'react-responsive';
import { Layout, Row, Col, Spin, Breadcrumb, Form, Input, Button, message } from 'antd';
import { setUserDetails, setSelectedTab } from '../../reducers/main';
import firebase from '../../config/config';

const Mobile = props => <Responsive {...props} maxWidth={767} />;
const Default = props => <Responsive {...props} minWidth={768} />;

// import { Provider, Heading, Subhead } from 'rebass'
// import {
//   Hero, CallToAction, ScrollDownIndicator
// } from 'react-landing-page'
const { Content } = Layout;

//  Initalize firestore reference
const db = firebase.firestore();

class MarketView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // mainLoading: false,
      submitLoading: false,
      isEditing: false,
      nameStatus: 'success',
      numberStatus: 'success'
    };
  }

  componentDidMount() {
    this.props.setSelectedTab([]);
  }

  defaultContent() {
    const { nameStatus, numberStatus, name, number, submitLoading } = this.state;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      }
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0
        },
        sm: {
          span: 16,
          offset: 8
        }
      }
    };
    return (
      <React.Fragment>
        <Layout style={{ margin: '16px 0', padding: '24px 0', background: '#fff' }}>
          <Content style={{ padding: '0 24px', minHeight: '100vh' }}>
            <Row type="flex" justify="center" align="middle">
              <Col xs={24}>
                <Default>
                  <h1 style={{ fontSize: '50px', textAlign: 'center' }}>
                    Welcome to E-Hub. Get started.
                  </h1>
                </Default>
                <Mobile>
                  <h1 style={{ textAlign: 'center' }}>Welcome to E-Hub. Get started.</h1>
                </Mobile>
              </Col>
              <Col xs={24} md={12}>
                <span style={{ fontSize: '20px', textAlign: 'left' }}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                  incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                  exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </span>
              </Col>
            </Row>
            <Row type="flex" justify="center">
              <Mobile>
                <Col style={{ marginTop: 10 }} xs={24}>
                  <Button
                    style={{ display: 'block', margin: 'auto' }}
                    type="primary"
                    icon="appstore"
                    size="large"
                  >
                    Market Place
                  </Button>
                </Col>
                <Col style={{ marginTop: 10 }} xs={24}>
                  <Button
                    style={{ display: 'block', margin: 'auto' }}
                    type="primary"
                    icon="team"
                    size="large"
                  >
                    Project Forums
                  </Button>
                </Col>
              </Mobile>

              <Default>
                <Col style={{ marginTop: 50 }} md={12}>
                  <Button
                    style={{ height: 80, fontSize: 30, float:'right', marginRight:40 }}
                    type="primary"
                    icon="appstore"
                    size="large"
                  >
                    Market Place
                  </Button>
                </Col>
                <Col style={{ marginTop: 50 }} md={12}>
                  <Button
                    style={{ height: 80, fontSize: 30, float:'left',marginLeft:40 }}
                    type="primary"
                    icon="team"
                    size="large"
                  >
                    Project Forums
                  </Button>
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
