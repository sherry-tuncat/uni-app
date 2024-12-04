<template>
	<view>
		<view class="list">
			<my-goods 
				v-for="(item,index) in goodsList" 
				:key="index"
				:item="item"
				@click="goDetail(item)"
			></my-goods>
		</view>
	</view>
</template>

<script>
	import MyGoods from '@/components/my-goods/my-goods.vue'
	export default {
		components:{MyGoods},
		data() {
			return {
				queryObj:{
					query:'',
					cid:'',
					pagenum:1,
					pagesize:10
				},
				goodsList:[],
				total:0,
				isLoading:false
			};
		},
			
		onLoad(options) {
			this.queryObj = {
				...this.queryObj,
				...options
			}
			this.getGoodsList();
		},
		methods:{
			async getGoodsList(cb){
				this.isLoading = true;
				// 发请求
				const res = await uni.$http.get('/api/public/v1/goods/search',this.queryObj)
				if(res.data.meta.status!==200) {
					return uni.$showMsg()
				}
				this.goodsList = [...this.goodsList,...res.data.message.goods]
				this.total = res.data.message.total
				this.isLoading = false;
				if(cb) {cb()}
			},
			goDetail(item) {
				uni.navigateTo({
					url:`/subpkg/goods_detail/goods_detail?goods_id=${item.goods_id}`
				})
			},
		},
		onReachBottom(){
			if(this.isLoading) return
			if(this.goodsList.length>=this.total) return uni.showToast({title:'已经到底啦!'})
			this.queryObj.pagenum+=1;
			this.getGoodsList()
		},
		onPullDownRefresh() {
			this.queryObj.pagenum = 1;
			this.total = 0;
			this.isLoading = false;
			this.goodsList = [];
			this.getGoodsList(()=>uni.stopPullDownRefresh() )
		}
	}
</script>

<style lang="scss">
.list {
	background-color: #fff;
}
.box {
	display: flex;
	padding: 5px 10px;
	border-bottom: 1px solid #efefef;
	max-height: 140px;
	image {
		width: 120px;
		margin-right: 10px;
	}
	.right {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}
	.title {
		font-size: 14px;
	}
	.money {
		font-size: 18px;
		font-weight: bold;
		color: #9c6901;
	}
}
</style>
