<template>
    <div class="dropdown custom-dropdown-menu">
        <button class="btn btn-dropdown dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown"
            aria-expanded="false">
            <i :class="icon" v-if="icon"></i>
            <img v-if="image" :src="image" class="img-fluid" />
            <span class="text">{{ text ?? '' }}</span>
        </button>
        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
            <template v-for="(item, index) in options" :key="index">
                <router-link v-if="item.type == 'link'" :to="item.url || ''" class="dropdown-item">
                    <i :class="item.icon" v-if="item.icon"></i>
                    {{ item.text }}
                </router-link>
                <button class="dropdown-item" v-else @click="item.action">
                    <i :class="item.icon" v-if="item.icon"></i>
                    {{ item.text }}
                </button>
            </template>
        </ul>
    </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import type { Dropdown } from '@/types/dropdownType';

const props = defineProps({
    text: String,
    image: String,
    icon: String,
    options: Array as () => Dropdown[],
});

</script>