<template>
    <div class="custom-dropdown-menu">
        <button class="btn-dropdown" @click="isOpen = !isOpen">
            <span class="span-count green" v-if="count">{{ count }}</span>
            <i :class="icon" v-if="icon"></i>
            <img v-if="image" :src="image" class="img-fluid" />
            {{ text ?? '' }}
        </button>
        <div class="container-dropdown-menu" v-show="isOpen">
            <template v-for="(item, index) in options" :key="index">
                <router-link v-if="item.type == 'link'" :to="item.url || ''" class="dropdown-link">
                    <i :class="item.icon" v-if="item.icon"></i>
                    {{ item.text }}
                </router-link>
                <button v-else>
                    <i :class="item.icon" v-if="item.icon"></i>
                    {{ item.text }}
                </button>
            </template>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, defineProps } from 'vue';
import type { Dropdown } from '@/types/dropdownType';

const props = defineProps({
    text: String,
    image: String,
    icon: String,
    count: Number,
    options: Array as () => Dropdown[],
});

const isOpen = ref(false);
</script>