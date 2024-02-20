<template>
    <div class="form-check form-switch">
        <input class="form-check-input cursor-pointer" type="checkbox" :id="`switch-${id}`" @click="toggleSwitch(id)" :checked="checked">
        <label class="form-check-label cursor-pointer" :for="`switch-${id}`" @click="checked = !checked">{{ text }}</label>
    </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, ref } from 'vue';

const props = defineProps({
    id: {
        type: Number,
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
    isChecked: {
        type: Boolean,
        default: false,
    },
});

const checked = ref(props.isChecked);

const emits = defineEmits(['toggle']);

const toggleSwitch = (id: number) => {
    emits('toggle', id);
};

</script>