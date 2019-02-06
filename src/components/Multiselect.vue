<template>
    <md-field>
        <label :for="my_label">Comprador</label>
        <!-- <md-select v-model="selectedBuyers" :name="my_label" :id="my_label" multiple md-dense> -->
        <md-select :value="selected" @change="selected = $event.target.value" :name="my_label" :id="my_label" multiple md-dense>
        <md-option v-for="(item, index) in my_values" :key="index" :value="id">{{ item }}</md-option>        
        <!-- <md-option value="comprador1">Comprador 1</md-option>
        <md-option value="comprador2">Comprador 2</md-option>
        <md-option value="comprador3">Comprador 3</md-option>
        <md-option value="comprador4">Comprador 4</md-option>
        <md-option value="comprador5">Comprador 5</md-option>
        <md-option value="comprador6">Comprador 6</md-option>
        <md-option value="comprador7">Comprador 7</md-option> -->
        </md-select>
    </md-field>   
</template>

<script>
export default {
    props: {
        my_label: String,
        my_values: []
    },
    mounted() {
        this.my_values.unshift({ id: "all", "item": "Selecionar todos" })
    }  
};
</script>

<style lang="scss" scoped>
</style>


