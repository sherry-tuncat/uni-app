<template>
	<Search @click="goSearch"/>
	<view class="cate">
		<scroll-view class="cate-left" scroll-y="true" :style="{ height:wh +'px'}">
			<view v-for="(item,i) in cateList" :key="i" class="cate-left-item" :class="leftActive===i?'active':''" @click="handleLeftClick(item,i)">
				{{item.cat_name}}
			</view>
		</scroll-view>
		<scroll-view class="cate-right" scroll-y="true" :style="{ height:wh +'px'}" :scroll-top="scrollTop">
			<view v-for="(item,i) in cateLevel2" :key="i" class="cate2">
				<view class="cate2-title">
					/ {{item.cat_name}} / 
				</view>
				<view class="cate2-list">
					<view class="cate2-list-item" v-for="(child,ci) in item.children" :key="ci" @click="handleGoodsList(child)">
						<image :src="child.cat_icon" mode="widthFix"></image>
						<text>{{child.cat_name}}</text>
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>
		components:{

<script>
	import tabbarBadge from '@/mixins/tabbar-badge.js'
	import Search from '@/components/search/search.vue'
	export default {
		mixins:[tabbarBadge],
		data() {
			return {
				wh:0,
				cateList:[],
				cateLevel2:[],
				leftActive:0,
				scrollTop:0
			};
		},
		components:{
			Search
		},
		onLoad(){
			const sysInfo = uni.getSystemInfoSync()
			this.wh = sysInfo.windowHeight - 50;
			this.getCateList();
		},
		methods:{
			async getCateList(){
				const res = await uni.$http.get('/api/public/v1/categories')
				if(res.data.meta.status!==200) {
					return uni.$showMsg()
				}
				this.cateList = res.data.message
				this.cateLevel2 = res.data.message[0].children;
			},
			handleLeftClick(item,i) {
				this.leftActive = i;
				this.cateLevel2 = this.cateList[i].children;
				this.scrollTop = this.scrollTop === 0 ? 1 : 0
			},
			handleGoodsList(item) {
				uni.navigateTo({
					url:`/subpkg/goods_list/goods_list?cid=${item.cat_id}`
				})
			},
			goSearch(){
				uni.navigateTo({
					url:'/subpkg/search/search'
				})
			}
		},
	}
</script>

<style lang="scss">
.cate {
	display: flex;
}
.cate-left {
	width: 220rpx;
	.cate-left-item {
		background-color: #f7f7f7;
		line-height:60px;
		text-align: center;
		font-size: 12px;
	}
	.active {
		background-color: #fff;
		position: relative;
		color: #9c6901;
		font-weight: bold;
	}
	.active::before {
		content: " ";
		display: block;
		width: 4px;
		height: 60px;
		background-color: #9c6901;
		position:absolute;
		top:0;
		left: 0;
	}
}
.cate-right {
	flex:1;
	background-color: #fff;
}
.cate2 {
	display: flex;
	justify-content: center;
	flex-direction: column;
	&-title {
		font-size: 14px;
		font-weight: bold;
		text-align: center;
		padding: 15px 0;
	}
	&-list {
		padding: 20rpx;
		display: flex;
		flex-wrap: wrap;
		row-gap: 14rpx;
		column-gap: 16rpx;
		justify-content: space-between;
		align-items: flex-start;
		&-item {
			width: 140rpx;
			display: flex;
			flex-direction: column;
			justify-content: space-around;
			align-items: center;
			image {
				width: 140rpx;
			}
			text {
				font-size: 12px;
			}
		}
	}
}
</style>
