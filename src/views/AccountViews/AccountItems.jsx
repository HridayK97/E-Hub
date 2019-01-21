/* eslint-disable react/destructuring-assignment */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Router, Route, Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { Layout, Row, Col, Spin, Menu, Breadcrumb, Icon, Form, Input, Button, message,Table, Divider, Tag } from 'antd';
import Responsive from 'react-responsive';
import { setUserDetails, setSelectedTab } from '../../reducers/main';
import firebase from '../../config/config';

const Mobile = props => <Responsive {...props} maxWidth={767} />;
const Default = props => <Responsive {...props} minWidth={768} />;

const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;
const { Column, ColumnGroup } = Table;

//  Initalize firestore reference
const db = firebase.firestore();

class AccountItems extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mainLoading: false,
      submitLoading: false,

      tableData : [{
        key: '1',
        firstName: 'John',
        lastName: 'Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
        tags: ['nice', 'developer'],
      }, {
        key: '2',
        firstName: 'Jim',
        lastName: 'Green',
        age: 42,
        address: 'London No. 1 Lake Park',
        tags: ['loser'],
      }, {
        key: '3',
        firstName: 'Joe',
        lastName: 'Black',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
        tags: ['cool', 'teacher'],
      }]
    };
  }

  componentDidMount() {
    this.setState({ mainLoading: true });
  }


  defaultContent() {
    const { tableData } = this.state;

    const columns = [{
      title: 'Item Name',
      dataIndex: 'itemName',
      key: 'itemName',
    }, {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
    }, {
      title: 'Sell Price',
      dataIndex: 'sellPrice',
      key: 'sellPrice',
    },
    {
      title: 'Rent Price',
      dataIndex: 'rentPrice',
      key: 'rentPrice',
    }, {
      title: 'Quantity',
      key: 'quantity',
      dataIndex: 'quantity',
    }, {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <span>
          <a href="javascript:;">View</a>
          <Divider type="vertical" />
          <a href="javascript:;">Delete</a>
        </span>
      ),
    }];
    
    const data = [{
      key: '1',
      itemName: 'Raspberry Pi 3',
      category: 'MicroProcessor',
      sellPrice: '1000 Rs',
      rentPrice: '100 Rs',
      quantity: 5,
    }, {
      key: '2',
      itemName: 'Logitech G402',
      category: 'Accessories',
      sellPrice: '---',
      rentPrice: '100 Rs',
      quantity: 2,
    }, {
      key: '3',
      itemName: 'Raspberry Pi 3',
      category: 'MicroProcessor',
      sellPrice: '1000 Rs',
      rentPrice: '---',
      quantity: 5,
    },
    {
      key: '4',
      itemName: 'Logitech G402',
      category: 'Accessories',
      sellPrice: '1000 Rs',
      rentPrice: '100 Rs',
      quantity: 2,
    }];
    return (
      <React.Fragment>
        <Layout style={{ margin: '16px 0', padding: '24px 0', background: '#fff' }}>
          <Content style={{ padding: '0 24px', minHeight: 280 }}>
            <h2>Sell History</h2>
            <Row type="flex" justify="start" align="middle">
              <Col xs={18}>
              <Table columns={columns} dataSource={data}>
              
            </Table>
              </Col>
            </Row>
          </Content>
        </Layout>
      </React.Fragment>
    );
  }

  mobileContent() {

     const columns = [{
      title: 'Name',
      dataIndex: 'itemName',
      key: 'itemName',
    },{
      title: 'Sell',
      dataIndex: 'sellPrice',
      key: 'sellPrice',
    },
    {
      title: 'Rent',
      dataIndex: 'rentPrice',
      key: 'rentPrice',
    }, {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <span>
          <a href="javascript:;">View</a>
          <Divider type="vertical" />
          <a href="javascript:;">Delete</a>
        </span>
      ),
    }];
    
    const data = [{
      key: '1',
      itemName: 'Raspberry Pi 3',
      category: 'MicroProcessor',
      sellPrice: '1000 Rs',
      rentPrice: '100 Rs',
      quantity: 5,
    }, {
      key: '2',
      itemName: 'Logitech G402',
      category: 'Accessories',
      sellPrice: '---',
      rentPrice: '100 Rs',
      quantity: 2,
    }, {
      key: '3',
      itemName: 'Raspberry Pi 3',
      category: 'MicroProcessor',
      sellPrice: '1000 Rs',
      rentPrice: '---',
      quantity: 5,
    },
    {
      key: '4',
      itemName: 'Logitech G402',
      category: 'Accessories',
      sellPrice: '1000 Rs',
      rentPrice: '100 Rs',
      quantity: 2,
    }];
    return (
      <React.Fragment>
      <Layout style={{ margin: '16px 0', padding: '24px 0', background: '#fff' }}>
      <Content style={{ padding: '0 0px', minHeight: 280 }}>
        <h2>Sell History</h2>
        <Row type="flex" justify="start" align="middle">
          <Col xs={24}>
          <Table size='middle' columns={columns} dataSource={data}>
          
        </Table>
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
