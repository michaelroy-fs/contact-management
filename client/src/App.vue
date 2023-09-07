<template>
  <v-app>
    <v-app-bar app  dark>
      <v-toolbar-title>Contact Management System</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn text>Home</v-btn>
      <v-btn text>Contacts</v-btn>
      <v-btn text>Settings</v-btn>
    </v-app-bar>
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>

export default {

  data: () => ({
    //
  }),
};
</script>
