import React, { Component }  from 'react';
import ReactDOM from 'react-dom';
import AppHeader from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import { Layout } from 'antd';
const { Header, Footer, Sider, Content } = Layout;

class AppLayout extends Component {
	render() {
		return (
			<div>
			    <Layout>
					<AppHeader />
					<Content>Content</Content>
					<Footer className="App-footer">Footer</Footer>
			    </Layout>
			</div>
		);
	}
}

ReactDOM.render(<AppLayout />, document.getElementById('header'));
registerServiceWorker();
