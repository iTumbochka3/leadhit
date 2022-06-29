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

export default {
  name: 'AuthPage',
  data() {
    return {
      loading: false,
      inputText: 'id сайта',
      websiteIdLength: 24,
      websiteId: '5f8475902b0be670555f1bb3',
      rules: {
        required: value => !!value || 'Обязательное поле.',
      },
    }
  },
  computed: {
    apiKey() {
      return this.$store.getters.getApiKey;
    },
  },
  mounted() {
    document.title = 'LeadHit';
  },
  methods: {
    counter(value) {
      return value.length == this.websiteIdLength || `id сайта должен содержать ${this.websiteIdLength} символа`;
    },
    login() {
      if (this.websiteId.length == this.websiteIdLength) {
        this.loading = true;
        this.$store.dispatch('login', { password: this.websiteId })
          .then((response) => {
            console.log('successful', response.data);
            localStorage.setItem('leadhit-site-id', this.websiteId);
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