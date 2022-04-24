import Vue from 'vue';
import VueResource from 'vue-resource';
import Router from 'vue-router';
import yaml from 'js-yaml';
import EndpointList from '../components/EndpointList.vue';
import Home from '../components/Home.vue';
import Changelog from '../components/Changelog.vue';
import Contact from '../components/Contact.vue';
import CachedEndpoints from '../components/Cached.vue';

Vue.use(Router);
Vue.use(VueResource);

const router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Home,
        },
        {
            path: '/changelog',
            name: 'Changelog',
            component: Changelog,
        },
        {
            path: '/contact',
            name: 'Contact',
            component: Contact,
        },
        {
            path: '/cached-endpoints',
            name: 'Cached endpoints',
            component: CachedEndpoints,
        },
    ],
});
const yamlPath = '/static/yaml';

Vue.http.get(`${yamlPath}/base/base_endpoints.yaml`).then((response) => {
    const baseEndpoints = yaml.load(response.body);
    const routes = [];
    baseEndpoints.forEach((base) => {
        const { title, name } = base;
        routes.push({
            path: `/${name}`,
            name: title,
            component: EndpointList,
        });
    });

    router.addRoutes(routes);
});

export default router;
