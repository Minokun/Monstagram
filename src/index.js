import React, { Component }  from 'react';
import ReactDOM from 'react-dom';
import AppHeader from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import { Icon , Layout } from 'antd';
import Praise from './Praise.js';
import Comment from './Comment.js';

const { Content } = Layout;

let Global = require("./Global.js");

// 作品展示组件
class ShowList extends Component {
	render() {
		return (
			<div>
				<div className='content-list'>
					{/* 作者信息 */}
					<div className='author'>
						<Icon type="smile" style={{fontSize: 16}}/>
						<span className='author-content'>{this.props.children.nickname}</span>
						<span className='author-time'>{this.props.children.time_diff}</span>
					</div>

					{/* 图片 */}
			    	<div className='photo'>
			    		<img className='pic' src={this.props.children.img_url}  alt="百度推片" />
			    	</div>

			    	{/* 点赞信息 */}
			    	<div className='info'>
			    		<Praise num={this.props.children.praise_num} resource_id={this.props.children.id} praise_check={this.props.children.praise_check}/>
			    	</div>

			    	{/* 评论信息 */}
			    	<div className='comment'>
			    		<Comment ComList={this.props.children.comment} ResourceId={this.props.children.id} />
			    	</div>
		    	</div>
	    	</div>
		);
	}
}

// 页面布局
class AppLayout extends Component {

	constructor(props){
		super(props);
		this.state = {
			show_list : '',
		};

	}

	// 获取数据
	getData() {
		var uid = localStorage.getItem("user_id") ? localStorage.getItem("user_id") : sessionStorage.getItem("user_id");
		uid = uid ? uid : 0;

		fetch(Global.ApiUrl + "resource_list/?user_id=" + uid).then((responce) => {
			return responce.json();
		}).then((data) => {
			this.setState({
				show_list:data,
			});
		}).catch((error) => {
			console.log('request faild:', error);
		})
	}

	// 获取作品数据
	componentDidMount() {
		this.getData();
	}

	

	render() {
		var rows = [];
		for (var n in this.state.show_list) {
		    rows.push(<ShowList key={n} children={this.state.show_list[n]} />);
		}
		return (
			<div>
			    <Layout>
			    	{/* 页头 */}
					<AppHeader />
					{/* 列表展示页面 */}
					<Content className='App-content' >
						{rows}
				    </Content>
			    </Layout>
			</div>
		);
	}
}

ReactDOM.render(<AppLayout />, document.getElementById('conainer'));
registerServiceWorker();
