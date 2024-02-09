<template>
    <div class="table-container">
        <!-- <div class="table-header flex-horizontal">
            <div class="search-default">
                <IconComponent name="search" />
                <input type="text" class="form-control" placeholder="Pesquisar..." />
            </div>
            
            <ButtonComponent buttonClass="dark-blue" text="Novo" />

        </div> -->
        <div class="table-responsive table-default">
            <table class="table">
                <thead>
                    <tr>
                        <th v-for="(value, key) in items[0]" :key="key">{{ key }}</th>
                        <th v-if="actions && actions.length > 0">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in items" :key="index">
                        <!-- <td>
                            <div class="image-with-name">
                                <img src="https://primefaces.org/cdn/primevue/images/avatar/ionibowcher.png" alt="Placeholder" />
                                <span>Row 1 Data 1</span>
                            </div>
                        </td>
                        <td>Row 1 Data 2</td>
                        <td>Row 1 Data 3</td> -->

                        <td v-for="(value, key) in item" :key="key">{{ value }}</td>
                        <td class="td-actions" v-if="actions && actions.length > 0">
                            <ButtonComponent 
                                v-for="(action, key) in actions" 
                                :key="key" 
                                :buttonClass="action.class" 
                                :icon="action.icon" 
                                @click="action.action(item)" 
                            />
                        </td>
                        <!-- <td class="td-actions">
                            <ButtonComponent buttonClass="light blue" icon="edit" />
                            <ButtonComponent buttonClass="light orange" icon="eye" />
                            <ButtonComponent buttonClass="light red" icon="trash" />
                            <ButtonComponent buttonClass="light green" icon="settings" />
                        </td> -->
                    </tr>

                    <!-- <tr>
                        <td>
                            <div class="image-with-name">
                                <img src="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png" alt="Placeholder" />
                                <span>Row 1 Data 1</span>
                            </div>
                        </td>
                        <td>Row 2 Data 2</td>
                        <td>Row 2 Data 3</td>
                        <td class="td-actions">
                            <ButtonComponent buttonClass="light blue" icon="edit" />
                            <ButtonComponent buttonClass="light orange" icon="eye" />
                            <ButtonComponent buttonClass="light red" icon="trash" />
                            <ButtonComponent buttonClass="light green" icon="settings" />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div class="image-with-name">
                                <img src="https://primefaces.org/cdn/primevue/images/avatar/asiyajavayant.png" alt="Placeholder" />
                                <span>Row 1 Data 1</span>
                            </div>
                        </td>
                        <td>Row 3 Data 2</td>
                        <td>Row 3 Data 3</td>
                        <td class="td-actions">
                            <ButtonComponent buttonClass="light blue" icon="edit" />
                            <ButtonComponent buttonClass="light orange" icon="eye" />
                            <ButtonComponent buttonClass="light red" icon="trash" />
                            <ButtonComponent buttonClass="light green" icon="settings" />
                        </td>
                    </tr> -->

                </tbody>
            </table>
        </div>

    </div>
</template>
<script setup lang="ts">
import ButtonComponent from './ButtonComponent.vue';
import { ref, defineProps } from 'vue';

const props = defineProps({
    items: {
        type: Array,
        required: true,
    },
    actions: {
        type: Array,
        default: () => [],
    },
});

</script>