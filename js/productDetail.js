/**
 * Created by Administrator on 2017/11/14.
 */

//组件类的第一个字母必须大写，否则会报错，比如HelloMessage不能写成helloMessage。另外，组件类只能包含一个顶层标签，否则也会报错。例如return <h1 className="mt10 ml10">chen</h1> <p>wang</p>

import React from 'react'
import PopWindow from './popWin'

class ProductDetailTitle extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		let {str} = this.props;
		return (
			<div className="title">{str}</div>
		)
	}
}

class Label extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		let {str, required} = this.props;
		let star = "";
		if("required" == required){
			star='<span class="txt_red">*</span>';
		}
		return (
			<div className="label" dangerouslySetInnerHTML={{__html: str+star}}></div>
		)
	}
}

class Input extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		let {str, disabled} = this.props;
		return (
			<input type="text" value={str} disabled={disabled} className="ipt w100_per" />
		)
	}
}

class Btn extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		let {str, className, disabled} = this.props;
		if(!className){
			className = "";
		}
		return (
			<input type="button" value={str} disabled={disabled} className={"btn w100_per "+className} />
		)
	}
}

class Image extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			src: this.props.src ? this.props.src : '',
		}
	}

	handleImageLoaded() {
		//加载完毕
	}

	handleImageErrored() {
		//加载失败
		this.setState({
			src: require('../static/images/img-cart1.png')
		});
	}

	render() {
		let props = this.props;
		let {src} = this.state;
		return (
			<img {...props} src={src} onLoad={this.handleImageLoaded.bind(this)} onError={this.handleImageErrored.bind(this)} />
		)
	}
}

class Radio extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			checked: this.props.checked ? this.props.checked : false
		}
	}

	render() {
		let {name, value, checked, onHandle} = this.props;

		return (
			<div className={"radio" + (checked?" checked":"")}>
				<i className={"iconfont" + (checked?" icon-choice1":" icon-choice")}></i>
				<input type="radio" name={name} defaultChecked={checked} value={value} onClick={onHandle}/>
			</div>
		)
	}
}

class ProductDetail extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			groundValue: 1,
			cartLs: [
				{
					img: require("../static/images/img-cart1.png"),
					title: 'PISEN Dual USB Wall Charger Universal Phone Charger for Phones',
					color: 'Silver',
					quantity: 2,
					price: 389.99
				},
				{
					img: require("../static/images/img-cart2.png"),
					title: 'PISEN Portable PowerBank Pocket Hand Warmer 7500mAh',
					color: 'gold',
					quantity: 1,
					price: 29.99
				},
				{
					img: require("../static/images/img-cart3.png"),
					title: 'PISEN USB Type C Cable, 1m Zinc Alloy USB to Type-C Data Sync and Charging',
					color: 'blue',
					quantity: 1,
					price: 9.96
				}
			],
			subtotal: 289.99,
			shipping: 7.15
		}
	}

	setGround(event) {
		var result = event.target.value;
		if(this.state.groundValue == event.target.value){
			result = -1;
		}
		this.setState({
			groundValue: result
		});
	}

	render() {
		return (
			<div className="product_detail">
				<ProductDetailTitle str="Order Details"></ProductDetailTitle>
				<div className="container clearfix">
					<div className="left">
						<div className="con_title">Shipping Address
							<PopWindow className="select_addr_book" str="Select from Address Book" />
						</div>
						<div className="form">
							<div className="line">
								<div className="w49_per inblock">
									<Label str="First name" required="required"></Label>
									<Input />
								</div>
								<div className="w49_per inblock">
									<Label str="Last name" required="required"></Label>
									<Input />
								</div>
							</div>
							<div className="line">
								<div className="w100_per">
									<Label str="Address" required="required"></Label>
									<Input />
								</div>
							</div>
							<div className="line">
								<div className="w30_per inblock">
									<Label str="Country"></Label>
									<Input str="United States" disabled="disabled"></Input>
								</div>
								<div className="w30_per inblock">
									<Label str="Sate/province" required="required"></Label>
									<select className="select w100_per"><option value="3525">Alabama</option><option value="3526">Alabama</option><option value="3527">Alabama</option></select>
								</div>
								<div className="w30_per inblock">
									<Label str="City" required="required"></Label>
									<Input />
								</div>
							</div>
							<div className="line">
								<div className="w30_per inblock">
									<Label str="Zip code" required="required"></Label>
									<Input />
								</div>
								<div className="w30_per inblock">
									<Label str="Company"></Label>
									<Input />
								</div>
								<div className="w30_per inblock">
									<Label str="Apt/Suite"></Label>
									<Input />
								</div>
							</div>
							<div className="line">
								<div className="w30_per">
									<Label str="Phone"></Label>
									<Input />
								</div>
								<div className="w30_per">
									<Label str="Mobile" required="required"></Label>
									<Input />
								</div>
								<div className="w30_per"></div>
							</div>
							<div className="line pdt10">
								<div className="w30_per inblock">
									<Btn str="EDIT" />
								</div>
							</div>
						</div>
					</div>
					<div className="right">
						<div className="con_title">Your Cart</div>
						<div className="cart_ls">
							<ul>
								{
									this.state.cartLs.map(function (item, i) {
										return (
											<li key={i} className="clearfix">
												<div className="img"><Image src={item.img} /></div>
												<div className="word">
													<div className="word_title">{item.title}</div>
													<div className="color">{item.color}</div>
													<div className="word_con">
														<div className="quantity">Quantity: {item.quantity}</div>
														<div className="price">$ {item.price}</div>
													</div>
												</div>
											</li>
										);
									})
								}
							</ul>
						</div>
						<div className="shipping">
							<div className="con_title">Shipping Methods</div>
							<div className="prompt">The goods will be shipped from overseas, please wait patiently.</div>
							<div className="ship_ls">
								<ul>
									<li className="clearfix">
										<div className="radio_box">
											<Radio name="ground" checked={0==this.state.groundValue?"checked":""} value="0" onHandle={this.setGround.bind(this)}/>
										</div>
										<div className="ground">Ground & 3.00</div>
										<div className="detail">No weekend shopping/delivery,No weekend shopping/deliveryNo weekend shopping/deliveryNo weekend</div>
									</li>
									<li className="clearfix">
										<div className="radio_box">
											<Radio name="ground" checked={1==this.state.groundValue?"checked":""} value="1" onHandle={this.setGround.bind(this)}/>
										</div>
										<div className="ground">Ground & 99.00</div>
										<div className="detail">No weekend shopping/delivery,No weekend shopping/deliveryNo week</div>
									</li>
								</ul>
							</div>
						</div>
						<div className="payment">
							<div className="con_title">Payment
								<Image src={require("../static/images/img-payment.png")} />
							</div>
						</div>
						<div className="subtotal">
							<div className="line">
								<div className="label">Subtotal:</div>
								<div className="price">$ {this.state.subtotal}</div>
							</div>
							<div className="line">
								<div className="label">Shipping:</div>
								<div className="price">$ {this.state.shipping}</div>
							</div>
						</div>
						<div className="total">
							<div className="line">
								<div className="label">Total:</div>
								<div className="price">$ {this.state.subtotal + this.state.shipping}</div>
							</div>
						</div>
						<div className="line txt_center">
							<div className="w50_per inblock">
								<Btn str="PLAY NOW" />
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}


export default ProductDetail
