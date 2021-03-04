import { Layout, Menu, Breadcrumb } from 'antd';
import './index.css';
import VendingMachineMapPage from './VendingMachineMapPage';
const { Header, Content, Footer } = Layout;

export default () => (
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
