<template>
	<view>
		<view class="top">
			<swiper :indicator-dots="true" :autoplay="true" :interval="2000" :duration="1000">
				<swiper-item v-for="(item,i) in goods_info?.pics" :key="i">
					<image :src="item.pics_big" @click="preview(i)"></image>
				</swiper-item>
			</swiper>
			<view class="info">
				<view class="price">
					¥ {{goods_info.goods_price}}
				</view>
				<view class="body">
					<view class="name">
						{{goods_info?.goods_name}}
					</view>
					<view class="favi">
						<uni-icons type="star" size="22" color="gray"></uni-icons>
						<text>收藏</text>
					</view>
				</view>
				<view class="yf">
					快递：免运费
				</view>
				<rich-text :nodes="goods_info.goods_introduce"></rich-text>
			</view>
			
		</view>
		<!-- <uni-goods-nav :fill="" :options="options" :button-group="buttonGroup" @click="" @buttonClick="" /> -->
		<view class="bottom">
			<uni-goods-nav :fill="true" :options="options" :button-group="buttonGroup"  @click="handleClick"/>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				goods_id:'',
				goods_info:{},
				options:[
					{
						icon:'shop',
						text:'店铺'
					},
					{
						icon:'cart',
						text:'购物车',
						info:2
					}
				],
				buttonGroup:[
					{
						text:"加入购物车",
						backgroundColor:"#9c6901",
						color:"#fff"
					},
					{
						text:"立即购买",
						backgroundColor:"#000",
						color:"#fff"
					}
				]
			};
		},
			
		onLoad(options) {
			this.goods_id = options.goods_id;
			this.getGoodsDetail()
		},
		methods:{
			async getGoodsDetail(){
				const res = await uni.$http.get('/api/public/v1/goods/detail',{goods_id:this.goods_id})
				if(res.data.meta.status!==200) {
					return uni.$showMsg()
				}
				res.data.message.goods_introduce = res.data.message.goods_introduce.replace(/<img/g,'<img style="display:block;"').replace(/\.webp/g,'.jpg')
				this.goods_info = res.data.message
			},
			preview(i) {
				uni.previewImage({
					current:i,
					urls:this.goods_info.pics.map(x=>x.pics_big)
				})
			},
			handleClick(e) {
				if(e.content.text==='购物车') {
					uni.switchTab({
						url:`/pages/cart/cart`
					})
				}
			}
		}
	}
</script>

<style lang="scss">
swiper {
	height: 750rpx;
	image {
		width: 100%;
		height: 100%;
	}
}
.swiper-item {
	image {
		width: 100%;
	}
}
.top {
	margin-bottom: 40px;
}
.info {
	padding: 10px;
	.price {
		font-size: 22px;
		font-weight: bold;
		color: #9c6901;
	}
	.body {
		display: flex;
		.name {
			font-size: 14px;
			line-height: 20px;
			padding-right: 20px;
			border-right: 1px solid lightgray;
		}
		.favi {
			width: 100px;
			display: flex;
			flex-direction: column;
			align-items: center;
			color: gray;
			font-size: 12px;
		}
		
	}
	.yf {
		font-size: 12px;
		color: gray;
		margin: 5px 0;
	}
}
.bottom {
	width: 100%;
	position: fixed;
	bottom:0;
}
</style>
