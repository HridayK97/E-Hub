/* eslint-disable react/destructuring-assignment */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Router, Route, Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { Layout, Row, Col, Spin, Menu, Breadcrumb, Icon, Form, Input, Button } from 'antd';
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
      mainLoading: false,
      isEditing:false
    };
    this.handleEditButton = this.handleEditButton.bind(this);
  }

  componentDidMount() {
    this.props.setSelectedTab(['3']);
    this.setState({ mainLoading: true });
  }

  handleEditButton(){
    const {isEditing} = this.state;
    this.setState({isEditing:!isEditing});
  }

  defaultContent() {
    const { nameStatus, numberStatus, name, number, registerLoading } = this.state;

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
        <Layout style={{ padding: '24px 0', background: '#fff' }}>
          <Content style={{ padding: '0 24px', minHeight: 280 }}>
            <h2>Philip Mathew</h2>
            <Row type="flex" justify="start" align="middle">
              <Col style={{ paddingTop: 10 }} xs={12}>
                <Form>
                  <Form.Item
                    {...formItemLayout}
                    label="Name"
                    required
                    validateStatus={nameStatus}
                    help={nameStatus !== 'success' ? 'Name should be at least two characters.' : ''}
                  >
                    <Input disabled={!this.state.isEditing}
                    value={'Philip Mathew'} onChange={this.onChangeName} />
                  </Form.Item>
                  <Form.Item
                    required
                    {...formItemLayout}
                    label="Contact Number"
                    validateStatus={numberStatus}
                    help={numberStatus !== 'success' ? 'Invalid Number' : ''}
                  >
                    <Input
                      disabled={!this.state.isEditing}
                      type="number"
                      value="9900067553"
                      onChange={this.onChangeNumber}
                    />
                  </Form.Item>

                  <Form.Item {...tailFormItemLayout}>
                    {registerLoading ? (
                      <Spin size="large" />
                    ) : (
                      <Button onClick={this.handleEditButton} type="primary" htmlType="submit">
                        {this.state.isEditing?'Save':'Edit'}
                      </Button>
                    )}
                  </Form.Item>
                </Form>
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
