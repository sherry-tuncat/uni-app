<template>
	<view @click="handleClick">
		<view class="box">
			<!-- 左侧 -->
			<view class="left">
				<radio v-if="needRadio" :checked="item.goods_state" color="#9c6901" @click="radioClickHandler"></radio>
				<image :src="item.goods_small_logo" mode="widthFix"></image>
			</view>
			<!-- 右侧 -->
			<view class="right">
				<view class="title">
					{{item.goods_name}}
				</view>
				<view class="operate">
					<view class="money">
						¥ {{Number(item.goods_price).toFixed(2) }}
					</view>
					<view v-if="needRadio" class="number-box">
						<uni-number-box :min="1" :value="item.goods_count" @change='(val)=>{bindChange(item,val)}'></uni-number-box>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"my-goods",
		props:{
			item:{
				type:Object,
				required:true
			},
			needRadio:{
				type:Boolean,
				default:false
			}
		},
		data() {
			return {
				
			};
		},
		methods:{
			handleClick() {
				this.$emit('click')
			},
			radioClickHandler() {
				this.$emit('radio-change',{
					goods_id:this.item.goods_id,
					goods_state:!this.item.goods_state
				})
			},
			bindChange(item,val) {
				this.$emit('num-change',{
					goods_id:this.item.goods_id,
					goods_count:val
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
.box {
	display: flex;
	padding: 5px 10px;
	border-bottom: 1px solid #efefef;
	max-height: 130px;
	image {
		width: 110px;
		margin-right: 10px;
	}
	.left {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.right {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}
	.title {
		font-size: 14px;
	}
	.operate {
		display: flex;
		justify-content: space-between;
	}
	.money {
		font-size: 18px;
		font-weight: bold;
		color: #9c6901;
	}
}
</style>