/* eslint-disable react/destructuring-assignment */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Router, Route, Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import {
  Layout,
  Row,
  Col,
  Spin,
  Menu,
  Breadcrumb,
  Icon,
  Card,
  Avatar,
  Select,
  Pagination
} from 'antd';
import Responsive from 'react-responsive';
import { setUserDetails, setSelectedTab } from '../../reducers/main';
import firebase from '../../config/config';

const Mobile = props => <Responsive {...props} maxWidth={767} />;
const Default = props => <Responsive {...props} minWidth={768} />;

const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;
const { Meta } = Card;
const { Option } = Select;

//  Initalize firestore reference
const db = firebase.firestore();

class MarketView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mainLoading: false,
      categories: ['All', 'Category 1', 'Category 2', 'Category 3', 'Category 4'],
      subcategories: ['Sub 1', 'Sub 2', 'Sub 3', 'Sub 4', 'Sub 5']
    };
    this.handleChange = this.handleChange.bind(this);
    this.onClickItem = this.onClickItem.bind(this);
  }

  componentDidMount() {
    this.props.setSelectedTab(['1']);
    this.setState({ mainLoading: true });
  }

  handleChange(value) {
    console.log(`selected ${value}`);
  }

  onClickItem() {
    const itemId = 'itemID';
    this.props.history.push(`/main/market/${itemId}`);
  }

  defaultContent() {
    return (
      <React.Fragment>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb>
        <Layout style={{ padding: '24px 0', background: '#fff' }}>
          <Sider width={200} style={{ background: '#fff' }}>
            <Menu
              mode="inline"
              defaultSelectedKeys={['0']}
              defaultOpenKeys={['sub1']}
              style={{ height: '100%' }}
            >
              <Menu.Item key="0">
                <Icon type="pie-chart" />
                <span>All</span>
              </Menu.Item>
              <Menu.Item key="1">
                <Icon type="pie-chart" />
                <span>Category 1</span>
              </Menu.Item>
              <Menu.Item key="2">
                <Icon type="desktop" />
                <span>Category 2</span>
              </Menu.Item>
              <Menu.Item key="3">
                <Icon type="inbox" />
                <span>Category 3</span>
              </Menu.Item>
            </Menu>
          </Sider>
          <Content style={{ padding: '0 24px', minHeight: 280 }}>
            <Row style={{ padding: '10px 0px' }}>
              <h2>Selected Category</h2>
              <Col xs={24} md={8}>
                <Select
                  mode="multiple"
                  style={{ width: '100%' }}
                  placeholder="Filter Sub-Categories"
                  defaultValue={[]}
                  onChange={this.handleChange}
                >
                  {this.state.subcategories.map((subcat, i) => (
                    <Option key={i}>{subcat}</Option>
                  ))}
                </Select>
              </Col>
            </Row>
            <Row type="flex" justify="center" align="middle">
              <Pagination defaultCurrent={1} total={50} />
            </Row>
            <Row>
              {[0, 1, 2, 3, 4, 5, 6].map(key => (
                <Col style={{ padding: '10px 0' }} xs={8}>
                  <Card
                    onClick={this.onClickItem}
                    style={{ width: 300 }}
                    cover={
                      <div style={{ height: 150, width: 300 }}>
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
                    }
                  >
                    <Meta
                      title="Item Name"
                      description={
                        <React.Fragment>
                          <p style={{ float: 'right' }}>Buy: Rs 100</p>
                          <p style={{ float: 'left' }}>Rent: Rs 100</p>
                        </React.Fragment>
                      }
                    />
                  </Card>
                </Col>
              ))}
            </Row>
            <Row type="flex" justify="center" align="middle">
              <Pagination defaultCurrent={1} total={50} />
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
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb>
        <Layout style={{ padding: '0 0', background: '#fff' }}>
          <Select
            style={{ width: '100%' }}
            placeholder="Filter Sub-Categories"
            defaultValue={['All']}
            onChange={this.handleChange}
          >
            {this.state.categories.map((cat, i) => (
              <Option key={i}>{cat}</Option>
            ))}
          </Select>
          <Content style={{ padding: '0 24px', minHeight: 280 }}>
            <Row style={{ padding: '10px 0px' }}>
              <h2>Selected Category</h2>
              <Col xs={24} md={8}>
                <Select
                  mode="multiple"
                  style={{ width: '100%' }}
                  placeholder="Filter Sub-Categories"
                  defaultValue={[]}
                  onChange={this.handleChange}
                >
                  {this.state.subcategories.map((subcat, i) => (
                    <Option key={i}>{subcat}</Option>
                  ))}
                </Select>
              </Col>
            </Row>
            <Row>
              {[0, 1, 2, 3, 4, 5, 6].map(key => (
                <Col xs={24}>
                  <Card
                    onClick={this.onClickItem}
                    style={{ width: '100%' }}
                    cover={
                      <div style={{ height: 150, width: '100%' }}>
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
                    }
                  >
                    <Meta
                      title="Item Name"
                      description={
                        <React.Fragment>
                          <p style={{ float: 'right' }}>Buy: Rs 100</p>
                          <p style={{ float: 'left' }}>Rent: Rs 100</p>
                        </React.Fragment>
                      }
                    />
                  </Card>
                </Col>
              ))}
            </Row>
            <Row type="flex" justify="center" align="middle">
              <Pagination defaultCurrent={1} total={50} />
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
