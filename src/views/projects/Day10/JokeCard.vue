<template>
	<div>
		 <p class="title">其实我感觉不是那么好笑啦</p>
		 <p class="joke">{{ joke }}</p>
		 <button @click="$emit('next')" class="btn">下一则</button>
	</div>
</template>

<script setup lang="ts">
	defineProps<{
		joke: string,
	}>()

	defineEmits<{
  	(e: 'next'): void
	}>()
</script>

<style lang="scss" scoped>
.title {
	font-size: 1.17em;
	font-weight: bold;
	opacity: 0.6;
	letter-spacing: 2px;
	margin: 2em 0;
}

.joke {
	font-size: 26px;
	margin: 50px auto;
}

.btn {
	background-color: #9f68e0;
	color: #fff;
	border: 0;
	border-radius: 10px;
	box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1), 0 6px 6px rgba(0, 0, 0, 0.1);
	padding: 14px 40px;
	font-size: 20px;
	cursor: pointer;
}

.btn.focus {
	outline: 0;
}

.btn:active {
	transform: scale(0.95);
}
</style>