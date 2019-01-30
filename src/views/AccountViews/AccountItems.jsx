/* eslint-disable react/destructuring-assignment */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { bindActionCreators } from 'redux';
import { Layout, Row, Col, Spin, Table, Divider, message, Modal } from 'antd';
import Responsive from 'react-responsive';
import { setUserDetails, setSelectedTab } from '../../reducers/main';
import firebase from '../../config/config';

const Mobile = props => <Responsive {...props} maxWidth={767} />;
const Default = props => <Responsive {...props} minWidth={768} />;

const { Content } = Layout;
const { confirm } = Modal;

//  Initalize firestore reference
const db = firebase.firestore();

class AccountItems extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tableLoading: false,
      tableData: []
    };
  }

  componentDidMount() {
    this.getListedItems();
  }

  getListedItems() {
    const { uid } = this.props;
    this.setState({ tableLoading: true });
    db.collection('Items')
      .where('sellerId', '==', uid)
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

  deleteItem(itemId) {
    confirm({
      title: 'Do you want to delete this listing?',
      content: '',
      onOk: () =>
        new Promise(resolve =>
          // setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
          db
            .collection('Items')
            .doc(itemId)
            .delete()
            .then(() => {
              message.success('Item has been successfully deleted.');
              this.getListedItems();
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
            <a onClick={() => this.deleteItem(record.itemId)}>Delete</a>
          </span>
        )
      }
    ];
    return (
      <React.Fragment>
        <Layout style={{ margin: '16px 0', padding: '24px 0', background: '#fff' }}>
          <Content style={{ padding: '0 24px', minHeight: 280 }}>
            <h2>Sell History</h2>
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
          </Content>
        </Layout>
      </React.Fragment>
    );
  }

  mobileContent() {
    const columns = [
      {
        title: 'Name',
        dataIndex: 'itemName',
        key: 'itemName'
      },
      {
        title: 'Sell',
        dataIndex: 'sellPrice',
        key: 'sellPrice'
      },
      {
        title: 'Rent',
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
            <a onClick={() => this.deleteItem(record.itemId)}>Delete</a>
          </span>
        )
      }
    ];

    return (
      <React.Fragment>
        <Layout style={{ margin: '16px 0', padding: '24px 0', background: '#fff' }}>
          <Content style={{ padding: '0 0px', minHeight: 280 }}>
            <h2>Sell History</h2>
            {this.state.tableLoading ? (
              <Row type="flex" justify="center" align="middle">
                <Spin size="medium" />
              </Row>
            ) : (
              <Row type="flex" justify="start" align="middle">
                <Col xs={24}>
                  <Table size="middle" columns={columns} dataSource={this.state.tableData} />
                </Col>
              </Row>
            )}
          </Content>
        </Layout>
      </React.Fragment>
    );
  }

  render() {
    return (
      <React.Fragment>
        <Mobile>{this.mobileContent()}</Mobile>
        <Default>{this.defaultContent()}</Default>
      </React.Fragment>
    );
  }
}

AccountItems.propTypes = {
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
  )(AccountItems)
);
