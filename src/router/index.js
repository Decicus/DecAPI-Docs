import Vue from 'vue';
import VueResource from 'vue-resource';
import Router from 'vue-router';
import EndpointList from '@/components/EndpointList';
import Home from '@/components/Home';
import yaml from 'js-yaml';

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
    },
];

Vue.use(Router);
Vue.use(VueResource);

Vue.http.get('/static/yaml/base/base_endpoints.yaml').then((response) => {
    const baseEndpoints = yaml.load(response.body);
    baseEndpoints.forEach((base) => {
        const { title, name } = base;
        routes.push({
            path: `/${title}`,
            name,
            component: EndpointList,
        });
    });
});

export default new Router({
    routes,
});
