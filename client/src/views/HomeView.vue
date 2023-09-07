<template>
  <div>
      <!-- create a data table using the contact array as the value and the contact tableheaders as the headers -->
        <v-toolbar dense flat class="mt-5">
            <v-text-field label="Search bar" outlined dense v-model="search"/>
            <v-spacer/>
            <v-btn color="primary" @click="openDialog('ADD')">Add Contact</v-btn>
        </v-toolbar>
      <v-data-table :search="search" :headers="contact_tableHeaders" :items="contact_array" :items-per-page="5" class="elevation-1">
          <template v-slot:[`item.action`]="{ item }">
              <v-icon small class="mr-2" @click="openDialog(item)">mdi-pencil</v-icon>
              <v-icon small @click="deleteContact(item)">mdi-delete</v-icon>
          </template>
      </v-data-table>      
      <!-- <dialogView :closeDialog_parent="closeDialog"  :parent_dialog="dialog" :contact_value="contact_object" :dialog_status="dialog_status" /> -->
  </div>
</template>

<script>
// import dialogView from '../components/Contacts/Add_Edit_Dialog.vue'
import { GetContacts, SoftDeleteContact } from '../assets/functions/contacts.js'
  export default {
        components:{
            // dialogView
        },
      data() {
          return {
            search:"",
            dialog_status:'',
            contact_object:{},
            contact_array: [],
            contact_tableHeaders:[
                {text:'Id',value:'id'},
                {text:'Name',value:'name'},
                {text:'Address',value:'address'},
                {text:'Email',value:'email'},
                {text:'Contact No.',value:'contact_no'},
                {text:'Action',value:'action'},
            ],
            dialog:false
          }
      },
      created () {
          this.getContacts()
      },
        methods: {
            getContacts(){
                GetContacts().then((response) => {
                     this.contact_array = response.data
                })  
            },
            openDialog(item){
                //change url from home to /contacts/new
                if(item =='ADD'){
                    this.$router.push({name:'contact',params:{id:'new'}})
                }else{   
                    this.$router.push({name:'contact',params:{id:item.id}})
                }
            },
            deleteContact(item){
                SoftDeleteContact(item.id).then(()=>{
                    this.getContacts()
                })
            }
        },
  }
</script>

<style lang="scss" scoped>

</style>