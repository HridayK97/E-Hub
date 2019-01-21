/* eslint-disable react/destructuring-assignment */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// core components
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { Layout, Spin, Row, Col, Card } from 'antd';
import firebase from '../../config/config';
import { setUserDetails } from '../../reducers/main';
import LoginForm from './LoginForm.jsx';

//  Initalize firestore reference
const db = firebase.firestore();

class LoginPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showLoginForm: false,
      mainLoading: false,
      email:'',
    };

    this.uiConfig = {
      // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
      signInFlow: 'popup',
      // signInSuccessUrl: '/pages/initial-page', // We will display Google as auth provider.
      signInOptions: [
        {
          provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID
          // signInSuccessUrl: '/initial-page',
        }
      ],
      callbacks: {
        // This is called upon successful login // 'audio' // 'invisible' or 'compact' // ' bottomright' or 'inline' applies to invisible.
        signInSuccessWithAuthResult: authResult => {
          this.setState({ webuiLoading: true });
          const { user } = authResult;
          console.log(user);
          db.collection('Users')
            .doc(user.uid)
            .get()
            .then(doc => {
              if (doc.exists) this.saveUserDetailsAndProceed(doc.data(), doc.id);
              else {
                this.props.setUserDetails({}, user.uid);
                this.setState({ showLoginForm: true, webuiLoading: false, email:user.email });
              }
            });
          //  this.setState({showLoginForm:true})
          //  this.saveUserDetailsAndProceed(user);
          console.log(authResult);
          return false;
        }
      }
    };

    this.saveUserDetailsAndProceed = this.saveUserDetailsAndProceed.bind(this);
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
              this.setState({ mainLoading: false });
            } else {
              this.setState({ mainLoading: false });
            }
          });
      } else {
        this.setState({ mainLoading: false });
        // No user is signed in.
      }
    });
  }

  saveUserDetailsAndProceed(userDetails, uid) {
    this.props.setUserDetails(userDetails, uid);
    this.props.history.push('/main');
  }

  render() {
    const { showLoginForm, mainLoading, email } = this.state;
    return (
      <React.Fragment>
        {mainLoading ? (
          <Layout style={{ backgroundColor: '#ffffff' }}>
            <Row style={{ minHeight: '100vh' }} type="flex" justify="center" align="middle">
              <Spin size="large" />
            </Row>
          </Layout>
        ) : (
          <Layout style={{ minHeight: '100vh', backgroundColor: '#ffffff' }}>
            <Row type="flex" justify="center" align="middle">
              {showLoginForm ? (
                <Col xs={23} md={14} lg={10}>
                  <Row style={{ marginTop: '100px' }}>
                    <Col xs={24}>
                      <h1 style={{ textAlign: 'center' }}>Welcome! Complete your Sign Up.</h1>
                    </Col>
                    <Col xs={24}>
                      <LoginForm email={email} />
                    </Col>
                  </Row>
                </Col>
              ) : (
                <Col xs={20} md={12} lg={8}>
                  <Card style={{ marginTop: '100px' }} title="Login to E-Hub">
                    {this.state.webuiLoading ? (
                      <Spin />
                    ) : (
                      <StyledFirebaseAuth uiConfig={this.uiConfig} firebaseAuth={firebase.auth()} />
                    )}
                  </Card>
                </Col>
              )}
            </Row>
          </Layout>
        )}
      </React.Fragment>
    );
  }
}

LoginPage.propTypes = {
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
  uid: state.main.uid
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginPage);

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
