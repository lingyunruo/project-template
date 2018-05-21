import React, {Component} from 'react';

import './index.less';
import {connect} from '../../common/store';

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
				</div>
			</Layout>
		);
	}
}

export default connect(CandidateList);

