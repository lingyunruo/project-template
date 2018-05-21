import React, {Component} from 'react';

import './index.less';

import Header from '../components/Header';


class Layout extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const {children} = this.props;

		return (
			<div className="layout-wrap">
				<div className="layout-header-wrap">
					<Header />
				</div>
				<div className="layout-content-wrap">
					{children}
				</div>
			</div>
		);
	}
}

export default Layout;

