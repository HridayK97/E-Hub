/* eslint-disable react/destructuring-assignment */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
// core components
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from '../../config/config'
import { Button } from 'antd';
import { Layout } from 'antd';
import { Row, Col } from 'antd';
import { Card } from 'antd';
import { setUserDetails } from '../../reducers/main'
import LoginForm from '../..//views/LoginViews/LoginForm.jsx';

const { Meta } = Card;
const {
  Header, Footer, Sider, Content,
} = Layout;
const gridStyle = {
  width: '100%',
  textAlign: 'left',
};



//  Initalize firestore reference
const db = firebase.firestore();


class LoginPage extends React.Component {
  constructor(props) {
    super(props);

    this.state={
      showLoginForm:false,
    }

    this.uiConfig = {
      // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
      signInFlow: 'popup',
      // signInSuccessUrl: '/pages/initial-page', // We will display Google as auth provider.
      signInOptions: [
        {
          provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
          // signInSuccessUrl: '/initial-page',
        },
      ],
      callbacks: {
        // This is called upon successful login // 'audio' // 'invisible' or 'compact' // ' bottomright' or 'inline' applies to invisible.
        signInSuccessWithAuthResult:(authResult)=> {
          const user = authResult.user;
          this.setState({showLoginForm:true})
          //  this.saveUserDetailsAndProceed(user);
          console.log(authResult)
          return true;
        },
      },
    };

    this.saveUserDetailsAndProceed = this.saveUserDetailsAndProceed.bind(this);
  }

  
  
  
  componentDidMount() {
    const user = firebase.auth().currentUser;
    if(user){
      this.saveUserDetailsAndProceed(user);
    }
    else{

    }

  }

  saveUserDetailsAndProceed(user){
    this.props.setUserDetails({},user.uid);
    this.props.history.push('/main')
  }

  render() {

    const { showLoginForm } = this.state;
    return (
      <Layout style={{minHeight:'100vh',backgroundColor:'#ffffff'}}>
      <Row type="flex" justify="center" align="middle">
      
      {true?
        <Col xs={23} md={14} lg={10}>
        
    <Row style={{marginTop:'100px'}}>
    <Col xs={24}>
    <h1 style={{textAlign: 'center'}} >Welcome! Complete your Sign Up.</h1>
    </Col>
    <Col xs={24}>
        <LoginForm/>
        </Col>
      </Row>
        </Col>
    :
    <Col xs={20} md={12} lg={8}>
    <Card
      style={{marginTop:'100px'}}
      title="Login to E-Hub"
    >
    
    <StyledFirebaseAuth uiConfig={this.uiConfig} firebaseAuth={firebase.auth()}/>

    </Card>
    </Col>
    
      }
      
        
      </Row>
    </Layout>

      
      
    );
  }
}

LoginPage.propTypes = {
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

export default connect(null,mapDispatchToProps)(LoginPage);


// <Row style={{height:'1000px'}} type="flex" justify="space-around" align="middle">
//       <Col xs ={6}>
//       <Card
//       hoverable
//       style={{ width: 240 }}
//       cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
//     >
//       <Meta
//         title="Europe Street beat"
//         description="www.instagram.com"
//       />
//     </Card>
//     </Col>
//       <Col xs={12}>
//       <Card
//       hoverable
//       style={{ width: 240 }}
//       cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
//     >
//       <Meta
//         title="Europe Street beat"
//         description="www.instagram.com"
//       />
//     </Card>
//     </Col>
//     </Row>