<template>
  <div>
      <v-card>
          <v-card-title primary-title>
              {{ dialog_status }} CONTACT <v-spacer></v-spacer> <v-btn icon @click="closeDialog()"><v-icon>mdi-close-circle</v-icon></v-btn>
          </v-card-title>
          <v-card-text>
              <!-- create a textfield for name, email, address, contact_no with no spacing between the y axis of the textfield -->
              <v-text-field label="Name" v-model="contact_object.name" required clearable outlined dense class="mt-0" />
              <v-text-field label="Email" v-model="contact_object.email" required clearable outlined dense class="mt-n5" />
              <v-text-field label="Address" v-model="contact_object.address" required clearable outlined dense class="mt-n5" />
              <v-text-field label="Contact No." v-model="contact_object.contact_no" required clearable outlined dense class="mt-n5" />
          </v-card-text>
          <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" @click="save()">Cancel</v-btn>
              <v-btn color="primary" @click="save()">Save</v-btn>
          </v-card-actions>
      </v-card>
  </div>
</template>

<script>
import {AddContact, UpdateContact,GetBy_ID} from '../assets/functions/contacts.js'
  export default {
      data() {
          return {
              dialog: false,
              contact_object:{},
              dialog_status:'',
          }
      },
      methods: {
          closeDialog(){
            this.$router.push({name:'home'})
          },
          save(){
              try {
                  let keys = ['name', 'email', 'address', 'contact_no']
                  for(let key of keys){
                      if([null,'',undefined].includes(this.contact_object[key])){
                          alert('Please fill up all fields')
                          throw new Error('Please fill up all fields')
                      }
                  }
                  if(this.dialog_status == 'ADD'){
                      AddContact(this.contact_object).then(() => {
                        this.$router.push({name:'home'})
                      })
                  }else if(this.dialog_status == 'EDIT'){
                      UpdateContact(this.contact_object).then(() => {
                        this.$router.push({name:'home'})
                      })
                  }
              } catch (error) {
                  this.contact_object = this.contact_value
              }
          }
      },
      created () {
        let id = this.$route.params.id
        if(isNaN(+id) && id!='new'){
            this.$router.push({name:'contact',params:{id:'new'}})
        }
        this.dialog_status = ![NaN,'new'].includes(+id)?'EDIT':'ADD'
        if(this.dialog_status == 'EDIT'){
            GetBy_ID(id).then((response) => {
                console.log(response)
                this.contact_object = response.data
            })
        }
      },
  }
</script>

<style lang="scss" scoped>
</style>