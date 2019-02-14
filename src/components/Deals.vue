<template>

  <v-card class="pa-4 mx-sm-4">

    <TopSection :title="instanceName" @print="printList" @export="exportList" />

    <Accordion>

      <v-layout row wrap class="p-3">

        <v-flex xs12 sm6 md4 lg3 class="px-sm-4">
          <v-menu ref="date1" v-model="date1" :close-on-content-click="false"
            :nudge-right="40" lazy transition="scale-transition" 
            offset-y full-width max-width="290px" min-width="290px">
            <v-text-field slot="activator" v-model="initialDate" label="Data inicial" readonly></v-text-field>
            <v-date-picker v-model="initialDate" type="month" color="primary" :show-current="false" locale="pt" year-icon="calendar_today" scrollable>
            </v-date-picker>
          </v-menu>
        </v-flex>

        <v-flex xs12 sm6 md4 lg3 class="px-sm-4">
          <v-menu ref="date2" v-model="date2" :close-on-content-click="false"
            :nudge-right="40" lazy transition="scale-transition" 
            offset-y full-width max-width="290px" min-width="290px">
            <v-text-field slot="activator" v-model="endDate" label="Data final" readonly></v-text-field>
            <v-date-picker v-model="endDate" type="month" color="primary" :show-current="false" locale="pt" year-icon="calendar_today" scrollable>
            </v-date-picker>
          </v-menu>
        </v-flex>          

        <v-flex xs12 sm6 md4 lg3 class="px-sm-4">
          <v-select v-model="selectedDealType" :items="getDistinct('dealType')" label="Tipo transação" multiple dense>  
            <template slot="selection" slot-scope="{ item, index }">
              <v-chip small v-if="index === 0">
                <span>{{ item }}</span>
              </v-chip>
              <span v-if="index === 1" class="grey--text caption">(+{{ selectedDealType.length - 1 }})</span>
            </template>              
            <v-list-tile slot="prepend-item" ripple @click="toggleAll('dealType')">
              <v-list-tile-action>
                <v-icon v-if="selectAll('dealType')" :color="selectedDealType.length > 0 ? 'primary' : ''">check_box</v-icon>
                <v-icon v-else-if="selectSome('dealType')" :color="selectedDealType.length > 0 ? 'primary' : ''">indeterminate_check_box</v-icon>
                <v-icon v-else :color="selectAll('dealType').length > 0 ? 'primary' : ''">check_box_outline_blank</v-icon>
              </v-list-tile-action>
              <v-list-tile-title>Selecionar todas</v-list-tile-title>
            </v-list-tile>
            <v-divider slot="prepend-item" class="mt-2"></v-divider>
          </v-select>
        </v-flex>

        <v-flex xs12 sm6 md4 lg3 class="px-sm-4">
          <div slot="label" class="radio-label">Privatização?</div>
            <v-radio-group v-model="privatization" row>
              <v-radio color="primary" label="Sim" value="yes"></v-radio>
              <v-radio color="primary" label="Não" value="no"></v-radio>
            </v-radio-group>
        </v-flex>

        <v-flex xs12 sm6 md4 lg3 class="px-sm-4">
          <div slot="label" class="radio-label">P.E Comprador?</div>
            <v-radio-group v-model="peBuyer" row>
              <v-radio color="primary" label="Sim" value="yes"></v-radio>
              <v-radio color="primary" label="Não" value="no"></v-radio>
            </v-radio-group>
        </v-flex>

        <v-flex xs12 sm6 md4 lg3 class="px-sm-4">
          <v-select v-model="selectedBuyerCountry" :items="getDistinct('buyerCountry')" label="País grupo / matriz" multiple dense>
            <template slot="selection" slot-scope="{ item, index }">
              <v-chip small v-if="index === 0">
                <span>{{ item }}</span>
              </v-chip>
              <span v-if="index === 1" class="grey--text caption">(+{{ selectedBuyerCountry.length - 1 }})</span>
            </template>              
            <v-list-tile slot="prepend-item" ripple @click="toggleAll('buyerCountry')">
              <v-list-tile-action>
                <v-icon v-if="selectAll('buyerCountry')" :color="selectedBuyerCountry.length > 0 ? 'primary' : ''">check_box</v-icon>
                <v-icon v-else-if="selectSome('buyerCountry')" :color="selectedBuyerCountry.length > 0 ? 'primary' : ''">indeterminate_check_box</v-icon>
                 <v-icon v-else :color="selectAll('buyerCountry').length > 0 ? 'primary' : ''">check_box_outline_blank</v-icon>
              </v-list-tile-action>
              <v-list-tile-title>Selecionar todas</v-list-tile-title>
            </v-list-tile>
            <v-divider slot="prepend-item" class="mt-2"></v-divider>
          </v-select>
        </v-flex>

        <v-flex xs12 sm6 md4 lg3 class="px-sm-4">
          <v-select v-model="selectedDealedSIC" :items="getDistinct('dealedSIC')" label="Setor / Indústria" multiple dense>
            <template slot="selection" slot-scope="{ item, index }">
              <v-chip small v-if="index === 0">
                <span>{{ item }}</span>
              </v-chip>
              <span v-if="index === 1" class="grey--text caption">(+{{ selectedDealedSIC.length - 1 }})</span>
            </template>              
            <v-list-tile slot="prepend-item" ripple @click="toggleAll('dealedSIC')">
              <v-list-tile-action>
                <v-icon v-if="selectAll('dealedSIC')" :color="selectedDealedSIC.length > 0 ? 'primary' : ''">check_box</v-icon>
                <v-icon v-else-if="selectSome('dealedSIC')" :color="selectedDealedSIC.length > 0 ? 'primary' : ''">indeterminate_check_box</v-icon>
                <v-icon v-else :color="selectSome('dealedSIC').length > 0 ? 'primary' : ''">check_box_outline_blank</v-icon>
              </v-list-tile-action>
              <v-list-tile-title>Selecionar todas</v-list-tile-title>
            </v-list-tile>
            <v-divider slot="prepend-item" class="mt-2"></v-divider>
          </v-select>
        </v-flex>

        <v-flex xs12 sm6 md4 lg3 class="px-sm-4">
          <v-select v-model="selectedDealedCountry" :items="getDistinct('dealedCountry')" label="País onde ocorreu a transação" multiple dense>
            <template slot="selection" slot-scope="{ item, index }">
              <v-chip small v-if="index === 0">
                <span>{{ item }}</span>
              </v-chip>
              <span v-if="index === 1" class="grey--text caption">(+{{ selectedDealedCountry.length - 1 }})</span>
            </template>              
            <v-list-tile slot="prepend-item" ripple @click="toggleAll('dealedCountry')">
              <v-list-tile-action>
                <v-icon v-if="selectAll('dealedCountry')" :color="selectedDealedCountry.length > 0 ? 'primary' : ''">check_box</v-icon>
                <v-icon v-else-if="selectSome('dealedCountry')" :color="selectedDealedCountry.length > 0 ? 'primary' : ''">indeterminate_check_box</v-icon>
                <v-icon v-else :color="selectSome('dealedCountry').length > 0 ? 'primary' : ''">check_box_outline_blank</v-icon>                
              </v-list-tile-action>
              <v-list-tile-title>Selecionar todas</v-list-tile-title>
            </v-list-tile>
            <v-divider slot="prepend-item" class="mt-2"></v-divider>
          </v-select>
        </v-flex> 

        <v-flex xs12 sm6 md4 lg3 class="px-sm-4">
          <v-select v-model="selectedRegion" :items="getDistinct('region')" label="Região" multiple dense>
            <template slot="selection" slot-scope="{ item, index }">
              <v-chip small v-if="index === 0">
                <span>{{ item }}</span>
              </v-chip>
              <span v-if="index === 1" class="grey--text caption">(+{{ selectedRegion.length - 1 }})</span>
            </template>              
            <v-list-tile slot="prepend-item" ripple @click="toggleAll('region')">
              <v-list-tile-action>
                <v-icon v-if="selectAll('region')" :color="selectedRegion.length > 0 ? 'primary' : ''">check_box</v-icon>
                <v-icon v-else-if="selectSome('region')" :color="selectedRegion.length > 0 ? 'primary' : ''">indeterminate_check_box</v-icon>
                <v-icon v-else :color="selectSome('region').length > 0 ? 'primary' : ''">check_box_outline_blank</v-icon>
              </v-list-tile-action>
              <v-list-tile-title>Selecionar todas</v-list-tile-title>
            </v-list-tile>
            <v-divider slot="prepend-item" class="mt-2"></v-divider>
          </v-select>
        </v-flex> 

        <v-flex xs12 sm6 md4 lg3 class="px-sm-4">
          <v-select v-model="selectedState" :items="getDistinct('state')" label="Estado" multiple dense>
            <template slot="selection" slot-scope="{ item, index }">
              <v-chip small v-if="index === 0">
                <span>{{ item }}</span>
              </v-chip>
              <span v-if="index === 1" class="grey--text caption">(+{{ selectedState.length - 1 }})</span>
            </template>              
            <v-list-tile slot="prepend-item" ripple @click="toggleAll('state')">
              <v-list-tile-action>
                <v-icon v-if="selectAll('state')" :color="selectedState.length > 0 ? 'primary' : ''">check_box</v-icon>
                <v-icon v-else-if="selectSome('state')" :color="selectedState.length > 0 ? 'primary' : ''">indeterminate_check_box</v-icon>
                <v-icon v-else :color="selectSome('state').length > 0 ? 'primary' : ''">check_box_outline_blank</v-icon>
              </v-list-tile-action>
              <v-list-tile-title>Selecionar todas</v-list-tile-title>
            </v-list-tile>
            <v-divider slot="prepend-item" class="mt-2"></v-divider>
          </v-select>
        </v-flex>

        <v-flex xs12 sm6 md4 lg3 class="px-sm-4 mt-2">
          <v-btn class="colored-shadow" :disabled="listPopup" :loading="listPopup" color="primary mx-0" @click="listPopup = true">Listar Transações</v-btn>
          <v-dialog v-model="listPopup" hide-overlay persistent width="300">
            <v-card color="primary" dark>
              <v-card-text>
                Por favor, aguarde...
                <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
              </v-card-text>
            </v-card>
          </v-dialog>          
        </v-flex>

      </v-layout>
    </Accordion>

    <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition" >
        <v-card>
        
          <v-toolbar dark color="primary">
            <v-btn icon dark @click="dialog = false">
              <v-icon>close</v-icon>
            </v-btn>
            <v-toolbar-title>{{ formTitle }}</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
              <v-btn dark flat @click="save">Salvar</v-btn>
            </v-toolbar-items>
          </v-toolbar>

          <v-card-text>
              <v-container grid-list-md>
                <v-layout wrap>
                    <v-flex xs12 md2 sm4>
                      <v-text-field style="max-width: 200px;" v-model="editedItem.dealNumber" label="Número"></v-text-field>
                    </v-flex>
                    <v-flex xs12 md3 offset-md1 sm4>
                      <div slot="label" class="radio-label">CA</div>
                        <v-radio-group v-model="editedItem.ca" row>
                          <v-radio color="primary" label="Sim" value="yes"></v-radio>
                          <v-radio color="primary" label="Não" value="no"></v-radio>
                        </v-radio-group>
                    </v-flex>
                    <v-flex xs12 md3 sm4>
                      <div slot="label" class="radio-label">Privatização?</div>
                        <v-radio-group v-model="editedItem.privatization" row>
                          <v-radio color="primary" label="Sim" value="yes"></v-radio>
                          <v-radio color="primary" label="Não" value="no"></v-radio>
                        </v-radio-group>
                    </v-flex>                    
                    <v-flex xs12>
                      <v-divider></v-divider>
                    </v-flex>                    
                </v-layout>
                <v-layout wrap>
                  <v-flex md5 style="max-width: 460px">
                    <h3>Comprador</h3>
                    <p class="mt-3">Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos vitae nulla laboriosam nesciunt reprehenderit distinctio accusamus itaque qui sapiente! Veritatis molestiae, sequi distinctio optio adipisci aliquid itaque officia rem earum.</p>
                  </v-flex>
                  <v-flex md4 offset-md1>
                    <v-flex xs12>
                      <v-text-field v-model="editedItem.buyerCompany" label="Nome da empresa"></v-text-field>  
                      <v-select :items="getDistinct('dealType')" v-model="editedItem.dealType" label="SIC"></v-select>
                      <v-select :items="getDistinct('buyerCountry')" v-model="editedItem.buyerCountry" label="País da empresa compradora"></v-select>
                      <div slot="label" class="radio-label">P.E?</div>
                        <v-radio-group v-model="editedItem.pe" row>
                          <v-radio color="primary" label="Sim" value="yes"></v-radio>
                          <v-radio color="primary" label="Não" value="no"></v-radio>
                        </v-radio-group>
                      <v-text-field v-model="editedItem.buyerGroup" label="Grupo a que pertence"></v-text-field>
                      <v-select :items="getDistinct('dealedCountry')" v-model="editedItem.dealedCountry" label="País do grupo ou matriz"></v-select>
                      <div slot="label" class="radio-label">Origem do capital do grupo ou matriz</div>
                        <v-radio-group v-model="editedItem.capitalSource" row>
                          <v-radio color="primary" label="Nacional" value="national"></v-radio>
                          <v-radio color="primary" label="Internacional" value="international"></v-radio>
                        </v-radio-group>
                      <v-select :items="getDistinct('groupContinent')" v-model="editedItem.groupContinent" label="Continente do grupo ou matriz"></v-select> 
                      <v-text-field v-model="editedItem.advisor" label="Acessor"></v-text-field>
                      <div slot="label" class="radio-label">Principal comprador?</div>
                        <v-radio-group v-model="editedItem.mainBuyer" row>
                          <v-radio color="primary" label="Sim" value="yes"></v-radio>
                          <v-radio color="primary" label="Não" value="no"></v-radio>
                        </v-radio-group>                      
                    </v-flex>
                  </v-flex>
                  <v-flex xs12>
                    <v-divider></v-divider>
                  </v-flex>                                    
                </v-layout>
                <v-layout wrap>
                  <v-flex md5 style="max-width: 460px">
                    <h3>Vendedor</h3>
                    <p class="mt-3">Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos vitae nulla laboriosam nesciunt reprehenderit distinctio accusamus itaque qui sapiente! Veritatis molestiae, sequi distinctio optio adipisci aliquid itaque officia rem earum.</p>
                  </v-flex>
                  <v-flex md4 offset-md1>
                    <v-flex xs12>
                      <p>Formulário de cadastro relacionado ao vendedor.</p>                     
                    </v-flex>
                  </v-flex>
                  <v-flex xs12>
                    <v-divider></v-divider>
                  </v-flex>                    
                </v-layout>
                <v-layout wrap>
                  <v-flex md5 style="max-width: 460px">
                    <h3>Transação</h3>
                    <p class="mt-3">Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos vitae nulla laboriosam nesciunt reprehenderit distinctio accusamus itaque qui sapiente! Veritatis molestiae, sequi distinctio optio adipisci aliquid itaque officia rem earum.</p>
                  </v-flex>
                  <v-flex md4 offset-md1>
                    <v-flex xs12>
                      <p>Formulário de cadastro relacionado à transação.</p>                     
                    </v-flex>
                  </v-flex>
                  <v-flex xs12>
                    <v-divider></v-divider>
                  </v-flex>                    
                </v-layout> 
                <v-layout wrap>
                  <v-flex md5 style="max-width: 460px">
                    <h3>Empresa negociada</h3>
                    <p class="mt-3">Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos vitae nulla laboriosam nesciunt reprehenderit distinctio accusamus itaque qui sapiente! Veritatis molestiae, sequi distinctio optio adipisci aliquid itaque officia rem earum.</p>
                  </v-flex>
                  <v-flex md4 offset-md1>
                    <v-flex xs12>
                      <p>Formulário de cadastro relacionado à empresa negociada.</p>                     
                    </v-flex>
                  </v-flex>
                  <v-flex xs12>
                    <v-divider></v-divider>
                  </v-flex>                    
                </v-layout>                                
              </v-container>
          </v-card-text>

          <v-card-actions>
              <v-spacer></v-spacer>
              <div class="mb-3">
                <v-btn color="primary" @click="close">Cancelar</v-btn>
                <v-btn color="primary" @click="save">Salvar</v-btn>
              </div>
          </v-card-actions>
        </v-card>
    </v-dialog>           

    <div class="mb-2" style="position: relative">
      
      <v-card-title>
        <v-text-field style="max-width: 14rem;" v-model="search" append-icon="search" label="Buscar na listagem" single-line hide-details></v-text-field>
      </v-card-title>

      <v-data-table :headers="headers" :items="dataTable" :search="search" hide-actions :pagination.sync="pagination">
        <template slot="items" slot-scope="props">
          <td :class="{ dimmed: props.item.isDraft }">{{ props.item.dealNumber }}</td>
          <td :class="{ dimmed: props.item.isDraft }" class="text-xs-left">{{ props.item.dealDate }}</td>
          <td :class="{ dimmed: props.item.isDraft }" class="text-xs-left">{{ props.item.dealType }}</td>
          <td :class="{ dimmed: props.item.isDraft }" class="text-xs-left">{{ props.item.buyerCompany }}</td>
          <td :class="{ dimmed: props.item.isDraft }" class="text-xs-left d-flex-column align-center">
            {{ props.item.buyerGroup }}
            <p class="mb-0"><small style="color: rgba(0,0,0,.54)">{{ props.item.buyerCountry }}</small></p>
          </td>
          <td :class="{ dimmed: props.item.isDraft }" class="text-xs-left">{{ props.item.sellerCompany }}</td>
          <td :class="{ dimmed: props.item.isDraft }" class="text-xs-left d-flex-column align-center">
            {{ props.item.dealedCompany }}
            <p class="mb-0"><small style="color: rgba(0,0,0,.54)">{{ props.item.dealedCountry }}</small></p>
          </td>
          <td :class="{ dimmed: props.item.isDraft }" class="text-xs-left">{{ props.item.region }}</td>
          <td :class="{ dimmed: props.item.isDraft }" class="text-xs-right">{{ props.item.dealValue }}</td>
          <td :class="{ dimmed: props.item.isDraft }" class="text-xs-left">{{ props.item.dealedSIC }}</td>
          <td class="justify-space-around layout px-0">
            <v-icon small class="mr-2" @click="editItem(props.item)">edit</v-icon>
            <v-icon small class="mr-2" @click="showItem(props.item)">visibility</v-icon>
            <v-icon small @click="deleteItem(props.item)">delete</v-icon>
          </td>
        </template>
        <div slot="no-results">
          <div class="empty-state">
            <v-icon>search</v-icon>
            <h1>Nenhum item encontrado</h1>
            <p>A busca por '{{ search }}' não retornou nenhum registro. Tente novamente ou crie um novo.</p>
          </div>
        </div>
      </v-data-table>
      <small>&bull;&nbsp;As linhas com aparência esmaecida representam rascunhos.</small>

      <v-tooltip left>
        <v-btn @click="dialog = true" slot="activator" class="colored-shadow" style="margin-right: -1.5rem; margin-top: 3rem;" absolute dark fab top right color="primary">
          <v-icon>add</v-icon>
        </v-btn>
        <span>Nova transação</span>
      </v-tooltip> 

      <div class="text-xs-right pt-2 my-3">
        <v-pagination circle style="outline: none" v-model="pagination.page" :length="pages"></v-pagination>
      </div>               

    </div>

  </v-card>

</template>

<script>
import my_data from "../datas/deals.json";
import TopSection from "./shared/TopSection";
import Accordion from "./shared/Accordion";

import { generalMixin } from '../mixins/generalMixin'

export default {
  mixins: [ generalMixin ],
  name: "Deals",
  data: () => ({
    instanceName: "Transações",
    editedItem: { dealNumber: 0, dealDate: '21/02/18', dealType: '', buyerCompany: '', buyerGroup: '', buyerCountry: '', sellerCompany: '', dealedCompany: '', dealedCountry: '', region: '', state: '', dealValue: '', dealedSIC: '', ca: "", capitalSource: "", advisor: "", mainBuyer: "", isDraft: "", groupContinent: "", privatization: "" },
    defaultItem: { dealNumber: 0, dealDate: '21/02/18', dealType: '', buyerCompany: '', buyerGroup: '', buyerCountry: '', sellerCompany: '', dealedCompany: '', dealedCountry: '', region: '', state: '', dealValue: '', dealedSIC: '', ca: "", capitalSource: "", advisor: "", mainBuyer: "", isDraft: "", groupContinent: "", privatization: "" },
    initialDate: new Date().toISOString().substr(0, 7),
    endDate: new Date().toISOString().substr(0, 7),
    date1: false,
    date2: false,
    selectedDealType: [],
    selectedBuyerGroup: [],
    selectedDealedSIC: [],
    selectedBuyerCountry: [],
    selectedDealedCountry: [],
    selectedRegion: [],
    selectedState: [],
    selectedFirstDate: new Date(),
    selectedLastDate: new Date(),
    privatization: "",
    peBuyer: "",
    dataTable: my_data,
    headers: [
      { text: "Número", align: "left", value: "dealNumber" },
      { text: "Data", value: "dealDate" },
      { text: "Tipo de transação", value: "dealType" },
      { text: "Comprador", value: "buyerCompany" },
      { text: "Grupo pertencente", value: "" },
      { text: "Vendedor", value: "sellerCompany" },
      { text: "Target", value: "dealedCompany" },
      { text: "Região", value: "region" },
      { text: "USD (MM)", value: "dealValue" },
      { text: "Setor / Indústria", value: "dealedSIC" },
      { text: "Ações", value: "" }
    ]
  }),
  watch: {
    listPopup (val) {
      if (!val) return

      setTimeout(() => (this.listPopup = false), 3000)
    },
    dialog (val) { val || this.close() }    
  },
  components: {
    TopSection,
    Accordion
  }
};
</script>

<style lang="scss">

</style>
