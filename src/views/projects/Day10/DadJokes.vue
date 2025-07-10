<template>
	<div class="container">
		<JokeCard
			class = "joke-card"
			v-if="!requestLoading && !requestError"
			:joke="currentJoke"
			@next="pickRandomJoke"
		/>
		<div class="status" v-if="requestLoading"><p>加载中...</p></div>
		<div class="status error" v-if="requestError"><p>数据获取失败..</p></div>
	</div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import JokeCard from './JokeCard.vue';
import { requestWithTimeout } from '@/utils/requestWithTimeout';
import type { ApiResponse } from '@/types/apiTypes';


const currentJoke = ref<string>("")
const jokes = ref<string[]>([])
const requestLoading = ref(true)
const requestError = ref(false)

async function fetchJokes() {
	try {
		const res = (await requestWithTimeout('/api/dad-jokes')) as ApiResponse<[]>
		if (res.code === 200 && Array.isArray(res.data)) {
			jokes.value = res.data
			pickRandomJoke()
		} else {
			throw new Error('数据异常')
		}
	} catch(err: any) {
		console.warn('请求 /api/dad-jokes 错误：', err.message)
    requestError.value = true
	} finally {
		requestLoading.value = false
	}
}

// 坑点：1.可能会抽到同样的下标 2.如果数组只有1个元素
function pickRandomJoke() {
	console.log("pick")
	if (!jokes.value.length || jokes.value.length === 1) return
	let idx: number;

	do {
		idx = Math.floor(Math.random() * jokes.value.length)
	} while (currentJoke.value === jokes.value[idx]) 
	currentJoke.value = jokes.value[idx]
	console.log("now idx is " + idx)
}

onMounted(fetchJokes);
</script>

<style lang="scss" scoped>
@use "./dad-jokes.scss"
</style>