<template>
    <div class="table-container">

        <div class="table-responsive table-default">
            <table class="table">
                <thead>
                    <tr>
                        <template v-for="(value, key) in items[0]" :key="key">
                            <th v-if="key != 'allData'">{{ key }}</th>
                        </template>

                        <th v-if="actions && actions.length > 0">Ações</th>
                        
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in items" :key="index">
                        
                        <template v-for="(value, key) in item" :key="key">
                            <td v-if="key != 'allData'">{{ value }}</td>
                        </template>

                        <td class="td-actions" v-if="actions && actions.length > 0">
                            <ButtonComponent 
                                v-for="(action, key) in actions" 
                                :key="key" 
                                :buttonClass="action.class" 
                                :icon="action.icon" 
                                @click="action.action(item.allData ?? item)" 
                            />
                        </td>

                    </tr>

                </tbody>
            </table>
        </div>

    </div>
</template>
<script setup lang="ts">
import ButtonComponent from './ButtonComponent.vue';
import { ref, defineProps } from 'vue';
import type { Action } from '@/types/habitualityType';

const props = defineProps({
    items: {
        type: Array,
        required: true,
    },
    actions: {
        type: Array<Action>,
        default: () => [],
    },
});

</script>