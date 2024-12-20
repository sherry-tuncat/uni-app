export default {
	namespaced:true,
	state:()=>({
		cart: uni.getStorageSync('cart') ? JSON.parse(uni.getStorageSync('cart')) : []
	}),
	mutations:{
		addToCart(state,goods) {
			const findResult = state.cart.find(x=>x.goods_id===goods.goods_id);
			if(!findResult) {
				state.cart.push(goods)
			} else {
				findResult.goods_count++
			}
			this.commit('m_cart/saveToStorage')
		},
		saveToStorage(state) {
			uni.setStorageSync('cart',JSON.stringify(state.cart))
		},
		updateGoodsState(state,goods) {
			const find = state.cart.find(x=>x.goods_id === goods.goods_id)
			if(find) {
				find.goods_state = goods.goods_state;
				this.commit('m_cart/saveToStorage')
			}
		},
		updateGoodsCount(state,goods) {
			const find = state.cart.find(x=>x.goods_id === goods.goods_id)
			if(find) {
				find.goods_count = goods.goods_count;
				this.commit('m_cart/saveToStorage')
			}
		},
		removeGoodsID(state,id) {
			state.cart = state.cart.filter(x=>x.goods_id !== id)
			this.commit('m_cart/saveToStorage')
		},
		updateAllGoodsState(state,newState) {
			state.cart.forEach(x=>x.goods_state=newState)
			this.commit('m_cart/saveToStorage')
		}
	},
	getters:{
		total(state) {
			return state.cart.reduce((total,item)=>total+=item.goods_count,0)
		},
		checkedCount(state) {
			return state.cart.filter(x=>x.goods_state).reduce((total,item)=>total+=item.goods_count,0)
		},
		checkedGoodsAmount(state) {
			return state.cart.filter(x=>x.goods_state).reduce((total,item)=>total+=item.goods_count*item.goods_price,0).toFixed(2)
		}
	}
}