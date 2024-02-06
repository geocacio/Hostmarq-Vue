<template>
    <div class="table-container">
        <div class="table-header flex-horizontal">
            <div class="search-default">
                <IconComponent name="search" />
                <input type="text" class="form-control" placeholder="Pesquisar..." />
            </div>
            
            <ButtonComponent buttonClass="dark-blue" text="Novo" />

        </div>
        <div class="table-responsive table-default">
            <table class="table">
                <thead>
                    <tr>
                        <th>Column 1</th>
                        <th>Column 2</th>
                        <th>Column 3</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <div class="image-with-name">
                                <img src="https://primefaces.org/cdn/primevue/images/avatar/ionibowcher.png" alt="Placeholder" />
                                <span>Row 1 Data 1</span>
                            </div>
                        </td>
                        <td>Row 1 Data 2</td>
                        <td>Row 1 Data 3</td>
                        <td class="td-actions">
                            <ButtonComponent buttonClass="light blue" icon="edit" />
                            <ButtonComponent buttonClass="light orange" icon="eye" />
                            <ButtonComponent buttonClass="light red" icon="trash" />
                        </td>
                    </tr>
                    <tr>
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
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
<script setup lang="ts">
import ButtonComponent from './ButtonComponent.vue';
import IconComponent from './IconComponent.vue';
</script>