<template>
    <div class="breadcrumb-container">
        <h3 class="title">{{ title }}</h3>
        <ul class="breadcrumb" v-if="links && links.length > 0">
            <li class="item" v-for="(link, index) in links" :key="index">
                <router-link :to="(link as any).url" class="link">{{ (link as any).name }}</router-link>
            </li>
            <li class="item">{{ title }}</li>
        </ul>
    </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps({
    title: {
        type: String,
        required: true
    },
    links: Array,
});

</script>