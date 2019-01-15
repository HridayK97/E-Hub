/* eslint-disable react/destructuring-assignment */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// core components
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from '../config/config'
import { Button } from 'antd';
import { Layout } from 'antd';
import { Row, Col } from 'antd';
import { Card } from 'antd';

const { Meta } = Card;
const {
  Header, Footer, Sider, Content,
} = Layout;

//  Initalize firestore reference
const db = firebase.firestore();


class LoginPage extends React.Component {
  constructor(props) {
    super(props);
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
          this.props.history.push('/main')
          console.log('SIGNED IN')
          return true;
        },
      },
    };
  }

  
  

  componentDidMount() {
    console.log('HELLo')
  }

  render() {
    return (
      <Layout>
      <Row style={{height:"100vh"}} type="flex" justify="center" align="middle">
      <Col xs ={12}>
      <StyledFirebaseAuth uiConfig={this.uiConfig} firebaseAuth={firebase.auth()}/>
        </Col>
      </Row>
    </Layout>

      
      
    );
  }
}

LoginPage.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  
});

export default connect(mapStateToProps)(LoginPage);


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