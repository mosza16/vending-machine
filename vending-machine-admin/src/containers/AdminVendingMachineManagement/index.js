import { Layout, Menu, Breadcrumb, Button } from 'antd';
import OneSignal, { useOneSignalSetup } from 'react-onesignal';
import { useLocation } from 'react-router-dom';
import { useMutation, gql } from '@apollo/client';
import './index.css';
const { Header, Content } = Layout;

const LOGOUT = gql`
  mutation Logout {
    logout
  }
`;
function AdminVendingMachineManagement(props) {
  const location = useLocation();
  const [logout] = useMutation(LOGOUT, {
    onCompleted: async () => {
      const externalUserId = localStorage.getItem(
        'vending_machine_admin_onesignal_user_id'
      );
      await OneSignal.removeExternalUserId(externalUserId);

      localStorage.removeItem('vending_machine_admin_onesignal_user_id');
      localStorage.removeItem('vending_machine_admin_session_id');
      window.location.href = '/login';
    },
  });
  // set notification
  useOneSignalSetup(async () => {
    const externalUserId = localStorage.getItem(
      'vending_machine_admin_onesignal_user_id'
    );
    OneSignal.registerForPushNotifications();
    await OneSignal.setExternalUserId(externalUserId);
  });

  return (
    <Layout className="layout">
      <Header style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={[location.pathname]}
          style={{ width: '90%' }}
        >
          <Menu.Item key="/vending-machine/locations">Locations</Menu.Item>
        </Menu>
        <Button
          type="primary"
          style={{ float: 'right', margin: '16px 0px 16px 0px' }}
          onClick={logout}
        >
          Logout
        </Button>
      </Header>
      <Content style={{ padding: '0 50px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Vending Machines Locations</Breadcrumb.Item>
        </Breadcrumb>
        <div className="site-layout-content">{props.children}</div>
      </Content>
    </Layout>
  );
}

export default AdminVendingMachineManagement;
