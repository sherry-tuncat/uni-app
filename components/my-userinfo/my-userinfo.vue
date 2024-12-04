<template>
	<view class="userinfo">
		<view class="top-box">
			<image :src="userinfo.avatarUrl" mode=""></image>
			<view class="nickname">
				{{userinfo.nickName}}
			</view>
		</view>
		<view class="panel-list">
			<view class="panel">
				<view class="panel-body">
					<view class="panel-item">
						<text>8</text>
						<text>收藏的店铺</text>
					</view>
					<view class="panel-item">
						<text>8</text>
						<text>收藏的商品</text>
					</view>
					<view class="panel-item">
						<text>8</text>
						<text>关注的商品</text>
					</view>
					<view class="panel-item">
						<text>8</text>
						<text>足迹</text>
					</view>
				</view>
			</view>
		</view>
		<view class="panel">
			<view class="panel-title">
				我的订单
			</view>
			<view class="panel-body">
				<view class="panel-item">
					<uni-icons type="spinner-cycle" color="#9c6901" size="22"></uni-icons>
					<text>待付款</text>
				</view>
				<view class="panel-item">
					<uni-icons type="cart" color="#9c6901" size="22"></uni-icons>
					<text>待收货</text>
				</view>
				<view class="panel-item">
					<uni-icons type="loop" color="#9c6901" size="22"></uni-icons>
					<text>退款/退货</text>
				</view>
				<view class="panel-item">
					<uni-icons type="wallet" color="#9c6901" size="22"></uni-icons>
					<text>全部订单</text>
				</view>
			</view>
		</view>
		<view class="panel">
			<view class="panel-list-item">
				<text>收货地址</text>
				<uni-icons type="arrowright" size="15"></uni-icons>
			</view>
			<view class="panel-list-item">
				<text>联系客服</text>
				<uni-icons type="arrowright" size="15"></uni-icons>
			</view>
			<view class="panel-list-item" @click="logout">
				<text>退出登录</text>
				<uni-icons type="arrowright" size="15"></uni-icons>
			</view>
		</view>
	</view>
</template>

<script>
	import {mapState,mapMutations} from 'vuex';
	export default {
		name:"my-userinfo",
		computed:{
			...mapState('m_user',['userinfo'])
		},
		data() {
			return {
				
			};
		},
		methods:{
			...mapMutations('m_user',['updateAddress','updateUserinfo','updateToken']),
			async logout() {
				const res = await uni.showModal({
					title:'提示',
					content:'确认退出登录吗？'
				})
				if(res && res.confirm) {
					this.updateAddress({});
					this.updateUserinfo({});
					this.updateToken('');
				}
				
			},
			
		}
	}
</script>

<style lang="scss">
.userinfo {
	height:100vh;
	background-color: #efefef;
	.top-box {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 400rpx;
		background-color: #000;
		image {
			width: 90px;
			height: 90px;
			border-radius: 45px;
			border: 2px solid #fff;
			box-shadow:0 1px 5px black;
		}
		.nickname {
			margin-top: 10px;
			font-size: 16px;
			font-weight: bold;
			color: #fff;
		}
	}
}

.panel {
	margin:0 10px;
	padding: 10px;
	margin-top: -10px;
	background-color: #fff;
	border-radius: 8px;
	margin-bottom: 20px;
	.panel-body {
		display: flex;
		justify-content: space-around;
		.panel-item { 
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: space-around;
			font-size: 14px;
		}
	}
	.panel-title {
		font-size: 16px;
		padding: 10px;
		border-bottom: 1px solid #efefef;
		margin-bottom: 10px;
	}
}
.panel-list-item {
	width: 100%;
	display: flex;
	justify-content: space-between;
	align-items: center;
	line-height: 40px;
	padding: 0 10px;
	box-sizing: border-box;
}
	
.panel-list-item:not(:last-of-type) {
	border-bottom: 1px solid #efefef;
}

</style>