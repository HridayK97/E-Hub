/* eslint-disable react/destructuring-assignment */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from "react-router";
import { bindActionCreators } from "redux";
// core components
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from '../config/config'
import { Button } from 'antd';
import { Layout } from 'antd';
import { Row, Col } from 'antd';
import { Card } from 'antd';
import { Spin, Popconfirm } from 'antd';
import {
  Menu, Breadcrumb, Icon,
} from 'antd'
import { setUserDetails } from './../reducers/main';

const { SubMenu } = Menu;
const {
  Header, Content, Footer, Sider,
} = Layout;


const { Meta } = Card;

//  Initalize firestore reference
const db = firebase.firestore();

class MainPage extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      mainLoading:false,
    }
    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    this.setState({mainLoading:true})
    firebase.auth().onAuthStateChanged((user)=> {
      if (user) {
        db.collection('Users').doc(user.uid).get()
          .then(doc=>{
            if(doc.exists){
              this.saveUserDetailsAndProceed(doc.data(),doc.id);
              this.setState({mainLoading:false})
          }
            else {
              this.setState({mainLoading:false})
              this.props.history.push('/login');
            }
          })
      } else {
        this.setState({mainLoading:false})
        this.props.history.push('/login')
        // No user is signed in.
      }
    });
  }
  saveUserDetailsAndProceed(userDetails,uid){
    this.props.setUserDetails(userDetails,uid);
    this.props.history.push('/main')
  }

  logout(){
    firebase.auth().signOut().then(() => {
      // Sign-out successful.
      this.props.history.push('/login')
    }).catch(function(error) {
      // An error happened.
    });
  }

  render() {

    const { mainLoading } = this.state;
    return (
      <React.Fragment>
      {mainLoading?
      <Layout style={{backgroundColor:'#ffffff'}}>
      <Row style={{minHeight:'100vh'}} type="flex" justify="center" align="middle">
      <Spin size="large" />
      </Row>
      </Layout>
      :
      <Layout style={{height:"100vh"}}>
    <Header className="header">
      <div className="logo" />
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={['2']}
        style={{ lineHeight: '64px' }}
      >
        <Menu.Item key="1">Home</Menu.Item>
        <Menu.Item key="2">Sell</Menu.Item>
        <Menu.Item key="3">My Profile</Menu.Item>
        
        <Menu.Item onClick={this.logout} style={{float:'right'}} key="4">Logout</Menu.Item>
      
      </Menu>
    </Header>
    <Content style={{ padding: '0 50px' }}>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>List</Breadcrumb.Item>
        <Breadcrumb.Item>App</Breadcrumb.Item>
      </Breadcrumb>
      <Layout style={{ padding: '24px 0', background: '#fff' }}>
        <Sider width={200} style={{ background: '#fff' }}>
          <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            style={{ height: '100%' }}
          >
            <SubMenu key="sub1" title={<span><Icon type="user" />subnav 1</span>}>
              <Menu.Item key="1">option1</Menu.Item>
              <Menu.Item key="2">option2</Menu.Item>
              <Menu.Item key="3">option3</Menu.Item>
              <Menu.Item key="4">option4</Menu.Item>
            </SubMenu>
            <SubMenu key="sub2" title={<span><Icon type="laptop" />subnav 2</span>}>
              <Menu.Item key="5">option5</Menu.Item>
              <Menu.Item key="6">option6</Menu.Item>
              <Menu.Item key="7">option7</Menu.Item>
              <Menu.Item key="8">option8</Menu.Item>
            </SubMenu>
            <SubMenu key="sub3" title={<span><Icon type="notification" />subnav 3</span>}>
              <Menu.Item key="9">option9</Menu.Item>
              <Menu.Item key="10">option10</Menu.Item>
              <Menu.Item key="11">option11</Menu.Item>
              <Menu.Item key="12">option12</Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        <Content style={{ padding: '0 24px', minHeight: 280 }}>
          Content
        </Content>
      </Layout>
    </Content>
    <Footer style={{ textAlign: 'center' }}>
      E-Hub Footer
    </Footer>
  </Layout>

    }
    </React.Fragment>
      
    );
  }
}

MainPage.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  classes: PropTypes.object.isRequired,
};
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
     setUserDetails
    },
    dispatch
  );

const mapStateToProps = state => ({
  
});

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(MainPage));