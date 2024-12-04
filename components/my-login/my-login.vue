<template>
	<view class="login">
		<uni-icons type="contact-filled" size="100" color="#afafaf"></uni-icons>
		<button type="primary" class="btn-login" @click="getUserInfo">一键登录</button>
		<view class="tips-text">
			登录后尽享更多权益
		</view>
	</view>
</template>

<script>
	import {mapState,mapMutations} from 'vuex'
	export default {
		name:"my-login",
		data() {
			return {
				
			};
		},
		computed:{
			...mapState('m_user',['redirectInfo'])
		},
		methods:{
			...mapMutations('m_user',['updateUserinfo','updateToken','updateRedirectInfo']),
			// 获取用户基本信息
			async getUserInfo(e) {
				const res = await uni.getUserProfile({
					desc:"用于完善用户资料"
				})
				if(res.errMsg === 'getUserInfo:fail auth deny') return uni.$showMsg('您取消了登录授权!')
				this.updateUserinfo(res.userInfo)
				this.getToken(res)
			},
			async getToken(info) {
				const res = await uni.login()
				if(res.errMsg !== "login:ok") return uni.$showMsg('登录失败！')
				const query = {
					code:res.code,
					encryptedData:info.encryptedData,
					iv:info.iv,
					rawData:info.rawData,
					signature:info.signature
				}
				// const loginResult = await uni.$http.post('/api/public/v1/users/wxlogin',query)
				const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo'
				// if(loginResult.data.meta.status!==200) return uni.$showMsg('登录失败!')
				this.updateToken(token)
				uni.$showMsg('登录成功')
				setTimeout(()=>{
					this.navigateBack()
				},1000)
			},
			navigateBack() {
				if(this.redirectInfo && this.redirectInfo.openType==='switchTab') {
					uni.switchTab({
						url:this.redirectInfo.from
					})
					this.updateRedirectInfo(null)
				}
			}
		}
	}
</script>

<style lang="scss">
.login {
	height: 80vh;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	background-color: #f8f8f8;
	overflow: hidden;
	position:relative;
	.btn-login {
		width: 90%;
		border-radius: 100px;
		margin: 15px 0;
		background-color: #9c6901;
	}
	.tips-text {
		font-size: 12px;
		color: gray;
	}
	// &::after {
	// 	content:"";
	// 	display: block;
	// 	width: 100%;
	// 	height: 40px;
	// 	background-color: #fff;
	// 	border-radius: 100%;
	// 	transform: translateY(50%);
	// 	position: absolute;
	// 	bottom: 0;
	// 	left: 0;
	// }
}
</style>