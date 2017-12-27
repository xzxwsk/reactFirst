/**
 * Created by Administrator on 2017/11/14.
 */

//组件类的第一个字母必须大写，否则会报错，比如HelloMessage不能写成helloMessage。另外，组件类只能包含一个顶层标签，否则也会报错。例如return <h1 className="mt10 ml10">chen</h1> <p>wang</p>

import React from 'react'

class SelectAddrBook extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			index: 0
		}
	}

	clickHandlerPopLs(event) {
		var index = event.currentTarget.getAttribute('data-index');
		console.log(index);
		this.setState({
			index
		})
	}

	render() {
		return (
			<ul className="select_addr_book_con">
				<li className={this.state.index==0?"sel":""} data-index="0" onClick={this.clickHandlerPopLs.bind(this)}>
					<i className="icon"></i>
					<div className="line">
						<span className="short_line">-</span> <span className="w">XinZhang</span>
					</div>
					<div className="line">
						<span className="short_line">-</span> <span className="w">Chengdu Sichuan</span>
					</div>
					<div className="line">
						<span className="short_line">-</span> <span className="w">Sichuan.chengdu.shidaishumadasha fdafds dizhi2pai</span>
					</div>
					<div className="line">
						<span className="short_line">-</span> <span className="w">740000</span>
					</div>
					<div className="line">
						<span className="short_line">-</span> <span className="w">China</span>
					</div>
					<div className="line">
						<span className="short_line">-</span> <span className="w">Phone number: 17708005404</span>
					</div>
				</li>
				<li className={this.state.index==1?"sel":""} data-index="1" onClick={this.clickHandlerPopLs.bind(this)}>
					<i className="icon"></i>
					<div className="line">
						<span className="short_line">-</span> <span className="w">XinZhang</span>
					</div>
					<div className="line">
						<span className="short_line">-</span> <span className="w">Chengdu Sichuan</span>
					</div>
					<div className="line">
						<span className="short_line">-</span> <span className="w">Sichuan.chengdu.shidaishumadasha fdafds dizhi2pai</span>
					</div>
					<div className="line">
						<span className="short_line">-</span> <span className="w">740000</span>
					</div>
					<div className="line">
						<span className="short_line">-</span> <span className="w">China</span>
					</div>
					<div className="line">
						<span className="short_line">-</span> <span className="w">Phone number: 17708005404</span>
					</div>
				</li>
			</ul>
		)
	}
}

class PopWindow extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			show: false,
			popBoxMarginTop: null
		}
	}
	
	openHandler(){
		this.setState({
			show: true
		});
		setTimeout(() => {
			this.setState({
				popBoxMarginTop: {
					transform:"translate(-50%, -50%)",
					opacity: 1
				}
			})
		},0);
	}

	closeHandler() {
		this.setState({
			popBoxMarginTop: {
				opacity: 0
			}
		});
		setTimeout(() => {
			this.setState({
				show: false
			})
		},500);
	}
	
	render() {
		let {className, str, children} = this.props;
		let popCon = "";
		let childrenCount = React.Children.count(children);
		if(childrenCount > 0){
			popCon = React.Children.map(children, function (child) {
				return child;
				// return  React.cloneElement(child, {
				// 	clickHandlerPopLs: this.clickHandlerPopLs
				// });
			});
		}
		return (
			<div className={className}><span className="label" onClick={this.openHandler.bind(this)}>{str}</span>
				<div className={"pop_win"+(this.state.show?" show":"")}>
					<div className="mask" onClick={this.closeHandler.bind(this)}></div>
					<div className="pop_box" style={this.state.popBoxMarginTop}>
						<div className="pop_head clearfix">
							<div className="close_btn" onClick={this.closeHandler.bind(this)}><i className="iconfont icon-close"></i></div>
						</div>
						<div className="pop_con"><SelectAddrBook /></div>
						<div className="pop_bottom"></div>
					</div>
				</div>
			</div>
		)
	}
}


export default PopWindow
