<template>
  <v-card :loading="loading" class="mx-auto my-12" max-width="50%">
    <template slot="progress">
      <v-progress-linear height="5" indeterminate></v-progress-linear>
    </template>
    <v-card-title>LeadHit</v-card-title>
    <v-card-text>
      <v-text-field v-model="websiteId" :rules="[rules.required, counter]" :label="inputText" counter
        :maxlength="websiteIdLength">
      </v-text-field>
    </v-card-text>
    <v-card-actions>
      <v-btn text :disabled="websiteId.length != websiteIdLength" @click="login">
        Войти
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import axios from 'axios';

export default {
  name: 'AuthPage',
  data() {
    return {
      loading: false,
      inputText: 'id сайта',
      websiteId: '5f8475902b0be670555f1bb3',
      rules: {
        required: value => !!value || 'Обязательное поле.',
      },
    }
  },
  computed: {
    websiteIdLength() {
      return this.$store.getters.getWebsiteIdLength;
    },
  },
  mounted() {
    if(localStorage.getItem('leadhit-site-id')) {
      this.$router.push({ name: 'analytics' });
    }
  },
  methods: {
    counter(value) {
      return value.length == this.websiteIdLength || `id сайта должен содержать ${this.websiteIdLength} символа`;
    },
    login() {
      if (this.websiteId.length == this.websiteIdLength) {
        this.loading = true;

        axios.get('https://track-api.leadhit.io/client/test_auth', {
          headers: {
            'api-key': '5f8475902b0be670555f1bb3:eEZn8u05G3bzRpdL7RiHCvrYAYo',
            'leadhit-site-Id': this.websiteId,
          }
        })
          .then((response) => {
            console.log('successful', response.data);
            localStorage.setItem('leadhit-site-id', '5f8475902b0be670555f1bb3');
            this.$router.push({ name: 'analytics' });
          })
          .catch((error) => {
            console.log('error', error);
          })
          .finally(() => {
            this.loading = false;
          });
      }
    },
  },
}
</script>

<style>
</style>