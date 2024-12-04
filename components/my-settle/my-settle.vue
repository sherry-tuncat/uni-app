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
		<view class="btn-settle">
			结算({{checkedCount}})
		</view>
	</view>
</template>

<script>
	import { mapGetters, mapMutations } from 'vuex';
	export default {
		name:"my-settle",
		computed:{
			...mapGetters('m_cart',['checkedCount','total','checkedGoodsAmount']),
			isFullCheck() {
				return this.total === this.checkedCount
			}
		},
		methods:{
			...mapMutations('m_cart',['updateAllGoodsState']),
			changeAllState() {
				this.updateAllGoodsState(!this.isFullCheck)
			}
		},
		data() {
			return {
				
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