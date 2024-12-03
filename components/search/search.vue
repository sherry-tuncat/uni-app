<template>
	<view class="search" :style="{'background-color':bgcolor}">
		<view class="box" :style="{'border-radius':radius+'px'}" @click="handleClick">
			<uni-icons type="search" size="18">
			</uni-icons>
			<text class='text'>搜索</text>
		</view>
	</view>
</template>

<script>
	export default {
		name:"search",
		props:{
			bgcolor:{
				type:String,
				default:"#000"
			},
			radius:{
				type:Number,
				default:18
			}
		},
		data() {
			return {
				
			};
		},
		methods:{
			handleClick(){
				this.$emit('click')
			}
		}
	}
</script>

<style lang="scss">
.search {
	
	height: 50px;
	padding: 0 10px;
	background-color: #000;
	display: flex;
	align-items: center;
	justify-content: center;
	.box {
		width: 100%;
		height: 36px;
		line-height: 36px;
		background-color: #fff;
		border-radius: 18px;
		display: flex;
		justify-content: center;
		align-items: center;
		text {
			margin-left: 10px;
		}
	}
}
</style>