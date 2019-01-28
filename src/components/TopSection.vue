<template>
    <div class="row justify-content-between align-items-center">
      <div class="col-lg-6">
        <h1 class="top-title">Listagem de {{ title }}</h1>
        <h3 class="mt-2 mb-3 subtitle">Utilize os filtros abaixo para gerar o relatório:</h3>
      </div>
      <div class="col-lg-6 d-flex mt-3" style="justify-content: flex-end;">
        <div class="right-buttons">
          <button class="rounded-button mr-2" @click="$emit('print')">
            Imprimir
            <md-icon>print</md-icon>
          </button>  
          <button class="rounded-button" @click="$emit('export')">
            Exportar
            <md-icon>cloud_download</md-icon>
          </button>                      
        </div>
      </div>
    </div>    
</template>
<script>
export default {
    props: { title: String }
}
</script>
<style lang="scss" scoped>

.subtitle {
    color: rgba(0,0,0,.54); 
    font-weight: normal;
}

.rounded-button {
    background-color: transparent;
    border: 1px solid #DC6E1B;
    border-radius: 24px;
    padding: .4rem 1rem .25rem 1rem;
    color: #DC6E1B;
    
    &:hover {
        cursor: pointer;
    }
}

i {
    color: #DC6E1B !important;
    font-size: 1.25rem !important;
    padding-bottom: .25rem;
}

</style>


