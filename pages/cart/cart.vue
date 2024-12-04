<template>
	<view v-if="cart.length!==0">
		<view class="top">
			<!-- 收货地址 -->
			<view class="">
				<my-address/>
			</view>
			<!-- 标题 -->
			<view class="title">
				<uni-icons type="shop" size="20"></uni-icons>
				<text>购物车</text>
			</view>
			<!-- 循环渲染购物车中的商品信息 -->
			<uni-swipe-action>
				<uni-swipe-action-item 
					v-for="(item,index) in cart" 
					:key="index" 
					:right-options="options" 
					@click="swipeActionClickHandler(item)">
					<my-goods
						:item="item" 
						:needRadio="true" 
						@radio-change="radioChangeHandler"
						@num-change="handleNumChange" 
					/>
				</uni-swipe-action-item>
			</uni-swipe-action>
			
		</view>
		<view>
			<my-settle/>
		</view>
	</view>
	<view class="empty-cart" v-else>
		<image src="/static/nodata.png" class="empty-img" mode="widthFix"></image>
		<text class="tip-text">空空空如也~~</text>
	</view>
</template>

<script>
	import MyGoods from '@/components/my-goods/my-goods.vue'
	import MyAddress from '@/components/my-address/my-address.vue'
	import MySettle from '@/components/my-settle/my-settle.vue'
	import {mapGetters,mapState,mapMutations} from 'vuex'
	import tabbarBadge from '@/mixins/tabbar-badge.js'
	export default {
		components:{
			MyGoods,
			MyAddress,
			MySettle
		},
		mixins:[tabbarBadge],
		computed:{
			...mapState('m_cart',['cart'])
		},
		methods:{
			...mapMutations('m_cart',['updateGoodsState','updateGoodsCount','removeGoodsID']),
			radioChangeHandler(obj){
				this.updateGoodsState(obj)
			},
			handleNumChange(obj){
				this.updateGoodsCount(obj)
			},
			swipeActionClickHandler(item){
				this.removeGoodsID(item.goods_id)
			}
		},
		data() {
			return {
				options:[
					{
						text:'删除',
						style:{
							backgroundColor:"#9c6901",
							color:"#fff"
						}
					}
				]
			};
		},
	}
</script>

<style lang="scss" scoped>
.top {
	margin-bottom: 50px;
}
.title {
	display: flex;
	align-items: center;
	padding: 6px;
	padding-left: 10px;
	border-bottom: 1px solid #e5e5e5;
	text {
		margin-left: 10px;
		font-size: 14px;
	}
}
.uni-swipe-action {
  overflow: visible;
}
.empty-cart {
	width: 100%;
	height: 100vh;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	.empty-img {
		width: 80px;
	}
	.tip-text {
		color: #B38A37;
		font-size: 14px;
		margin-top: 20px;
	}
}
</style>
