import React, { Component } from 'react'

import { Form, Icon, Input, Button } from 'antd';

const FormItem = Form.Item;

class GetIn extends Component {
  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
      if (!values.username || !values.code) {
        return
      }
      f_Request('/getIn', {
        username: values.username,
        code: values.code
      })
      .then(data => {
        console.log(data)
        this.props.form.validateFields(['name'])
        if (data) {
          window.location.reload()
        }
      })
    });
  }

  render() {
    const { getFieldDecorator, getFieldValue } = this.props.form;
    return (
      <div className="getIn-wrapper" style={{width: '60%', margin: '100px auto'}}>
        Tell me who you are:
        <Form onSubmit={this.handleSubmit.bind(this)} className="getIn-form">
          <FormItem>
            {getFieldDecorator('username', {
              rules: [{ required: true, message: 'Tell me who you are!' }],
            })(
              <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="name or nick name" />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('code', {
              rules: [{ required: true, message: 'This will identify you, and it is required!' }],
            })(
              <Input prefix={<Icon type="gift" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="unique code" />
            )}
          </FormItem>
          <FormItem>
            <Button type="primary" htmlType="submit" className="getIn-form-button">
              getIn
            </Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}

export default Form.create()(GetIn);