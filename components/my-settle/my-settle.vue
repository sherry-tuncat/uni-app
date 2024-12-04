<template>
	<view class="settle">
		<label class="radio" @click="changeAllState">
			<radio color="#9c6901" :checked="isFullCheck"/><text>  全选</text>
		</label>
		<!-- 合计 -->
		<view class="amount-box">
			合计：<text class="mount">
				¥ {{ Number(checkedGoodsAmount).toFixed(2) }}
			</text>
		</view>
		<!-- 结算按钮 -->
		<view class="btn-settle" @click="settlement">
			结算({{checkedCount}})
		</view>
	</view>
</template>

<script>
	import { mapGetters, mapMutations, mapState } from 'vuex';
	export default {
		name:"my-settle",
		computed:{
			...mapGetters('m_cart',['checkedCount','total','checkedGoodsAmount']),
			...mapGetters('m_user',['addstr','token']),
			...mapState('m_user',['token']),
			...mapState('m_cart',['cart']),
			isFullCheck() {
				return this.total === this.checkedCount
			}
		},
		methods:{
			...mapMutations('m_cart',['updateAllGoodsState']),
			...mapMutations('m_user',['updateRedirectInfo']),
			changeAllState() {
				this.updateAllGoodsState(!this.isFullCheck)
			},
			showTips(n) {
				if(n===0) return
				uni.showToast({
					icon:"none",
					title:`请登录后再结算！${n}秒后自动跳转到登录页`,
					mask:true,
					duration:1500
				})
			},
			async pay() {
				// 创建订单，获取订单id
				const orderInfo = {
					// 开发期间支付一分钱
					order_price:0.01,
					consignee_addr:this.addstr,
					goods:this.cart.filter(x=>x.goods_state).map(x=>({goods_id:x.goods_id,goods_number:x.goods_count,goods_price:x.goods_price}))
				}
				const orderRes = await uni.$http.post('/api/public/v1/my/orders/create',orderInfo)
				if(!orderRes || orderRes.errMsg !== "request:ok") {
					return uni.$showMsg('创建订单失败')
				}
				// 发起预支付请求，发送订单，获取参数
				const reqRes = await uni.$http.post('/api/public/v1/my/orders/req_unifiedorder',{
					order_number:orderRes.data.message.order_number
				})
				if(!reqRes || reqRes.errMsg !== "request:ok") {
					return uni.$showMsg('创建预支付订单失败')
				}
				// 发送微信支付请求，携带订单参数
				try {
					const res = await uni.requestPayment(reqRes.data.message.pay)
					const payRes = await uni.$http.post('/api/public/v1/my/orders/chkOrder',{order_number:orderRes.data.message.order_number})
					if( payRes.data.meta.status!==200 ) return uni.$showMsg('订单未支付')
					uni.showToast({
						title:"订单支付完成！",
						icon:"success"
					})
				} catch {
					uni.$showMsg('支付失败！')
				}
			},
			settlement() {
				if(!this.checkedCount) return uni.$showMsg('请选择要结算的商品！');
				if(!this.addstr) return uni.$showMsg('请选择收货地址！');
				console.log('token',this.token)
				if(!this.token) return this.delayNavigate();
				this.pay();
			},
			delayNavigate() {
				this.showTips(this.seconds)
				let timer = setInterval(()=>{
					if(this.seconds===0) {
						clearInterval(timer);
						uni.switchTab({
							url:"/pages/my/my",
							success:()=>{
								this.updateRedirectInfo({
									openType:'switchTab',
									from:'/pages/cart/cart'
								})
							}
						})
						return
					}
					this.seconds--;
					this.showTips(this.seconds)
				},1000)
			}
		},
		data() {
			return {
				seconds:3,
			};
		}
	}
</script>

<style lang="scss">
.settle {
	width: 100%;
	height: 50px;
	background-color: #000;
	position: fixed;
	bottom: 0;
	display: flex;
	justify-content: space-between;
	color: #9c6901;
	font-size: 18px;
	align-items: center;
}
.radio {
	margin-left: 10px;
}
.amount-box {
	font-weight: bold;
	font-size: 18px;
}
.btn-settle {
	height: 50px;
	line-height: 50px;
	padding: 0 10px;
	background-color: #9c6901;
	min-width: 100px;
	color: #fff;
	text-align: center;
}
</style>