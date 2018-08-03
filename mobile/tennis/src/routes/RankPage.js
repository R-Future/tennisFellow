import React from 'react';
import { connect } from 'dva';
import Rank from '../components/Rank';
import style from './RankPage.css';

function RankPage() {

	const params = [
		{key: "entry", value: 1}
	];

	const options = [
		{label: "男单", value: 1},
		{label: "女单", value: 2},
		{label: "混合单打", value: 3},
		{label: "双打男子个人", value: 4},
		{label: "双打女子个人", value: 5},
		{label: "男双", value: 6},
		{label: "女双", value: 7},
		{label: "混合双打", value: 8}
	];

	return (
		<Rank params={params} options={options}/>
	);
}

RankPage.propTypes = {

};

export default connect()(RankPage);