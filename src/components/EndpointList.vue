<template>
    <div id="app">
        <h2>Endpoints:
            {{ this.$route.name }}
        </h2>

        <div class="list-group" v-if="endpoints.length > 0">
            <a class="list-group-item" v-for="endpoint in endpoints">
                {{ basePath }}/{{ endpoint.route }}
            </a>
        </div>
    </div>
</template>

<script>
    import yaml from 'js-yaml';

    export default {
        name: 'EndpointList',
        data() {
            return {
                basePath: '',
                endpoints: [],
            };
        },

        mounted() {
            const path = this.$route.path.replace('/', '');
            this.$http.get(`/static/yaml/endpoints/${path}.yaml`).then((response) => {
                const { body } = response;
                const data = yaml.load(body);

                const basePath = data.base_path;
                const endpoints = data.endpoints;

                this.basePath = basePath;
                this.endpoints = endpoints;
            });
        },
    };
</script>
