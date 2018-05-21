import React, {Component} from 'react';

import './index.less';

import {Icon} from 'antd';

class Header extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="header-box">
				<div className="header-user-company-name">
					<span>We</span>
					<span className="header-user-heart">
						<Icon type="heart" />
					</span>
					<span>拉勾网</span>
				</div>
				<div className="header-nav">

				</div>
			</div>
		);
	}
}

export default Header;
