import React from 'react';
import { Picker, PickerView, List, WhiteSpace, ListView } from 'antd-mobile';
import { createForm } from 'rc-form';
import style from '../assets/css/Rank.css';
import md5 from 'js-md5';

const NUM_ROWS = 20;
let pageIndex = 0;
let data = [];

function genData(pIndex = 0) {
	const dataBlob = [];
	for(let i=0; i<NUM_ROWS; i++){
		const iRow = (pIndex * NUM_ROWS) + i;
		if(iRow < data.length){
			dataBlob[i] = data[iRow];
		} 
	}
	return dataBlob;
}

class Rank extends React.Component {

	constructor(props) {
	    super(props);
	    console.log(props.options);
	    const dataSource = new ListView.DataSource({
	      rowHasChanged: (row1, row2) => row1 !== row2,
	    });

	    this.state = {
	   		params: this.props.params,
			dataSource,
			isLoading: true,
	    };
    }

    setData() {
		let signArr= this.props.params.sort((a, b) => {
			var keyA = a.key.toUpperCase();
			var keyB = b.key.toUpperCase();
			return keyA<=keyB;
		});

		let sign = "";
		let entry = 1;

		signArr.forEach(obj => {
			sign += obj.key+"="+obj.value+"&";
			if(obj.key === "entry"){
				entry = obj.value;
			}
		});

		sign += "token=VDKOhI85l1P&Msp2WbtL*P4n98Gq$f";

		fetch("http://www.aiwangsports.com/api/ranking?entry="+entry+"&sign="+md5(sign).toUpperCase(), {
			method: "GET",
			mode: "cors",
            headers: new Headers({
                "Content-Type": "application/x-www-form-urlencoded"
            }),
            // body: "key=1"
		}).then(res => res.json())
		.then(
			(result) => {
				data = result.data;
				data.sort((a, b) => {
					return b.totalPoint - a.totalPoint; 
				});
			},

			(error) => {
				this.setState({
					isLoading: false,
					error
				});
			}
		);
    }

	componentDidMount() {
		// you can scroll to the specified position
		// setTimeout(() => this.lv.scrollTo(0, 120), 800);

		// simulate initial Ajax
		setTimeout(() => {
			this.rData = genData();
			this.setState({
			    dataSource: this.state.dataSource.cloneWithRows(this.rData),
			    isLoading: false,
			  });
			}, 600);

		this.setData();
	}

	//update state and props before render
	unsafe_componentWillUpdate(nextProps, nextState) {
		this.setData();
	}

	// If you use redux, the data maybe at props, you need use `componentWillReceiveProps`
	// componentWillReceiveProps(nextProps) {
	//   if (nextProps.dataSource !== this.props.dataSource) {
	//     this.setState({
	//       dataSource: this.state.dataSource.cloneWithRows(nextProps.dataSource),
	//     });
	//   }
	// }

	onEndReached = (event) => {
		// load new data
		// hasMore: from backend data, indicates whether it is the last page, here is false
		if (this.state.isLoading && !this.state.hasMore) {
		  return;
		}
		// console.log('reach end', event);
		this.setState({ isLoading: true });
		setTimeout(() => {
		  this.rData = [ ...this.rData, ...genData(++pageIndex) ];
		  // console.log(...this.rData);
		  this.setState({
		    dataSource: this.state.dataSource.cloneWithRows(this.rData),
		    isLoading: false,
		  });
		}, 1000);
	}

	render() {

		//the table titles
		const header = () => {
			return(
				<table>
				 	<tbody>	
						<tr>
							<th>排名变化</th>
							<th>当前排名</th>
							<th>总积分</th>
							<th>名称</th>
							<th>性别</th>
							<th>胜场数</th>
							<th>总场数</th>
							<th>净胜局</th>
							<th>胜率</th>
						</tr>
					</tbody>
				</table>
			);
		}
		//separator between two rows, it's a component
		const separator = (sectionID, rowID) => (
			<div
			// key={`${sectionID}-${rowID}`}
			// style={{
			//   backgroundColor: '#F5F5F9',
			//   height: 8,
			//   borderTop: '1px solid #ECECED',
			//   borderBottom: '1px solid #ECECED',
			// }}
			/>
		);

		//the information of row, it's a Component
		const row = (rowData, sectionID, rowID) => {
			// console.log(rowData);
			if(Number(rowID)<data.length) {
			  	const obj = rowData;
				return (
					<table>
						<tbody>
							<tr>
								<td>{obj.rankingChange}</td>
								<td>{Number(rowID)+1}</td>
								<td>{obj.totalPoint}</td>
								<td>{obj.player}</td>
								<td>{obj.sex}</td>
								<td>{obj.wins}</td>
								<td>{obj.totalMatchs}</td>
								<td>{obj.totalMarginbureau}</td>
								<td>{obj.winningProbability}</td>
							</tr>
						</tbody>
					</table>
				);
			}
		};

		return (
			<div>
				<List style={{ backgroundColor: "gray"}} className="picker-list">
					<Picker
						data={this.props.options} 
						cols={1}
						onOk={(label, value) => {
							this.setState({
								params: this.state.params.forEach(element => {
											if(element.key==="entry"){
												element.value = value;
											}
										})
							});
						}}
					>
						<List.Item arrow="horizontal">排名类型</List.Item>
					</Picker>
				</List>

				<ListView
					ref={el => this.lv = el}
					dataSource={this.state.dataSource}
					initialListSize={NUM_ROWS}
					renderHeader={header}
					renderFooter={() => (<div style={{ padding: 30, textAlign: 'center' }}>
										  {this.state.isLoading ? 'Loading...' : 'Loaded'}
										</div>)}
					renderRow={row}
					renderSeparator={separator}
					className="am-list"
					pageSize={NUM_ROWS}
					useBodyScroll
					onScroll={() => { console.log('scroll'); }}
					scrollRenderAheadDistance={500}
					onEndReached={this.onEndReached}
					onEndReachedThreshold={10}
					/>
			</div>
		);
	}
}

Rank.propTypes = {

};

export default Rank;


