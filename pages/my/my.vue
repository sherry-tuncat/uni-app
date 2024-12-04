<template>
	<view>
		<MyLogin v-if='!token'/>
		<MyUserinfo v-else/>
	</view>
</template>

<script>
	import tabbarBadge from '@/mixins/tabbar-badge.js'
	import MyLogin from '@/components/my-login/my-login.vue';
	import MyUserinfo from '@/components/my-userinfo/my-userinfo.vue';
	import {mapState} from 'vuex';
	export default {
		components:{MyLogin,MyUserinfo},
		mixins:[tabbarBadge],
		computed:{
			...mapState('m_user',['token'])
		},
		methods:{
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">

</style>
