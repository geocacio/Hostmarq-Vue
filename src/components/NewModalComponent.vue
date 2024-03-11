<template>
    
    <button @click="openModal">Open Modal</button>

    <div class="custom-modal" v-if="isOpen">
        <div class="custom-modal-content">
            <button class="close" @click="closeModal">&times;</button>
            <slot></slot>

        </div>
    </div>

</template>
<script setup lang="ts">
import { ref, defineEmits, defineProps } from 'vue';

const props = defineProps({
    isOpen: Boolean
});

const emit = defineEmits(['update:isOpen']);

const closeModal = () => {
    emit('update:isOpen', false);
}
</script>
<!-- <script setup lang="ts">
    import { ref, defineEmits, defineProps } from 'vue';

    const props = defineProps({
        isOpen: Boolean
    });

    // const isOpen = ref(props.isOpen);

    const closeModal = () => {
        props.isOpen = false;
    }

    const emit = defineEmits(['close']);
</script> -->