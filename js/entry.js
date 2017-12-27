/**
 * Created by Administrator on 2017/11/14.
 */

import React from 'react';
import ReactDom from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import Index from './index';
import '../static/font/iconfont';
import '../static/style';

const root = document.getElementById('react');

ReactDom.render(
	<AppContainer>
		<Index></Index>
	</AppContainer>,
	root
);

if (module.hot) {
	module.hot.accept('./index', () => {
		<AppContainer>
			<Index></Index>
		</AppContainer>,
		root
	});
}