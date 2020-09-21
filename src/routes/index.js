import React from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import './styles.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Dashboard from './dashboard'
import Movies from './movies'
import Inning from './inning'

const { Header, Sider, Content } = Layout;

function App() {
  return (
    <Router>
      <Layout style={{ height: '100%'}}>
        <Header className="header">
          <div>
           <div>
             <div className="logo" />
             <h2 style={{ color: 'white'}}>Evaluación  OPS</h2>
           </div>
          </div>
        </Header>
        <Layout>
          <Sider width={200} className="site-layout-background">
            <Menu
              mode="inline"
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1']}
              style={{ height: '100%', borderRight: 0 }}
            >
              <Menu.Item key="dashboard">
                <Link to="/">Dashboard</Link>
              </Menu.Item>
              <Menu.Item key="movies">
                <Link to="/movies">Pel&iacute;culas</Link>
              </Menu.Item>
              <Menu.Item key="inning">
                <Link to="/inning">Turnos</Link>
              </Menu.Item>
              <Menu.Item key="administrators">Administradores</Menu.Item>
              <Menu.Item key="perfil">Pefil</Menu.Item>
              <Menu.Item key="logout">Cerrar sesi&oacute;n</Menu.Item>
            </Menu>
          </Sider>
          <Layout style={{ height: '100%', padding: '0 24px 24px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item>List</Breadcrumb.Item>
              <Breadcrumb.Item>App</Breadcrumb.Item>
            </Breadcrumb>
            <Content
              className="site-layout-background"
              style={{
                padding: 24,
                margin: 0,
                minHeight: 280,
              }}
            >
              <Switch>
                <Route path="/movies">
                  <Movies />
                </Route>
                <Route path="/inning">
                  <Inning />
                </Route>
                <Route path="/">
                  <Dashboard />
                </Route>
              </Switch>
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </Router>
  );
}


export default App;
