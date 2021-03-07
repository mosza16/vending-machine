import { Layout, Menu, Breadcrumb, Button } from 'antd';
import OneSignal, { useOneSignalSetup } from 'react-onesignal';
import { useLocation } from 'react-router-dom';
import './index.css';
const { Header, Content } = Layout;

function AdminVendingMachineManagement(props) {
  // set notification
  useOneSignalSetup(async () => {
    const externalUserId = localStorage.getItem(
      'vending_machine_admin_onesignal_user_id'
    );
    OneSignal.registerForPushNotifications();
    await OneSignal.setExternalUserId(externalUserId);
  });
  const location = useLocation();

  const onClickLogout = async () => {
    const externalUserId = localStorage.getItem(
      'vending_machine_admin_onesignal_user_id'
    );
    await OneSignal.removeExternalUserId(externalUserId);

    localStorage.removeItem('vending_machine_admin_onesignal_user_id');
    localStorage.removeItem('vending_machine_admin_session_id');

    window.location.href = '/login';
  };

  return (
    <Layout className="layout">
      <Header>
        <Menu theme="dark" mode="horizontal" selectedKeys={[location.pathname]}>
          <Menu.Item key="/vending-machine/locations">Locations</Menu.Item>
          <Button
            type="primary"
            style={{ float: 'right', margin: '16px 0px 16px 0px' }}
            onClick={onClickLogout}
          >
            Logout
          </Button>
        </Menu>
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
