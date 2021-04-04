import './App.css';
import { Layout } from 'antd';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Home from "./pages/home/index";
import Crypto from "./pages/crypto/index";
import Post from "./pages/post/index";
const { Header, Footer, Content } = Layout;

function App() {
  return (
    <Router>
      <Layout>
        <Content>
          <Switch>
            <Route path="/post">
              <Post />
            </Route>
            <Route path="/crypto">
              <Crypto />
            </Route>
            <Route path="/">
              <Header>Header</Header>
              <Home />
            </Route>
          </Switch>
        </Content>
        <Footer>Footer</Footer>
      </Layout>
    </Router>
  );
}

export default App;
