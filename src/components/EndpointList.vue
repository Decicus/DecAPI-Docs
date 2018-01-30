<template>
    <div id="app">
        <h2>
            Endpoints:
            {{ this.$route.name }}

            <div class="dropdown pull-right">
                <button class="dropdown-toggle btn btn-info" data-toggle="dropdown" type="button">
                    <i class="fa fa-1x fa-cog"></i> Bot example settings <span class="caret"></span>
                </button>

                <ul class="dropdown-menu">
                    <li v-for="bot in Object.keys(bots)">
                        <a v-on:click="bots[bot] = !bots[bot]; updateBotStore()">
                            <input type="checkbox" v-bind:checked="bots[bot]"> {{ botNames[bot] }}
                        </a>
                    </li>
                </ul>
            </div>
        </h2>

        <div class="modal fade" id="endpoint">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4><a v-bind:href="'?endpoint=' + route">{{ route }}</a></h4>
                    </div>

                    <div class="modal-body">
                        <template v-if="e.notes && e.notes.length > 0">
                            <h4 class="text-muted">Notes:</h4>
                            <ul class="list-group text-primary" v-for="note in e.notes" id="notes">
                                <li class="list-group-item" v-html="note.replace(/{{baseUrl}}/g, config.baseUrl)"></li>
                            </ul>
                        </template>

                        <h4 class="text-muted">Standard request:</h4>
                        <p>Please remember that the <code>:</code> in front of each parameter is just a placeholder and should not be included in the request.</p>
                        <pre><strong class="text-primary">{{ e.method || 'GET' }}</strong> <code>{{ config.baseUrl + route }}</code></pre>

                        <div id="bots" v-if="e.bots !== false">
                            <template v-if="bots.nightbot">
                                <!-- Nightbot -->
                                <strong class="text-primary"><a href="https://beta.nightbot.tv/">Nightbot</a> command:</strong>
                                <pre><code>$(urlfetch {{ e.url }})</code></pre>
                            </template>

                            <template v-if="bots.ankhbot">
                                <!-- Ankhbot -->
                                <strong class="text-primary"><a href="https://streamlabs.com/chatbot">Streamlabs Chatbot (formerly Ankhbot)</a> command:</strong>
                                <pre><code>$readapi({{ e.url }})</code></pre>
                            </template>

                            <template v-if="bots.deepbot">
                                <!-- Deepbot -->
                                <strong class="text-primary"><a href="https://deepbot.deep.sg/">Deepbot</a> command:</strong>
                                <pre><code>@customapi@[{{ e.url }}]</code></pre>
                            </template>

                            <template v-if="bots.phantombot">
                                <!-- PhantomBot -->
                                <strong class="text-primary"><a href="https://phantombot.tv/">PhantomBot</a> command:</strong>
                                <pre><code>(customapi {{ e.url }})</code></pre>
                            </template>

                            <template v-if="bots.ohbot">
                                <!-- Ohbot -->
                                <strong class="text-primary"><a href="https://ohbot.3v.fi/">Ohbot</a> command:</strong>
                                <pre><code>[customapi {{ e.url }}]</code></pre>
                            </template>
                        </div>

                        <div id="routes" v-if="e.parameters && e.parameters.length > 0">
                            <h4 class="text-muted">Route parameters:</h4>

                            <table class="table table-bordered" id="route-body">
                                <thead>
                                    <tr>
                                        <th>Parameter name:</th>
                                        <th>Description:</th>
                                        <th>Required:</th>
                                        <th>Type:</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="p in e.parameters">
                                        <th>{{ p.name }}</th>

                                        <td v-if="Array.isArray(p.description)" v-html="p.description.join('<br>')"></td>
                                        <td v-else v-html="p.description"></td>

                                        <td><i class="fa fa-1x" v-bind:class="p.optional ? 'fa-times' : 'fa-check'"></i></td>
                                        <td><code>{{ p.type || 'string' }}</code></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div id="qs" v-if="e.qs && e.qs.length > 0">
                            <h4 class="text-muted">Query string parameters:</h4>

                            <table class="table table-bordered table-striped table-hover" id="qs-body">
                                <thead>
                                    <tr>
                                        <th>Parameter name:</th>
                                        <th>Description:</th>
                                        <th>Required:</th>
                                        <th>Type:</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="p in e.qs">
                                        <th>{{ p.name }}</th>

                                        <td v-if="Array.isArray(p.description)" v-html="p.description.join('<br>')"></td>
                                        <td v-else v-html="p.description"></td>

                                        <td><i class="fa fa-1x" v-bind:class="p.required ? 'fa-check' : 'fa-times'"></i></td>
                                        <td><code>{{ p.type || 'string' }}</code></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div class="modal-footer">
                        <button type="button" class="btn btn-danger" data-dismiss="modal"><i class="fa fa-times fa-1x"></i> Close</button>
                    </div>
                </div>
            </div>
        </div>

        <div class="list-group" v-if="endpoints.length > 0">
            <a class="list-group-item" v-for="endpoint in endpoints" v-on:click="openModal(endpoint.route)">
                {{ basePath }}/{{ endpoint.route }}
            </a>
        </div>
    </div>
</template>

<style>
    #notes a {
        text-decoration: underline;
    }
</style>

<script>
    import yaml from 'js-yaml';
    import jQuery from 'jquery';
    import 'bootstrap';
    import config from '../config';

    const $ = jQuery;
    const bots = {
        ankhbot: true,
        deepbot: false,
        nightbot: true,
        ohbot: false,
        phantombot: false,
    };

    export default {
        name: 'EndpointList',
        data() {
            return {
                basePath: '',
                bots,
                botNames: {
                    ankhbot: 'Streamlabs Chatbot (formerly Ankhbot)',
                    deepbot: 'Deepbot',
                    nightbot: 'Nightbot',
                    ohbot: 'Ohbot',
                    phantombot: 'PhantomBot',
                },
                config,
                // Endpoint data
                e: {
                    bots: true,
                    method: 'GET',
                    notes: [],
                    parameters: [],
                    qs: [],
                    url: '',
                },
                endpoints: [],
                route: this.$route.path,
            };
        },

        methods: {
            openModal(route) {
                this.route = `${this.$route.path}/${route}`;

                this.e.url = config.baseUrl + this.route;

                this.endpoints.forEach((end) => {
                    if (route !== end.route) {
                        return;
                    }

                    Object.keys(end).forEach((name) => {
                        if (this.e[name] !== undefined) {
                            this.e[name] = end[name];
                        }

                        if (!end.qs || end.qs.length === 0) {
                            this.e.qs = [];
                        }

                        if (!end.parameters || end.parameters.length === 0) {
                            this.e.parameters = [];
                        }
                    });

                    this.$router.push({
                        query: {
                            endpoint: route || '/',
                        },
                    });

                    $('#endpoint').modal('toggle');
                });
            },
            updateBotStore() {
                localStorage.setItem('bots', JSON.stringify(bots));
            },
        },

        mounted() {
            const path = this.$route.path.replace('/', '');
            const endpoint = this.$route.query.endpoint || '';

            this.$http.get(`/static/yaml/endpoints/${path}.yaml`).then((response) => {
                const { body } = response;
                const data = yaml.load(body);

                const basePath = data.base_path;
                const endpoints = data.endpoints;

                this.basePath = basePath;
                this.endpoints = endpoints;

                endpoints.forEach((end) => {
                    const route = decodeURIComponent(endpoint);
                    if (route === '') {
                        return;
                    }

                    if ((end.route === '' && route !== '/') || end.route !== route) {
                        return;
                    }

                    this.openModal(end.route);
                });
            });

            let getBots = localStorage.getItem('bots');

            if (getBots) {
                getBots = JSON.parse(getBots);

                Object.keys(getBots).forEach((name) => {
                    bots[name] = getBots[name];
                });
            }

            $('#endpoint').on('hidden.bs.modal', () => {
                this.$router.push({
                    query: {},
                });
            });

            $('.dropdown-menu').on({
                click: (e) => {
                    e.stopPropagation();
                },
            });
        },
    };
</script>
