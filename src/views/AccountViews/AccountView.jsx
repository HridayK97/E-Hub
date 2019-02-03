/* eslint-disable react/destructuring-assignment */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { bindActionCreators } from 'redux';
import { Layout, Row, Col, Spin, Breadcrumb, Form, Input, Button, message } from 'antd';
import AccountItems from './AccountItems';
import { setUserDetails, setSelectedTab } from '../../reducers/main';
import firebase from '../../config/config';

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
    this.handleEditButton = this.handleEditButton.bind(this);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeNumber = this.onChangeNumber.bind(this);
  }

  componentDidMount() {
    this.props.setSelectedTab(['3']);
    this.getAccountDetails();
    // this.setState({ mainLoading: true });
  }

  getAccountDetails() {
    const { uid } = this.props;

    // console.log(uid);
    db.collection('Users')
      .doc(uid)
      .get()
      .then(doc => {
        const { name, number } = doc.data();
        this.setState({ name, number });
      });
  }

  onChangeName(ev) {
    this.setState({ name: ev.target.value });
  }

  onChangeNumber(ev) {
    this.setState({ number: ev.target.value });
  }

  validateFields() {
    const { name, number } = this.state;
    let valid = true;
    if (name.length < 2) {
      valid = false;
      this.setState({ nameStatus: 'error' });
    } else if (number.length !== 10) {
      valid = false;
      this.setState({ numberStatus: 'error' });
    }

    return valid;
  }

  handleEditButton() {
    const { isEditing } = this.state;
    if (isEditing) {
      if (this.validateFields()) {
        this.setState({ submitLoading: true });
        const { uid } = this.props;
        const { name, number } = this.state;
        db.collection('Users')
          .doc(uid)
          .set({ name, number }, { merge: true })
          .then(() => {
            message.success('Details successfully updated.');
            this.setState({ submitLoading: false, isEditing: !isEditing });
          });
      }
    } else {
      this.setState({ isEditing: !isEditing });
    }
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
          <Content style={{ padding: '0 24px', minHeight: 280 }}>
            <h2>Profile Details</h2>
            <Row type="flex" justify="start" align="middle">
              <Col style={{ paddingTop: 10 }} xs={24} md={12}>
                <Form>
                  <Form.Item
                    {...formItemLayout}
                    label="Name"
                    required
                    validateStatus={nameStatus}
                    help={nameStatus !== 'success' ? 'Name should be at least two characters.' : ''}
                  >
                    <Input
                      disabled={!this.state.isEditing}
                      value={name}
                      onChange={this.onChangeName}
                    />
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
                      value={number}
                      onChange={this.onChangeNumber}
                    />
                  </Form.Item>

                  <Form.Item {...tailFormItemLayout}>
                    {submitLoading ? (
                      <Spin size="large" />
                    ) : (
                      <Button onClick={this.handleEditButton} type="primary" htmlType="submit">
                        {this.state.isEditing ? 'Save' : 'Edit'}
                      </Button>
                    )}
                  </Form.Item>
                </Form>
              </Col>
              <Col xs={24}>
                <AccountItems />
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
