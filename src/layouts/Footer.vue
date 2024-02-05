<template>
    <footer class="footer">
        <span class="copy">Copyright © {{ currentYear }}. All right reserved.</span>
    </footer>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const currentYear = ref(new Date().getFullYear());
</script>