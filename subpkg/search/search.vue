<template>
	<view>
		<view class="search-box">
			<uni-search-bar
				:radius="100" 
				:cancel-button="'none'"
				@confirm="search" 
				@input="input"></uni-search-bar>
		</view>
		<!-- 搜索建议列表 -->
		<view class="list">
			<view class="item" v-for="(item,i) in searchList" :key="i" @click="goDetail(item.goods_id)">
				<view class="name">
					{{item.goods_name}}
				</view>
				<uni-icons type="arrowright" size="18"></uni-icons>
			</view>
		</view>
		<!-- 历史 -->
		<view v-if="searchList.length===0" class="history">
			<view class="title">
				<view class="">
					搜索历史
				</view>
				<view class="">
					<uni-icons type="trash" size="18" @click="handleTrash"></uni-icons>
				</view>
			</view>
			<view class="content">
				<view v-for="(item,i) in history" :key="i" class="content-item" @click="handleHistory(item)">
					{{item}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				timer:null,
				keyword:"",
				searchList:[],
				history:[]
			};
		},
		methods:{
			search(){
				
			},
			async getSearchList(){
				if(this.keyword.length===0) {
					this.searchList = []
					return 
				}
				// 发请求
				const res = await uni.$http.get('/api/public/v1/goods/qsearch',{query:this.keyword})
				if(res.data.meta.status!==200) {
					return uni.$showMsg()
				}
				this.searchList = res.data.message
				if(this.keyword&&this.keyword.length>0) {
					this.history.push(this.keyword)
				}
			},
			input(value) {
				clearTimeout(this.timer);
				this.timer=setTimeout(()=>{
					this.keyword = value
					this.getSearchList()
				},500)
			},
			goDetail(id) {
				uni.navigateTo({
					url:`/subpkg/goods_detail/goods_detail?goods_id=${id}`
				})
				
			},
			handleTrash() {
				this.history = [];
			},
			handleHistory(item) {
				uni.navigateTo({
					url:`/subpkg/goods_detail/goods_detail?query=${item}`
				})
			}
		}
	}
</script>

<style lang="scss">
.search-box {
	position: sticky;
	top:0;
	z-index: 999;
}
.list {
	.item {
		display: flex;
		justify-content: space-between;
		line-height: 40px;
		border-bottom: 1px solid #efefef;
		padding: 0 10rpx;
		.name {
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
			margin-right: 6px;
			font-size: 14px;
		}
	}
}
.history {
	.title {
		display: flex;
		justify-content: space-between;
		font-size: 14px;
		padding: 10rpx;
		border-bottom: 2px solid #eaecef;
	}
	.content {
		display: flex;
		flex-wrap: wrap;
		.content-item {
			background-color: #eaecef;
			padding: 6rpx 20rpx;
			margin: 15rpx;
			border-radius: 5rpx;
			font-weight: 200;
			font-size: 14px;
		}
	}
}
</style>
