/* eslint-disable react/destructuring-assignment */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from "react-router";
import { bindActionCreators } from "redux";
// core components
import firebase from '../../config/config'
import { Button } from 'antd';
import { Layout } from 'antd';
import { Row, Col } from 'antd';
import { Spin } from 'antd';
import { Card } from 'antd';import { setUserDetails } from '../../reducers/main'
import {
  Form, Input, Tooltip, Icon, Cascader, Select, Checkbox, AutoComplete,
} from 'antd';
const { Option } = Select;
const AutoCompleteOption = AutoComplete.Option;


const { Meta } = Card;
const {
  Header, Footer, Sider, Content,
} = Layout;

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

//  Initalize firestore reference
const db = firebase.firestore();


class LoginForm extends React.Component {
  constructor(props) {
    super(props);

    this.state={
      name:'',
      number:'',
      nameStatus:'success',
      numberStatus:'success',
      registerLoading:false,
    }

    this.handleSubmit= this.handleSubmit.bind(this);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeNumber = this.onChangeNumber.bind(this);
    
  }

  
  
  
  componentDidMount() {
   

    }

    validateFields(){
      const { name,number }= this.state;
      let valid = true;
      if(name.length<2)
      {
        valid = false;
        this.setState({nameStatus:'error'});
      }
      else if(number.length!==10){
        valid = false;
        this.setState({numberStatus:'error'});
      }

      return valid;
    }

    handleSubmit(){
      if(this.validateFields()){
        this.setState({registerLoading:true})
        const uid =this.props.uid;
        const { name,number }= this.state;
        db.collection('Users').doc(uid).set({uid,name,number})
        .then(()=>{
          console.log('SUCCESS ADDED')
          this.props.history.push('/main')
        })
      }

    }

  onChangeName(ev){
    this.setState({name:ev.target.value})

  }
  onChangeNumber(ev){
    this.setState({number:ev.target.value})

  }
  render() {
    const { nameStatus, numberStatus, name, number, registerLoading } = this.state;

    const { getFieldDecorator } = this.props.form;
    const { autoCompleteResult } = this.state;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };
    const prefixSelector = getFieldDecorator('prefix', {
      initialValue: '86',
    })(
      <Select style={{ width: 0 }}>
        <Option value="86">+86</Option>
        <Option value="87">+87</Option>
      </Select>
    );


    return (
      
    
    <Form>
    <Form.Item
          
          {...formItemLayout}
          label="Name"
          required
          validateStatus={nameStatus}
          help={nameStatus!=='success'?'Name should be at least two characters.':''}
        >
            <Input value={name} onChange={this.onChangeName} />

        </Form.Item>
        <Form.Item
        required
          
          {...formItemLayout}
          label="Contact Number"
          validateStatus={numberStatus}
          help={numberStatus!=='success'?'Invalid Number':''}
        >
          
            <Input type='number' value={number} onChange={this.onChangeNumber} />
        </Form.Item>
      
        <Form.Item {...tailFormItemLayout}>
        {registerLoading?
          <Spin size="large" />
          :
          <Button onClick={this.handleSubmit} type="primary" htmlType="submit">Register</Button>
        }
        </Form.Item>
      </Form>
    );
  }
}

LoginForm.propTypes = {
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
  uid:state.main.uid,
  
});
const WrappedForm = Form.create({ name: 'customized_form_controls' })(LoginForm);

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(WrappedForm));


