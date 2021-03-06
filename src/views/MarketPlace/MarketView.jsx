/* eslint-disable react/destructuring-assignment */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { bindActionCreators } from 'redux';
import { Layout, Row, Col, Spin, Menu, Icon, Card, Select, Pagination } from 'antd';
import Responsive from 'react-responsive';
import { setUserDetails, setSelectedTab, setItems } from '../../reducers/main';
import MarketImage from './MarketImage';
import firebase from '../../config/config';

const Mobile = props => <Responsive {...props} maxWidth={767} />;
const Default = props => <Responsive {...props} minWidth={768} />;

const { Content, Sider } = Layout;
const { Meta } = Card;
const { Option } = Select;
const categoryIcons = {
  'Electionic Components': 'laptop',
  'Consumer Electronics': 'laptop',
  Displays: 'desktop',
  Microcontrollers: 'deployment-unit',
  Modules: 'gateway',
  Motors: 'heat-map',
  'Power Sources': 'thunderbolt',
  'Raspberry Pi': 'hdd',
  Relays: 'sliders',
  Sensors: 'bulb',
  Tools: 'tool',
  Miscellaneous: 'exception'
};

//  Initalize firestore reference
const db = firebase.firestore();

class MarketView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mainLoading: false,
      categories: [],
      allSelected: true,
      selectedItems: [],
      selectedItemsPage: [],
      selectedCategory: 'All',
      selectedCategoryItems: [],
      subcategories: [],
      currentPageNumber: 1
      // subcategoriesValue: []
    };

    this.onClickItem = this.onClickItem.bind(this);
    this.onSelectCategoryMenu = this.onSelectCategoryMenu.bind(this);
    this.onSelectCategorySelect = this.onSelectCategorySelect.bind(this);
    this.handleSubcategoryChange = this.handleSubcategoryChange.bind(this);
    this.onChangePage = this.onChangePage.bind(this);
  }

  componentDidMount() {
    this.props.setSelectedTab(['1']);
    this.getItems();
    const { categories } = this.props;
    const categoriesList = Object.keys(categories);
    const i = categoriesList.indexOf('Miscellaneous');
    //  Re-order Miscellaneous to end of list
    categoriesList.splice(i, 1);
    categoriesList.push('Miscellaneous');
    //  categoriesList = ['All', ...categoriesList];
    this.setState({ categories: categoriesList });
  }

  getItems() {
    const { items } = this.props;
    if (items.length < 1) {
      this.setState({ mainLoading: true });
      const itemsList = [];
      db.collection('Items')
        .where('status', '==', 'approved')
        .where('deleted', '==', false)
        .orderBy('createdAt', 'desc')
        .get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            itemsList.push(doc.data());
          });
          this.props.setItems(itemsList);
          // Set the page number to 1 after setting the selected items. onChangePage sets the selectedItemsPage list
          this.setState({ mainLoading: false, selectedItems: itemsList }, () =>
            this.onChangePage(1, 9)
          );
        });
    } else {
      this.setState({ mainLoading: false, selectedItems: items }, () => this.onChangePage(1, 9));
    }
  }

  onClickItem(itemId) {
    this.props.history.push(`/main/market/${itemId}`);
  }

  onSelectCategoryMenu(data) {
    const { key } = data;
    // console.log(item, key, keyPath);
    const { items, categories } = this.props;

    if (key === 'All') {
      this.setState(
        {
          selectedCategory: key,
          selectedItems: items,
          allSelected: true,
          // subcategoriesValue: [],
          selectedCategoryItems: []
        },
        () => this.onChangePage(1, 9)
      );
      // db.collection('Items').get
    } else {
      const selectedItems = items.filter(itemDoc => itemDoc.category === key);
      const subcategories = categories[key];
      this.setState(
        {
          selectedCategory: key,
          selectedItems,
          allSelected: false,
          subcategories,
          // subcategoriesValue: [],
          selectedCategoryItems: selectedItems
        },
        () => this.onChangePage(1, 9)
      );
    }
  }

  onSelectCategorySelect(key) {
    const { items, categories } = this.props;

    if (key === 'All') {
      this.setState(
        {
          selectedCategory: key,
          selectedItems: items,
          allSelected: true,
          // subcategoriesValue: [],
          selectedCategoryItems: []
        },
        () => this.onChangePage(1, 9)
      );
      // db.collection('Items').get
    } else {
      const selectedItems = items.filter(itemDoc => itemDoc.category === key);
      const subcategories = categories[key];
      this.setState(
        {
          selectedCategory: key,
          selectedItems,
          allSelected: false,
          subcategories,
          // subcategoriesValue: [],
          selectedCategoryItems: selectedItems
        },
        () => this.onChangePage(1, 9)
      );
    }
  }

  handleSubcategoryChange(value) {
    const { selectedCategoryItems } = this.state;
    if (value.length === 0) {
      this.setState({ selectedItems: selectedCategoryItems }, () => this.onChangePage(1, 9));
    } else {
      const selectedItems = selectedCategoryItems.filter(item => value.includes(item.subcategory));
      // console.log(selectedItems);
      this.setState({ selectedItems }, () => this.onChangePage(1, 9));
    }
  }

  onChangePage(currentPageNumber, itemsPerPage) {
    const { selectedItems } = this.state;
    // console.log(selectedItems);
    const start = (currentPageNumber - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    // console.log(start, end);
    const selectedItemsPage = selectedItems.slice(start, end);
    // console.log(selectedItemsPage);
    this.setState({ currentPageNumber, selectedItemsPage });
    window.scrollTo(0, 0);
    //  Scroll to Top
  }

  defaultContent() {
    // console.log(this.state.selectedItems);
    return (
      <React.Fragment>
        <Layout style={{ margin: '16px 0', padding: '12px 0', background: '#fff' }}>
          <Sider width={225} style={{ background: '#fff' }}>
            <Menu
              onClick={this.onSelectCategoryMenu}
              mode="inline"
              defaultSelectedKeys={['All']}
              defaultOpenKeys={['sub1']}
              style={{ height: '100%' }}
            >
              <Menu.Item key="All">
                <Icon type="pie-chart" />
                <span>All</span>
              </Menu.Item>
              {this.state.categories.map(category => (
                <Menu.Item key={category}>
                  <Icon type={categoryIcons[category] || 'pie-chart'} />
                  <span>{category}</span>
                </Menu.Item>
              ))}
            </Menu>
          </Sider>
          <Content style={{ padding: '0 24px', minHeight: 280 }}>
            <Row style={{ padding: '10px 5px' }}>
              <h2>{this.state.selectedCategory}</h2>
              {this.state.allSelected ? null : (
                <Col xs={24} sm={16} md={8}>
                  <Select
                    mode="multiple"
                    style={{ width: '100%' }}
                    placeholder="Filter Sub-Categories"
                    defaultValue={[]}
                    onChange={this.handleSubcategoryChange}
                  >
                    {this.state.subcategories.map(subcat => (
                      <Option key={subcat}>{subcat}</Option>
                    ))}
                  </Select>
                </Col>
              )}
            </Row>
            {this.state.mainLoading ? (
              <Row type="flex" justify="center" align="middle">
                <Spin size="medium" />
              </Row>
            ) : (
              <Row>
                {this.state.selectedItemsPage.map(item => (
                  <Col style={{ padding: '10px 0' }} xs={8}>
                    <a>
                      <Card
                        onClick={() => this.onClickItem(item.itemId)}
                        style={{ width: 300 }}
                        cover={
                          <div style={{ height: 150, width: 300 }}>
                            <MarketImage imageUrl={item.imageUrl} />
                          </div>
                        }
                      >
                        <Meta
                          title={item.itemName}
                          description={
                            <React.Fragment>
                              {item.sellCheck ? (
                                <p style={{ float: 'left' }}>Buy: Rs {item.sellPrice}</p>
                              ) : null}
                              {item.rentCheck ? (
                                <p style={{ float: 'right' }}>Rent: Rs {item.rentPrice}</p>
                              ) : null}
                            </React.Fragment>
                          }
                        />
                      </Card>
                    </a>
                  </Col>
                ))}
              </Row>
            )}
            <Row type="flex" justify="center" align="middle">
              <Pagination
                hideOnSinglePage
                current={this.state.currentPageNumber}
                onChange={this.onChangePage}
                defaultPageSize={9}
                total={this.state.selectedItems.length}
              />
            </Row>
          </Content>
        </Layout>
      </React.Fragment>
    );
  }

  mobileContent() {
    return (
      <React.Fragment>
        <Layout style={{ padding: '0 0', background: '#fff' }}>
          <Row style={{ padding: '10px 10px' }}>
            <Select
              style={{ width: '100%' }}
              placeholder="Select Category"
              defaultValue={['All']}
              onChange={this.onSelectCategorySelect}
            >
              <Option key="All">All</Option>

              {this.state.categories.map(category => (
                <Option key={category}>{category}</Option>
              ))}
            </Select>
          </Row>
          <Content style={{ padding: '10 10px', minHeight: '100vh' }}>
            <Row style={{ padding: '10px 5px' }}>
              <h2>{this.state.selectedCategory}</h2>
              {this.state.allSelected ? null : (
                <Col xs={24} md={8}>
                  <Select
                    mode="multiple"
                    style={{ width: '100%' }}
                    placeholder="Filter Sub-Categories"
                    defaultValue={[]}
                    onChange={this.handleSubcategoryChange}
                  >
                    {this.state.subcategories.map(subcat => (
                      <Option key={subcat}>{subcat}</Option>
                    ))}
                  </Select>
                </Col>
              )}
            </Row>
            {this.state.mainLoading ? (
              <Row type="flex" justify="center" align="middle">
                <Spin size="medium" />
              </Row>
            ) : (
              <Row style={{ padding: '5px' }}>
                {this.state.selectedItemsPage.map(item => (
                  <Col style={{ padding: '10px 0px' }} xs={24}>
                    <Card
                      onClick={() => this.onClickItem(item.itemId)}
                      style={{ width: '100%' }}
                      cover={
                        <div style={{ height: 150, width: '100%' }}>
                          <MarketImage imageUrl={item.imageUrl} />
                        </div>
                      }
                    >
                      <Meta
                        title={item.itemName}
                        description={
                          <React.Fragment>
                            {item.sellCheck ? (
                              <p style={{ float: 'left' }}>Buy: Rs {item.sellPrice}</p>
                            ) : null}
                            {item.rentCheck ? (
                              <p style={{ float: 'right' }}>Rent: Rs {item.rentPrice}</p>
                            ) : null}
                          </React.Fragment>
                        }
                      />
                    </Card>
                  </Col>
                ))}
              </Row>
            )}
            <Row style={{ padding: '10px 0px' }} type="flex" justify="center" align="middle">
              <Pagination
                hideOnSinglePage
                current={this.state.currentPageNumber}
                onChange={this.onChangePage}
                defaultPageSize={9}
                total={this.state.selectedItems.length}
              />
            </Row>
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

MarketView.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  classes: PropTypes.object.isRequired
};
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setUserDetails,
      setSelectedTab,
      setItems
    },
    dispatch
  );

const mapStateToProps = state => ({
  categories: state.main.categories,
  items: state.main.items
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(MarketView)
);
