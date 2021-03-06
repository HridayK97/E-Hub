/* eslint-disable react/destructuring-assignment */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Redirect, Switch, Route, Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { Layout, Row, Spin, Menu, Modal } from 'antd';
import Responsive from 'react-responsive';
import { setUserDetails, setCategories } from '../reducers/main';
import AdminPage from './Admin/AdminPage';
import mainRoutes from '../routes/mainRoutes';
import firebase from '../config/config';
import logo from '../assets/images/logo.png';

const Mobile = props => <Responsive {...props} maxWidth={767} />;
const Default = props => <Responsive {...props} minWidth={768} />;

const { Header, Content, Footer } = Layout;
const { confirm } = Modal;
const { SubMenu } = Menu;

//  Initalize firestore reference
const db = firebase.firestore();

class MainPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mainLoading: true
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

              //  Run code here
              // db.collection('Items').get().then(snapshot=>{
              //   snapshot.forEach(doc=>{
              //     db.collection('Items').doc(doc.id).update({deleted:false})
              //   })
              // })
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
    db.collection('Constants')
      .doc('Categories')
      .get()
      .then(doc => {
        const categories = doc.data();
        this.props.setCategories(categories);
        this.setState({ mainLoading: false });
      });
  }

  saveUserDetailsAndProceed(userDetails, uid) {
    this.props.setUserDetails(userDetails, uid);
    //  this.props.history.push('/main');
  }

  logout() {
    confirm({
      title: 'Are you sure you want to logout?',
      content: '',
      onOk: () =>
        new Promise(resolve =>
          // setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
          firebase
            .auth()
            .signOut()
            .then(() => {
              // Sign-out successful.
              resolve();
              this.props.history.push('/login');
            })
            .catch(() => {
              // An error happened.
            })
        ),
      onCancel() {}
    });
  }

  defaultContent() {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Header className="header">
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['1']}
            selectedKeys={this.props.selectedTab}
            style={{ lineHeight: '64px' }}
          >
            <Menu.Item key="0">
              <a
                onClick={() => {
                  this.props.history.push('/main/landing');
                }}
              >
                <img
                  style={{
                    height: 60,
                    width: 84
                  }}
                  src={logo}
                />
              </a>
            </Menu.Item>

            <SubMenu title={<span className="submenu-title-wrapper">Market Place</span>}>
              <Menu.Item key="1">
                <Link to="/main/market">Buy</Link>
              </Menu.Item>
              <Menu.Item key="2">
                <Link to="/main/sell">Sell</Link>
              </Menu.Item>
            </SubMenu>

            <SubMenu title={<span className="submenu-title-wrapper">Project Forums</span>}>
              <Menu.Item key="5">
                <Link to="/main/forums">All Forums</Link>
              </Menu.Item>
              <Menu.Item key="7">
                <Link to="/main/forums">My Forums</Link>
              </Menu.Item>
            </SubMenu>
            {this.props.userDetails.isAdmin && (
              <Menu.Item key="6">
                <Link to="/main/admin">Admin</Link>
              </Menu.Item>
            )}

            <Menu.Item onClick={this.logout} style={{ float: 'right' }} key="4">
              Logout
            </Menu.Item>
            <Menu.Item style={{ float: 'right' }} key="3">
              <Link to="/main/account">My Account</Link>
            </Menu.Item>
          </Menu>
        </Header>
        <Content style={{ padding: '0 50px' }}>
          <Switch>
            {this.props.userDetails.isAdmin && <Route path="/main/admin" component={AdminPage} />}
            {mainRoutes.map((route, key) => {
              if (route.redirect) return <Redirect from={route.path} to={route.pathTo} key={key} />;

              return <Route path={route.path} component={route.component} />;
            })}
          </Switch>
        </Content>
        <Footer style={{ backgroundColor: '#001529', textAlign: 'center' }}>
          <span style={{ color: '#fff' }}>E-Hub © Venture by Philip Mathew and Hriday Kaju</span>
        </Footer>
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
            <Menu.Item key="0">
              <a
                onClick={() => {
                  this.props.history.push('/main/landing');
                }}
              >
                <img
                  style={{
                    height: 60,
                    width: 84
                  }}
                  src={logo}
                />
              </a>
            </Menu.Item>
            <SubMenu title={<span className="submenu-title-wrapper">Market</span>}>
              <Menu.Item key="1">
                <Link to="/main/market">Buy</Link>
              </Menu.Item>
              <Menu.Item key="2">
                <Link to="/main/sell">Sell</Link>
              </Menu.Item>
            </SubMenu>

            <SubMenu title={<span className="submenu-title-wrapper">Forums</span>}>
              <Menu.Item key="5">
                <Link to="/main/forums">All Forums</Link>
              </Menu.Item>
              <Menu.Item key="7">
                <Link to="/main/forums">My Forums</Link>
              </Menu.Item>
            </SubMenu>

            <Menu.Item key="3">
              <Link to="/main/account">My Account</Link>
            </Menu.Item>
            <Menu.Item onClick={this.logout} key="4">
              Logout
            </Menu.Item>
          </Menu>
        </Header>
        <Content style={{ padding: '0 0px' }}>
          <Switch>
            {mainRoutes.map((route, key) => {
              if (route.redirect) return <Redirect from={route.path} to={route.pathTo} key={key} />;
              return <Route path={route.path} component={route.component} />;
            })}
          </Switch>
        </Content>
        <Footer style={{ backgroundColor: '#001529', textAlign: 'center' }}>
          <span style={{ color: '#fff' }}>E-Hub © Venture by Philip Mathew and Hriday Kaju</span>
        </Footer>
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
      setUserDetails,
      setCategories
    },
    dispatch
  );

const mapStateToProps = state => ({
  selectedTab: state.main.selectedTab,
  userDetails: state.main.userDetails
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(MainPage)
);
