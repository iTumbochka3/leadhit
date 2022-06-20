import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        websiteIdLength: 24
    },
    getters: {
        getWebsiteIdLength: state => {
            return state.websiteIdLength;
        },
    }
});