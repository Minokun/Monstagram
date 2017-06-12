import React, { Component }  from 'react';
import ReactDOM from 'react-dom';
import AppHeader from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import { Icon , Layout } from 'antd';
import Praise from './Praise.js';
import Comment from './Comment.js';

const { Content } = Layout;



class AppLayout extends Component {
	render() {
		return (
			<div>
			    <Layout>
			    	{/* 页头 */}
					<AppHeader />
					{/* 列表展示页面 */}
					<Content className='App-content' >
						<div className='content-list'>

							{/* 作者信息 */}
							<div className='author'>
								<Icon type="smile" />
								<span className='author-content'>Minokun</span>
								<span className='author-time'>3 min</span>
							</div>

							{/* 图片 */}
					    	<div className='photo'>
					    		<img className='pic' src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1497248911983&di=622726b7512324805e9c30bf51fe9444&imgtype=0&src=http%3A%2F%2Fandroid-wallpapers.25pp.com%2Ffs01%2F2014%2F09%2F30%2F0_3675c5ca51a2f5fec8f756217ea66dd6_900x675.jpg"  alt="百度推片" />
					    	</div>

					    	{/* 点赞信息 */}
					    	<div className='info'>
					    		<Praise />
					    	</div>

					    	{/* 评论信息 */}
					    	<div className='comment'>
					    		<h5 style={{paddingTop: 5 , paddingBottom: 5}}>世界的尽头</h5>
					    		<Comment />
					    	</div>

						</div>
						
				    </Content>
			    </Layout>
			</div>
		);
	}
}

ReactDOM.render(<AppLayout />, document.getElementById('conainer'));
registerServiceWorker();
