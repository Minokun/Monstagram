import React, { Component }  from 'react';
import ReactDOM from 'react-dom';
import AppHeader from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import { Layout } from 'antd';
const { Footer , Content } = Layout;



class AppLayout extends Component {
	render() {
		return (
			<div>
			    <Layout>
			    	{/* 页头 */}
					<AppHeader />
					{/* 列表展示页面 */}
					<Content className='App-content' >
				    	<div className='Photo-list'>Content</div>
				    </Content>
				    {/* 页脚 */}
				    <Footer style={{ textAlign: 'center' }}>
				    	Web Design ©2017 Created by MonstarLab Minok
				    </Footer>
			    </Layout>
			</div>
		);
	}
}

ReactDOM.render(<AppLayout />, document.getElementById('header'));
registerServiceWorker();
