import React, {Component} from 'react';

import './index.less';

import Layout from '../../common/Layout';
import BaseComponent from '../../BaseComponent';


class CandidateList extends BaseComponent {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<Layout>
				<div className="page-wrap">
					这是一个list页面888fff
				</div>
			</Layout>
		);
	}
}

export default CandidateList;

