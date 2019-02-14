const concatSelected = text => {
    return "selected" + text.charAt(0).toUpperCase() + text.slice(1);
}
export const generalMixin = {
    data: () => ({
        editedIndex: -1,
        search: "",
        dialog: false,
        listPopup: false,
        showDetailDialog: false,
        pagination: {},
    }),
    computed: {
        formTitle() {
            return this.editedIndex === -1 ? 'Criar ' + this.instanceName : 'Editar ' + this.instanceName
        },
        pages() {
            if (this.pagination.rowsPerPage == null || this.pagination.totalItems == null)
                return 0;
            return Math.ceil(
                this.pagination.totalItems / this.pagination.rowsPerPage
            );
        }
    },
    methods: {
        printList() {
            alert("Relatório será impresso.");
        },
        exportList() {
            alert("Relatório será exportado para excel.");
        },
        showItem() {
            alert("Mostra todos os dados do item da listagem.")
        },
        getDistinct(propertyName) {
            return [...new Set(this.dataTable.map(x => x[propertyName]).sort())];
        },
        selectAll(propertyName) {
            return this[concatSelected(propertyName)].length === this.getDistinct(propertyName).length;
        },
        selectSome(propertyName) {
            let myArray = concatSelected(propertyName)
            return this[myArray].length > 0 && !this.selectAll(propertyName);
        },
        toggleAll(propertyName) {
            let myArray = concatSelected(propertyName)
            this.$nextTick(() => {
                this.selectAll(propertyName) ?
                    (this[myArray] = []) :
                    (this[myArray] = this.getDistinct(propertyName).slice());
            });
        },
        editItem(item) {
            this.editedIndex = this.dataTable.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialog = true
        },
        deleteItem(item) {
            const index = this.dataTable.indexOf(item)
            confirm('Tem certeza de que deseja excluir o item ' + item.id + '?') && this.dataTable.splice(index, 1)
        },
        close() {
            this.dialog = false
            setTimeout(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
            }, 300)
        },
        save() {
            if (this.editedIndex > -1) {
                Object.assign(this.dataTable[this.editedIndex], this.editedItem)
            } else {
                this.dataTable.push(this.editedItem)
            }
            this.close()
        },

    }
}