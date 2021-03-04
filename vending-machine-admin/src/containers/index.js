import { Layout, Menu, Breadcrumb } from 'antd';
import OneSignal, { useOneSignalSetup } from 'react-onesignal';
import './index.css';
import VendingMachineMapPage from './VendingMachineMapPage';
const { Header, Content } = Layout;

function Containers() {
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
      <Header>
        <div className="logo" />
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
          <Menu.Item key="1">Home</Menu.Item>
          <Menu.Item key="2" active={true}>
            Map
          </Menu.Item>
        </Menu>
      </Header>
      <Content style={{ padding: '0 50px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Vending Machines Map</Breadcrumb.Item>
        </Breadcrumb>
        <div className="site-layout-content">
          <VendingMachineMapPage></VendingMachineMapPage>
        </div>
      </Content>
    </Layout>
  );
}

export default Containers;
