/* eslint-disable react/destructuring-assignment */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { bindActionCreators } from 'redux';
import { Layout, Row, Col, Spin, Breadcrumb, Button } from 'antd';
import Responsive from 'react-responsive';
import { setUserDetails, setSelectedTab } from '../../reducers/main';
import firebase from '../../config/config';

const Mobile = props => <Responsive {...props} maxWidth={767} />;
const Default = props => <Responsive {...props} minWidth={768} />;

const { Content } = Layout;

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
    this.getItemDetails();
    this.props.setSelectedTab(['1']);
  }

  getItemDetails() {
    const { id } = this.props.match.params;
    const itemId = id;
    this.setState({ mainLoading: true });
    db.collection('Items')
      .doc(itemId)
      .get()
      .then(doc => {
        const item = doc.data();
        const { sellerId, status } = doc.data();
        if (status === 'rejected' || status === 'deleted') {
          //  If the item has been rejected or deleted, redirect.
          this.setState({ mainLoading: false });
          this.props.history.push('/main/market');
        } else {
          this.setState(item);
          return db
            .collection('Users')
            .doc(sellerId)
            .get()
            .then(userDoc => {
              const { name, number } = userDoc.data();
              this.setState({ sellerName: name, sellerContact: number, mainLoading: false });
            });
        }
      })
      .catch(() => {
        this.setState({ mainLoading: false });
        this.props.history.push('/main/market');
      });
  }

  defaultContent() {
    const {
      mainLoading,
      itemName,
      itemDescription,
      imageUrl,
      category,
      subcategory,
      rentCheck,
      sellCheck,
      rentPrice,
      sellPrice,
      sellerContact,
      sellerName
    } = this.state;
    return (
      <React.Fragment>
        {mainLoading ? (
          <Layout style={{ backgroundColor: '#ffffff' }}>
            <Row style={{ minHeight: '100vh' }} type="flex" justify="center" align="middle">
              <Spin size="large" />
            </Row>
          </Layout>
        ) : (
          <Layout style={{ padding: '24px 0', background: '#fff' }}>
            <Content style={{ padding: '0 24px', minHeight: 280 }}>
              <h1>{itemName}</h1>
              <Breadcrumb>
                <Breadcrumb.Item>{category}</Breadcrumb.Item>
                <Breadcrumb.Item>{subcategory}</Breadcrumb.Item>
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
                      src={imageUrl}
                    />
                  </div>
                </Col>
                <Col md={16}>
                  <Row type="flex" justify="start" align="middle">
                    {sellCheck ? (
                      <Col style={{ paddingTop: 10 }} xs={24}>
                        <Button type="primary" size="large">
                          {`Buy ${sellPrice} Rs`}
                        </Button>
                      </Col>
                    ) : null}

                    {rentCheck ? (
                      <Col style={{ paddingTop: 10 }} xs={24}>
                        <Button type="primary" size="large">
                          {`Rent ${rentPrice} Rs`}
                        </Button>
                      </Col>
                    ) : null}
                    <Col style={{ paddingTop: 10 }} xs={24}>
                      <h3>Seller: {sellerName}</h3>
                    </Col>
                    <Col xs={24}>
                      <h3>Contact: {sellerContact}</h3>
                    </Col>
                  </Row>
                </Col>
                <Col xs={24} md={12}>
                  <h2>Description</h2>
                  <p>{itemDescription}</p>
                </Col>
              </Row>
            </Content>
          </Layout>
        )}
      </React.Fragment>
    );
  }

  mobileContent() {
    const {
      mainLoading,
      itemName,
      itemDescription,
      imageUrl,
      category,
      subcategory,
      rentCheck,
      sellCheck,
      rentPrice,
      sellPrice,
      sellerContact,
      sellerName
    } = this.state;
    return (
      <React.Fragment>
        {mainLoading ? (
          <Layout style={{ backgroundColor: '#ffffff' }}>
            <Row style={{ minHeight: '100vh' }} type="flex" justify="center" align="middle">
              <Spin size="large" />
            </Row>
          </Layout>
        ) : (
          <Layout style={{ padding: '24px 0', background: '#fff' }}>
            <Content style={{ padding: '0 24px', minHeight: 280 }}>
              <h1>{itemName}</h1>
              <Breadcrumb>
                <Breadcrumb.Item>{category}</Breadcrumb.Item>
                <Breadcrumb.Item>{subcategory}</Breadcrumb.Item>
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
                      src={imageUrl}
                    />
                  </div>
                </Col>
                <Col sm={24}>
                  <Row type="flex" justify="start" align="middle">
                    {sellCheck ? (
                      <Col xs={12}>
                        <Button type="primary" size="large">
                          {`Buy ${sellPrice} Rs`}
                        </Button>
                      </Col>
                    ) : null}

                    {rentCheck ? (
                      <Col xs={12}>
                        <Button type="primary" size="large">
                          {`Rent ${rentPrice} Rs`}
                        </Button>
                      </Col>
                    ) : null}
                    <Col style={{ paddingTop: 10 }} xs={24}>
                      <h3>Seller: {sellerName}</h3>
                    </Col>
                    <Col xs={24}>
                      <h3>Contact: {sellerContact}</h3>
                    </Col>
                  </Row>
                </Col>
                <Col xs={24} md={12}>
                  <h2>Description</h2>
                  <p>{itemDescription}</p>
                </Col>
              </Row>
            </Content>
          </Layout>
        )}
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
