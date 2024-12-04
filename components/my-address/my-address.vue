<template>
	<view class="address">
		<!-- 选择 -->
		<view class="choose" v-if="JSON.stringify(address)==='{}'">
			<button color="#9c6901" type="primary" size="mini" class="btnChoseAddress" @click="chooseAddress">请选择收货地址 +</button>
		</view>
		<!-- 收货信息 -->
		<view class="info-box" v-else @click="chooseAddress">
			<view class="row1">
				<view class="row1-left">
					<view class="username">
						收货人：{{address.userName}}
					</view>
				</view>
				<view class="row1-right">
					<view class="phone">
						电话：{{address.telNumber}}
					</view>
					<uni-icons type="arrowright" size="16"></uni-icons>
				</view>
			</view>
			<view class="row2">
				<view class="row2-left">
					收货地址：
				</view>
				<view class="row2-right">
					{{addstr}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { mapState, mapMutations, mapGetters } from 'vuex'
	export default {
		name:"my-address",
		data() {
			return {
			};
		},
		methods:{
			...mapMutations('m_user',['updateAddress']),	
			// async reAuth() {
			// 	const res = await uni.showModal({
			// 		content:'检测到您没打开地址权限，是否设置去打开？',
			// 		confirmText:'确认',
			// 		cancelText:'取消'
			// 	})
			// uni.openSetting({
			// 	success:(settingResult)=>{
			// 		if(settingResult.authSetting['scope.address']) return uni.$showMsg('授权成功！请选择地址')
			// 		if(!settingResult.authSetting['scope.address']) return uni.$showMsg('您取消了地址授权！')
			// 	}
			// })
			// 	console.log(res)
			// },
			async chooseAddress(){
				const res = await uni.chooseAddress().catch(err=>err)
				
				// 解决用户不授权之后无法再次弹出
				// if(res.errMsg === "chooseAddress:fail auto deny") {
					// this.reAuth();
				// }
				if(res.errMsg === "chooseAddress:ok") {
					this.updateAddress(res)
				}
			}
		},
		computed:{
			...mapState('m_user',['address']),
			...mapGetters('m_user',['addstr'])
		}
	}
</script>

<style lang="scss">
.address {
	width: 100%;
	border-bottom: 3px solid #9c6901;
	.choose {
		text-align: center;
		padding: 10px;
	}
}
.info-box {
	font-size: 12px;
	height: 90px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	padding: 0 5px;
	.row1{
		display: flex;
		justify-content: space-between;
		.row1-right {
			display: flex;
			justify-content: space-between;
		}
	}
		
	.row2 {
		display: flex;
		// justify-content: space-between;
		align-items: center;
		margin-top: 10px;
		.row2-left {
			white-space: nowrap;
		}
	}
}
</style>