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
  Button,
  Form,
  Input,
  Cascader,
  Checkbox,
  InputNumber,
  Upload,
  message
} from 'antd';
import Responsive from 'react-responsive';
import { setUserDetails, setSelectedTab } from '../../reducers/main';
import firebase from '../../config/config';

const Mobile = props => <Responsive {...props} maxWidth={767} />;
const Default = props => <Responsive {...props} minWidth={768} />;

const { Dragger } = Upload;
const { TextArea } = Input;
const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;

//  Initalize firestore reference
const db = firebase.firestore();

class MarketView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mainLoading: false,
      submitLoading: false,
      itemName: '',
      itemDescription: '',
      category: [],
      sellCheck: false,
      rentCheck: false,
      sellPrice: null,
      rentPrice: null,
      fileList: [],
      uploadDisabled: false,
      itemNameStatus: 'success',
      itemDescriptionStatus: 'success',
      categoryStatus: 'success',
      sellPriceStatus: 'success',
      rentPriceStatus: 'success',
      sellOptionsStatus: 'success',
      imageStatus: 'success',

      options: [
        {
          value: 'Category 1',
          label: 'Category 1',
          children: [
            {
              value: 'SubCategory 1',
              label: 'SubCategory 1'
            },
            {
              value: 'SubCategory 2',
              label: 'SubCategory 2'
            }
          ]
        },
        {
          value: 'Category 2',
          label: 'Category 2',
          children: [
            {
              value: 'SubCategory 3',
              label: 'SubCategory 3'
            },
            {
              value: 'SubCategory 4',
              label: 'SubCategory 4'
            }
          ]
        }
      ]
    };

    this.onChangeText = this.onChangeText.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChangeCategory = this.onChangeCategory.bind(this);
    this.onChangeCheck = this.onChangeCheck.bind(this);
    this.onChangeNumber = this.onChangeNumber.bind(this);
    this.onChangeFile = this.onChangeFile.bind(this);
  }

  componentDidMount() {
    this.props.setSelectedTab(['2']);
    this.setState({ mainLoading: true });
    this.formatCategoriesToOptions();
  }

  formatCategoriesToOptions() {
    const { categories } = this.props;

    console.log(categories);

    const options = Object.keys(categories).map(category => {
      const obj = {};
      obj.value = category;
      obj.label = category;
      obj.children = categories[category].map(subcategory => {
        const obj2 = {};
        obj2.value = subcategory;
        obj2.label = subcategory;
        return obj2;
      });

      return obj;
    });

    this.setState({ options });
    console.log(options);
  }

  onChangeText(ev, stateName) {
    this.setState({ [stateName]: ev.target.value });
  }

  onChangeCategory(value) {
    console.log(value);
    this.setState({ category: value });
  }

  onChangeCheck(ev, stateName) {
    console.log(ev.target.checked);
    this.setState({ [stateName]: ev.target.checked });
  }

  onChangeNumber(value, stateName) {
    console.log(value);
    this.setState({ [stateName]: value });
  }

  onChangeFile(data) {
    const { file, fileList, event } = data;
    console.log(file, fileList, event);
    console.log('length', fileList.length);
    if (fileList.length === 1) this.setState({ file, uploadDisabled: true });
    else if (fileList.length === 0) this.setState({ file: undefined, uploadDisabled: false });
  }

  validateFields() {
    const {
      itemName,
      itemDescription,
      category,
      sellCheck,
      rentCheck,
      sellPrice,
      rentPrice,
      file
    } = this.state;
    let valid = true;
    if (itemName.length < 2) {
      valid = false;
      this.setState({ itemNameStatus: 'error' });
    } else {
      this.setState({ itemNameStatus: 'success' });
    }

    if (itemDescription.length < 10) {
      valid = false;
      this.setState({ itemDescriptionStatus: 'error' });
    } else {
      this.setState({ itemDescriptionStatus: 'success' });
    }

    if (category.length < 1) {
      valid = false;
      this.setState({ categoryStatus: 'error' });
    } else {
      this.setState({ categoryStatus: 'success' });
    }

    if (!sellCheck && !rentCheck) {
      valid = false;
      this.setState({ sellOptionsStatus: 'error' });
    } else if (sellCheck && sellPrice <= 0) {
      valid = false;
      this.setState({ sellOptionsStatus: 'error' });
    } else if (rentCheck && rentPrice <= 0) {
      valid = false;
      this.setState({ sellOptionsStatus: 'error' });
    } else {
      this.setState({ sellOptionsStatus: 'success' });
    }

    if (!file) {
      valid = false;
      this.setState({ imageStatus: 'error' });
    } else {
      this.setState({ imageStatus: 'success' });
    }

    return valid;
  }

  handleSubmit() {
    if (this.validateFields()) {
      this.setState({ submitLoading: true });
      const { uid } = this.props;
      const {
        itemName,
        itemDescription,
        category,
        sellCheck,
        rentCheck,
        sellPrice,
        rentPrice,
        file
      } = this.state;

      db.collection('Items')
        .add({
          itemName,
          itemDescription,
          sellCheck,
          rentCheck,
          sellPrice,
          rentPrice,
          category: category[0],
          subcategory: category[1] ? category[1] : '', // In the case of miscellaneous, there is no subcategory
          createdAt: new Date()
        })
        .then(() => {
          this.setState({ submitLoading: false });
          message.success('Submitted successfully.');
        });
    }
  }

  defaultContent() {
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      }
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0
        },
        sm: {
          span: 16,
          offset: 8
        }
      }
    };

    const props2 = {
      action: '//jsonplaceholder.typicode.com/posts/',
      listType: 'picture',
      className: 'upload-list-inline'
    };

    const {
      itemName,
      itemNameStatus,
      itemDescription,
      itemDescriptionStatus,
      submitLoading,
      category,
      categoryStatus,
      sellOptionsStatus,
      sellCheck,
      rentCheck,
      sellPrice,
      rentPrice,
      imageStatus,
      fileList,
      uploadDisabled
    } = this.state;
    return (
      <React.Fragment>
        <Layout style={{ margin: '16px 0', padding: '24px 0', background: '#fff' }}>
          <Content style={{ padding: '0 24px', minHeight: 280 }}>
            <Row>
              <Col xs={24} sm={18} md={18}>
                <Form>
                  <h1>Enter Item Details</h1>

                  <Form.Item
                    {...formItemLayout}
                    label="Item Name"
                    required
                    validateStatus={itemNameStatus}
                    help={
                      itemNameStatus !== 'success'
                        ? 'Item Name should be at least two characters.'
                        : ''
                    }
                  >
                    <Input value={itemName} onChange={ev => this.onChangeText(ev, 'itemName')} />
                  </Form.Item>
                  <Form.Item
                    required
                    {...formItemLayout}
                    label="Item Description"
                    validateStatus={itemDescriptionStatus}
                    help={itemDescriptionStatus !== 'success' ? 'Invalid Description' : ''}
                  >
                    <TextArea
                      value={itemDescription}
                      onChange={ev => this.onChangeText(ev, 'itemDescription')}
                      rows={4}
                    />
                  </Form.Item>

                  <Form.Item
                    required
                    {...formItemLayout}
                    label="Category"
                    validateStatus={categoryStatus}
                    help={categoryStatus !== 'success' ? 'Invalid Category' : ''}
                  >
                    <Cascader
                      options={this.state.options}
                      value={category}
                      onChange={this.onChangeCategory}
                      placeholder="Please select"
                    />
                  </Form.Item>

                  <Form.Item
                    required
                    {...formItemLayout}
                    label="Sell Options"
                    validateStatus={sellOptionsStatus}
                    help={sellOptionsStatus !== 'success' ? 'Select at least one.' : ''}
                  >
                    <Checkbox
                      checked={sellCheck}
                      onChange={ev => this.onChangeCheck(ev, 'sellCheck')}
                    >
                      Sell
                    </Checkbox>
                    <InputNumber
                      min={0}
                      onChange={value => this.onChangeNumber(value, 'sellPrice')}
                      value={sellPrice}
                      style={{ marginLeft: 6 }}
                      disabled={!sellCheck}
                      defaultValue={0}
                    />{' '}
                    Rs
                    <br />
                    <Checkbox
                      checked={rentCheck}
                      onChange={ev => this.onChangeCheck(ev, 'rentCheck')}
                    >
                      Rent
                    </Checkbox>
                    <InputNumber
                      min={0}
                      onChange={value => this.onChangeNumber(value, 'rentPrice')}
                      value={rentPrice}
                      disabled={!rentCheck}
                      defaultValue={0}
                    />{' '}
                    Rs
                  </Form.Item>
                  <Form.Item
                    required
                    {...formItemLayout}
                    label="Image"
                    validateStatus={imageStatus}
                    help={imageStatus !== 'success' ? 'Upload Image' : ''}
                  >
                    <Upload disabled={uploadDisabled} onChange={this.onChangeFile} {...props2}>
                      <Button>
                        <Icon type="upload" /> Upload
                      </Button>
                    </Upload>
                  </Form.Item>

                  <Form.Item {...tailFormItemLayout}>
                    {submitLoading ? (
                      <Spin size="large" />
                    ) : (
                      <Button onClick={this.handleSubmit} type="primary" htmlType="submit">
                        Submit
                      </Button>
                    )}
                  </Form.Item>
                </Form>
              </Col>
            </Row>
          </Content>
        </Layout>
      </React.Fragment>
    );
  }

  mobileContent() {
    return (
      <React.Fragment>
        <Layout style={{ margin: '16px 0', padding: '24px 0', background: '#fff' }}>
          <Content style={{ padding: '0 24px', minHeight: 280 }} />
        </Layout>
      </React.Fragment>
    );
  }

  render() {
    const { mainLoading } = this.state;
    return <React.Fragment>{this.defaultContent()}</React.Fragment>;
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

const mapStateToProps = state => ({
  uid: state.main.uid,
  categories: state.main.categories
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(MarketView)
);
