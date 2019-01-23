/* eslint-disable react/destructuring-assignment */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Redirect, Switch, Router, Route, Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { Layout, Row, Spin, Menu, Breadcrumb, Icon } from 'antd';
import Responsive from 'react-responsive';
import MarketView from './MarketPlace/MarketView.jsx';
import { setUserDetails } from '../reducers/main';
import mainRoutes from '../routes/mainRoutes';
import firebase from '../config/config';

const Mobile = props => <Responsive {...props} maxWidth={767} />;
const Default = props => <Responsive {...props} minWidth={768} />;

const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;

//  Initalize firestore reference
const db = firebase.firestore();

class MainPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mainLoading: true,
      selectedTab: ['1']
    };
    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    this.setState({ mainLoading: true });
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        db.collection('Users')
          .doc(user.uid)
          .get()
          .then(doc => {
            if (doc.exists) {
              this.saveUserDetailsAndProceed(doc.data(), doc.id);
              this.getConstants();
              this.setState({ mainLoading: false });
            } else {
              this.setState({ mainLoading: false });
              this.props.history.push('/login');
            }
          });
      } else {
        this.setState({ mainLoading: false });
        this.props.history.push('/login');
        // No user is signed in.
      }
    });
  }

  getConstants() {

    const categories = {
      'Raspberry Pi': ['Boards', 'Accessories', 'Miscellaneous'],

      Microcontrollers: ['Arduino Boards', 'TI Boards', 'Miscellaneous'],

      'Power Sources': [
        '9V Batteries',
        'Lead Acid Batteries',
        'Lithium Ion Batteries',
        'Solar Cells and Panels',
        'Holders and Connectors',
        'Chargers and Adaptors',
        'Miscellaneous'
      ],

      Relays: [
        'Electromagnetic Relays',
        'Solid State Relays',
        'Hybrid Relays',
        'Thermal Relays',
        'Reed Relays',
        'Miscellaneous'
      ],

      Sensors: [
        'Accelerometers',
        'Camera',
        'Current Sensors',
        'Direction Sensors',
        'Distance Sensors',
        'Fingerprint Sensors',
        'Flex/Force Sensors',
        'Gas Sensors',
        'Grove Sensors',
        'Gyro Sensors',
        'IR And PIR Sensors',
        'Light Sensors',
        'Magnetic/RPM Sensors',
        'Temperature Sensors',
        'Humidity Sensors',
        'Miscellaneous'
      ],

      Displays: ['LCD Displays', 'LED Displays', 'LED Lights', 'Miscellaneous'],

      Motors: [
        'BLDC Motors',
        'General Purpose DC Motors',
        'Servo Motors',
        'High Torque DC Motors',
        'Motor Driver Boards',
        'Motor Blades and Attachments',
        'Miscellaneous'
      ],

      Modules: [
        'RTC Modules',
        'Audio Modules',
        'Bluetooth Modules',
        'GPS Module',
        'GSM Modules',
        'RFID Module',
        'RF Modules',
        'WiFi Modules',
        'ZIGBEE/XBEE Modules',
        'Miscellaneous'
      ],

      Tools: [
        'Breadboards',
        'General Purpose Zero PCBs',
        'Soldering Tools',
        'Mechanical Tools',
        'Meters and Testers',
        'Jumper Cables',
        'Berg Strips',
        'IC Holders',
        'Miscellaneous'
      ],

      'Consumer Electronics': [
        'Laptops',
        'Phones',
        'Phone Cases',
        'CDs',
        'Desk Lamps',
        'Table Fans',
        'USB/Bluetooth Mouses',
        'Computer Cables',
        'Cable Ties',
        'Miscellaneous'
      ]
    };

    db.collection('Constants')
      .doc('Categories')
      .set(categories);
  }

  saveUserDetailsAndProceed(userDetails, uid) {
    this.props.setUserDetails(userDetails, uid);
    //  this.props.history.push('/main');
  }

  logout() {
    firebase
      .auth()
      .signOut()
      .then(() => {
        // Sign-out successful.
        this.props.history.push('/login');
      })
      .catch(() => {
        // An error happened.
      });
  }

  defaultContent() {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Header className="header">
          <div className="logo" />
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['1']}
            selectedKeys={this.props.selectedTab}
            style={{ lineHeight: '64px' }}
          >
            <Menu.Item key="1">
              <Link to="/main/market">Home</Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to="/main/sell">Sell</Link>
            </Menu.Item>
            <Menu.Item key="3">
              <Link to="/main/account">My Account</Link>
            </Menu.Item>

            <Menu.Item onClick={this.logout} style={{ float: 'right' }} key="4">
              Logout
            </Menu.Item>
          </Menu>
        </Header>
        <Content style={{ padding: '0 50px' }}>
          <Switch>
            {mainRoutes.map((route, key) => {
              if (route.redirect) return <Redirect from={route.path} to={route.pathTo} key={key} />;

              return <Route path={route.path} component={route.component} />;
            })}
          </Switch>
        </Content>
        <Footer style={{ textAlign: 'center' }}>E-Hub Footer</Footer>
      </Layout>
    );
  }

  mobileContent() {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Header style={{ padding: '0px' }} className="header">
          <div className="logo" />
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['1']}
            selectedKeys={this.props.selectedTab}
            style={{ lineHeight: '64px' }}
          >
            <Menu.Item key="1">
              <Link to="/main/market">Home</Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to="/main/sell">Sell</Link>
            </Menu.Item>
            <Menu.Item key="3">
              <Link to="/main/account">My Account</Link>
            </Menu.Item>

            <Menu.Item onClick={this.logout} style={{ float: 'right' }} key="4">
              Logout
            </Menu.Item>
          </Menu>
        </Header>
        <Content style={{ padding: '0 5px' }}>
          <Switch>
            {mainRoutes.map((route, key) => {
              if (route.redirect) return <Redirect from={route.path} to={route.pathTo} key={key} />;
              return <Route path={route.path} component={route.component} />;
            })}
          </Switch>
        </Content>
        <Footer style={{ textAlign: 'center' }}>E-Hub Footer</Footer>
      </Layout>
    );
  }

  render() {
    const { mainLoading } = this.state;
    return (
      <React.Fragment>
        {mainLoading ? (
          <Layout style={{ backgroundColor: '#ffffff' }}>
            <Row style={{ minHeight: '100vh' }} type="flex" justify="center" align="middle">
              <Spin size="large" />
            </Row>
          </Layout>
        ) : (
          <React.Fragment>
            <Mobile>{this.mobileContent()}</Mobile>
            <Default>{this.defaultContent()}</Default>
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}

MainPage.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  classes: PropTypes.object.isRequired
};
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setUserDetails
    },
    dispatch
  );

const mapStateToProps = state => ({
  selectedTab: state.main.selectedTab
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(MainPage)
);
