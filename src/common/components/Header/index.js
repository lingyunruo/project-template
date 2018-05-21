import React, {Component} from 'react';

import {Button} from 'antd';

import './index.less';

class Header extends Component {
	constructor(props) {

		super(props);
	}

	render() {
		return (
			<div className="header-box">
				<Button
					type="primary"
				>
					我是一个大button
				</Button>
			</div>
		);
	}
}

export default Header;
