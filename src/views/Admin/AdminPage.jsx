/* eslint-disable react/destructuring-assignment */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { bindActionCreators } from 'redux';
import { Layout, Row, Col, Spin, Breadcrumb, message, Table, Modal, Divider } from 'antd';
import { setUserDetails, setSelectedTab } from '../../reducers/main';
import firebase from '../../config/config';

// import { Provider, Heading, Subhead } from 'rebass'
// import {
//   Hero, CallToAction, ScrollDownIndicator
// } from 'react-landing-page'
const { Content } = Layout;
const { confirm } = Modal;
//  Initalize firestore reference
const db = firebase.firestore();

class MarketView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tableLoading: false,
      tableData: []
    };
  }

  componentDidMount() {
    this.props.setSelectedTab(['6']);
    this.getPendingItems();
  }

  getPendingItems() {
    this.setState({ tableLoading: true });
    db.collection('Items')
      .where('status', '==', 'pending')
      // .orderBy('createdAt', 'desc')
      .get()
      .then(snapshot => {
        const tableData = [];
        snapshot.forEach(doc => {
          tableData.push({ ...doc.data() });
        });
        this.setState({ tableData, tableLoading: false });
      });
  }

  approveItem(itemId) {
    confirm({
      title: 'Approve this listing?',
      content: '',
      onOk: () =>
        new Promise(resolve =>
          // setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
          db
            .collection('Items')
            .doc(itemId)
            .update({ status: 'approved' })
            .then(() => {
              message.success('Item has been approved.');
              this.getPendingItems();
              resolve();
            })
        ).catch(() => console.log('Oops errors!')),
      onCancel() {}
    });
  }

  defaultContent() {
    const columns = [
      {
        title: 'Item Name',
        dataIndex: 'itemName',
        key: 'itemName'
      },
      {
        title: 'Category',
        dataIndex: 'category',
        key: 'category'
      },
      {
        title: 'Sell Price',
        dataIndex: 'sellPrice',
        key: 'sellPrice'
      },
      {
        title: 'Rent Price',
        dataIndex: 'rentPrice',
        key: 'rentPrice'
      },
      {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
          <span>
            <a
              onClick={() => {
                this.props.history.push(`/main/market/${record.itemId}`);
              }}
            >
              View
            </a>
            <Divider type="vertical" />
            <a onClick={() => this.approveItem(record.itemId)}>Approve</a>
          </span>
        )
      }
    ];
    return (
      <React.Fragment>
        <Layout style={{ margin: '16px 0', padding: '24px 0', background: '#fff' }}>
          <Content style={{ padding: '0 24px', minHeight: '100vh' }}>
            <Row type="flex" justify="center" align="middle">
              <Col span={24}>
                <h1 style={{ fontSize: 30, textAlign: 'left' }}>Pending Items</h1>
              </Col>
              <Col xs={24} md={24}>
                {this.state.tableLoading ? (
                  <Row type="flex" justify="center" align="middle">
                    <Spin size="medium" />
                  </Row>
                ) : (
                  <Row type="flex" justify="start" align="middle">
                    <Col xs={18}>
                      <Table columns={columns} dataSource={this.state.tableData} />
                    </Col>
                  </Row>
                )}
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
