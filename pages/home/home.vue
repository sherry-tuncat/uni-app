<template>
	<view class="search-box">
		<Search @click="goSearch"/>
	</view>
	<view>
		<swiper :indicator-dots="true" :autoplay="true" :interval="2000" :duration="1000">
			<swiper-item v-for="(item,i) in swiperList" :key="i">
				<navigator class="swiper-item" :url="`/subpkg/goods_detail/goods_detail?goods_id=${item.goods_id}`">
					<image :src="item.image_src" mode=""></image>
				</navigator>
			</swiper-item>
		</swiper>
		<view class="nav-list">
			<view class="nav-item" v-for="(item,i) in navList" :key="i" @click="handleNavItem(item)">
				<image :src="item.image_src" mode=""></image>
			</view>
		</view>
		<view class="floor-list">
			<view class="floor-item" v-for="(item,i) in floorList" :key='i'>
				<view class="floor-item-title">
					<image :src="item.floor_title.image_src" mode="widthFix"></image>
				</view>
				<view class="floor-item-content">
					<view class="floor-item-content-left">
						<navigator :url="item.product_list[0].navigator_url">
							<image :src="item.product_list[0].image_src" :style="{width:`${item.product_list[0].image_width}rpx`}" mode="widthFix"></image>
						</navigator>
					</view>
					<view class="floor-item-content-right">
						<navigator v-for="(sub,subi) in item.product_list.slice(1)" :key="subi"  :url="sub.navigator_url">
							<image :src="sub.image_src" :style="{width:`${sub.image_width}rpx`}" mode="widthFix"></image>
						</navigator>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import Search from '@/components/search/search.vue'
	export default {
		data() {
			return {
				swiperList:[],
				navList:[],
				floorList:[]
			};
		},
		components:{
			Search
		},
		onLoad(){
			this.getSwiperList()
			this.getNavList()
			this.getFloorList()
		},
		methods: {
			async getSwiperList(){
				const res = await uni.$http.get('/api/public/v1/home/swiperdata')
				if(res.data.meta.status!==200) {
					return uni.$showMsg()
				}
				this.swiperList = res.data.message
			},
			async getNavList(){
				const res = await uni.$http.get('/api/public/v1/home/catitems')
				if(res.data.meta.status!==200) {
					return uni.$showMsg()
				}
				this.navList = res.data.message
			},
			async getFloorList() {
				const res = await uni.$http.get('/api/public/v1/home/floordata')
				if(res.data.meta.status!==200) {
					return uni.$showMsg()
				}
				this.floorList = res.data.message.map(item=>{
					return {
						...item,
						product_list:item.product_list.map(subItem=>{
							return {
								...subItem,
								navigator_url:subItem.navigator_url.replace('/pages/goods_list','/subpkg/goods_list/goods_list')
							}
						})
					}
				})
			},
			handleNavItem(item) {
				if(item.name==='分类') {
					uni.switchTab({
						url:"/pages/cate/cate"
					})
				}
			},
			goSearch(){
				uni.navigateTo({
					url:'/subpkg/search/search'
				})
			}
		}
	}
</script>

<style lang="scss">
swiper {
	height:330rpx;
	.swiper-item,image {
		width: 100%;
		height: 100%;
	}
}
.nav-list {
	display: flex;
	justify-content: space-around;
	margin:15px 0;
	.nav-item {
		
	}
	image {
		width: 128rpx;
		height: 140rpx;
	}
}
.floor-item-title {
	image {
		width: 100%;
		height: 60rpx;
	}
}
.floor-item-content {
	display: flex;
	padding-left: 10rpx;
}
.floor-item-content-left {

}
.floor-item-content-right {
	flex:1;
	display: flex;
	flex-wrap: wrap;
	justify-content: space-around;
}
.search-box {
	position: sticky;
	top: 0;
	z-index: 999;
}
</style>
