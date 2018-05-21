import React from 'react';
import reactDom from 'react-dom';

import Home from '../container';
import reducers from '../reducers';

import {start} from '../../common/store';


start({
	root: document.getElementById('root'),
	component: Home,
	reducers: reducers
});
