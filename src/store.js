import Vue from 'vue';
import VueResource from 'vue-resource';
import Vuex from 'vuex';
import yaml from 'js-yaml';

Vue.use(VueResource);
Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        baseEndpoints: [],
    },
    actions: {
        LOAD_BASE_ENDPOINTS({ commit }) {
            Vue.http.get('/static/yaml/base/base_endpoints.yaml').then(({ body }) => {
                const baseEndpoints = yaml.load(body);
                commit('UPDATE_BASE_ENDPOINTS', {
                    baseEndpoints,
                });
            });
        },
    },
    mutations: {
        UPDATE_BASE_ENDPOINTS: (state, { baseEndpoints }) => {
            state.baseEndpoints = baseEndpoints;
        },
    },
    getters: {
        getBase(state) {
            return state.baseEndpoints;
        },
    },
});

export default store;
