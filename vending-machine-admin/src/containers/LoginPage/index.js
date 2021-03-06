import { useState } from 'react';
import { Form, Input, Button, Card, Alert } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useMutation, gql } from '@apollo/client';
import { useHistory } from 'react-router-dom';

const LOGIN = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      session
      userId
    }
  }
`;
function LoginPage() {
  const history = useHistory();
  const [isShowErrorUserNotFound, setShowErrorUserNotFound] = useState(false);
  const onFinish = (values) => {
    const { username, password } = values;
    login({ variables: { username, password } });
  };
  const onChange = () => {
    if (isShowErrorUserNotFound) {
      setShowErrorUserNotFound(false);
    }
  };

  const [login, { data, error }] = useMutation(LOGIN, {
    onCompleted: (data) => {
      const {
        login: { userId, session },
      } = data;
      localStorage.setItem('vending_machine_admin_onesignal_user_id', userId);
      localStorage.setItem('vending_machine_admin_session_id', session);

      history.push('/vending-machine/locations');
    },
    onError: (error) => {
      setShowErrorUserNotFound(true);
    },
  });

  return (
    <div
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        height: '100vh',
      }}
    >
      <Card style={{ width: 300 }}>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{}}
          onFinish={onFinish}
          onChange={onChange}
        >
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: 'Please input your Username!',
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username your email/phone"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your Password!',
              },
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              style={{ width: '100%' }}
            >
              Log in
            </Button>
            {isShowErrorUserNotFound ? (
              <Alert
                message="Invalid username/password"
                type="error"
                showIcon
                style={{ marginTop: '12px' }}
              />
            ) : (
              <></>
            )}
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}

export default LoginPage;
