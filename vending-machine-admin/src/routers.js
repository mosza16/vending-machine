import { Result } from 'antd';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from 'react-router-dom';
import VendingMachineLocationPage from './containers/AdminVendingMachineManagement/VendingMachineLocationPage';
import AdminVendingMachineManagement from './containers/AdminVendingMachineManagement';
import LoginPage from './containers/LoginPage';

function renderAdminRouters() {
  return (
    <Route path="/vending-machine/*" exact>
      <AdminVendingMachineManagement>
        <Switch>
          <Route path="/vending-machine/locations" exact>
            <VendingMachineLocationPage />
          </Route>
          <Route>
            <Redirect to="/404"></Redirect>
          </Route>
        </Switch>
      </AdminVendingMachineManagement>
    </Route>
  );
}

function Routers() {
  return (
    <Router>
      <Switch>
        {renderAdminRouters()}
        <Route path="/404" exact>
          <Result
            status="404"
            title="404"
            subTitle="Sorry, the page you visited does not exist."
          />
        </Route>
        <Route path="/login">
          <LoginPage />
        </Route>
        <Route>
          <Redirect to="/404"></Redirect>
        </Route>
      </Switch>
    </Router>
  );
}

export default Routers;
