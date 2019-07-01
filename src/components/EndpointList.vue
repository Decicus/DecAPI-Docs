<template>
    <div id="app">
        <a href="/#toc" class="btn btn-sm btn-primary"><i class="fas fa-arrow-left fa-fw"></i> Back to endpoint categories</a>

        <br><br>

        <h2>
            Endpoints:
            {{ this.$route.name }}

            <div class="dropdown float-right">
                <button class="dropdown-toggle btn btn-info" data-toggle="dropdown" type="button">
                    <i class="fas fa-1x fa-fw fa-cog"></i> Bot example settings <span class="caret"></span>
                </button>

                <ul class="dropdown-menu dropdown-menu-right">
                    <li v-for="(bot) in Object.keys(bots)" :key="bot">
                        <a class="dropdown-item botSelection" v-on:click="bots[bot] = !bots[bot]; updateBotStore()">
                            <input type="checkbox" v-bind:checked="bots[bot]"> {{ botNames[bot] }}
                        </a>
                    </li>
                </ul>
            </div>
        </h2>

        <br>

        <div class="modal fade" id="endpoint">
            <div class="modal-dialog modal-lg mw-100 w-75">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title"><a v-bind:href="'?endpoint=' + route">{{ route }}</a></h4>
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true" aria-label="Close">&times;</button>
                    </div>

                    <div class="modal-body">
                        <template v-if="e.deprecated === true">
                            <div class="alert alert-danger">
                                <strong>Warning!</strong> This endpoint has been scheduled for deprecation and could be removed at any time.
                            </div>
                        </template>

                        <template v-if="e.notes && e.notes.length > 0">
                            <h4 class="text-muted">Notes:</h4>
                            <ul class="list-group text-primary" v-for="(note, index) in e.notes" id="notes" :key="index">
                                <li class="list-group-item" v-html="note.replace(/{{baseUrl}}/g, config.baseUrl)"></li>
                            </ul>
                        </template>


                        <br>

                        <p class="text-muted">
                            Not a developer? Confused? Please read the part of the homepage <a href="/#nondev">dedicated to non-developers</a>, which tries to explain some of these things.
                            <br>
                            Still confused? Feel free to <a v-bind:href="config.discordUrl">visit our Discord server</a> and you will most likely get help with your issue.
                        </p>

                        <br>

                        <h4 class="text-muted">Standard request:</h4>
                        <p>Please remember that the <code>:</code> in front of each parameter is just a placeholder and should not be included in the request.
                        <br>
                        Example: If your channel name or username is <code>decicus</code>, then you would put just <code>decicus</code> and <strong>NOT</strong> <code>:decicus</code> or <code>:decicus</code>.</p>
                        <pre><strong class="text-primary">{{ e.method || 'GET' }}</strong> <kbd>{{ config.baseUrl + route }}</kbd></pre>

                        <div id="bots" v-if="e.bots !== undefined && e.bots !== false">
                            <template v-if="bots.nightbot">
                                <!-- Nightbot -->
                                <strong class="text-primary"><a href="https://beta.nightbot.tv/">Nightbot</a> command:</strong>
                                <pre><kbd>$(urlfetch {{ e.url }})</kbd></pre>
                            </template>

                            <template v-if="bots.ankhbot">
                                <!-- Ankhbot / Streamlabs Chatbot -->
                                <strong class="text-primary"><a href="https://streamlabs.com/chatbot">Streamlabs Chatbot</a> command:</strong>
                                <pre><kbd>$readapi({{ e.url }})</kbd></pre>
                            </template>

                            <template v-if="bots.slcloudbot">
                                <!-- Streamlabs Cloudbot -->
                                <strong class="text-primary"><a href="https://streamlabs.com/cloudbot">Streamlabs Cloudbot</a> command:</strong>
                                <pre><kbd>{readapi.{{ e.url }}}</kbd></pre>
                            </template>


                            <template v-if="bots.streamelements">
                                <strong class="text-primary"><a href="https://streamelements.com/">StreamElements</a> command:</strong>
                                <pre><kbd>${customapi.{{ e.url }}}</kbd></pre>
                            </template>

                            <template v-if="bots.fossabot">
                                <strong class="text-primary"><a href="https://fossabot.com/">Fossabot</a> command:</strong>
                                <pre><kbd>$(customapi {{ e.url }})</kbd></pre>
                            </template>

                            <template v-if="bots.deepbot">
                                <!-- Deepbot -->
                                <strong class="text-primary"><a href="https://deepbot.deep.sg/">Deepbot</a> command:</strong>
                                <pre><kbd>@customapi@[{{ e.url }}]</kbd></pre>
                            </template>

                            <template v-if="bots.phantombot">
                                <!-- PhantomBot -->
                                <strong class="text-primary"><a href="https://phantombot.tv/">PhantomBot</a> command:</strong>
                                <pre><kbd>(customapi {{ e.url }})</kbd></pre>
                            </template>

                            <template v-if="bots.ohbot">
                                <!-- Ohbot -->
                                <strong class="text-primary"><a href="https://ohbot.3v.fi/">Ohbot</a> command:</strong>
                                <pre><kbd>[customapi {{ e.url }}]</kbd></pre>
                            </template>
                        </div>

                        <br>

                        <div id="routes" v-if="e.parameters && e.parameters.length > 0">
                            <h4 class="text-muted">Route parameters:</h4>

                            <table class="table table-bordered table-striped table-hover" id="route-body">
                                <thead>
                                    <tr>
                                        <th>Parameter name:</th>
                                        <th>Description:</th>
                                        <th>Required:</th>
                                        <th>Type:</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(p, index) in e.parameters" :key="index">
                                        <th>{{ p.name }}</th>

                                        <td v-if="Array.isArray(p.description)" v-html="p.description.join('<br>')"></td>
                                        <td v-else v-html="p.description"></td>

                                        <td><i class="fa fa-1x" v-bind:class="p.optional ? 'fa-times' : 'fa-check'"></i></td>
                                        <td><code>{{ p.type || 'string' }}</code></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <br>

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
                                    <tr v-for="(p, index) in e.qs" :key="index">
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
            <a class="list-group-item endpointListItem" v-for="(endpoint, index) in endpoints" v-on:click="openModal(endpoint.route)" :key="index">
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

    /**
     * Set default setting in "Bot example settings" dropdown.
     */
    const bots = {
        ankhbot: true,
        slcloudbot: true,
        deepbot: false,
        fossabot: true,
        nightbot: true,
        ohbot: false,
        phantombot: false,
        streamelements: true,
    };

    export default {
        name: 'EndpointList',
        data() {
            return {
                basePath: '',
                bots,
                /**
                 * Display names in "Bot example settings" dropdown.
                 */
                botNames: {
                    ankhbot: 'Streamlabs Chatbot',
                    slcloudbot: 'Streamlabs Cloudbot',
                    deepbot: 'Deepbot',
                    fossabot: 'Fossabot',
                    nightbot: 'Nightbot',
                    ohbot: 'Ohbot',
                    phantombot: 'PhantomBot',
                    streamelements: 'StreamElements',
                },
                config,
                // Endpoint data
                e: {
                    bots: true,
                    deprecated: false,
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

                        /**
                         * If an endpoint isn't targeted towards bots, it's explicitly marked as such.
                         * Default should be to assume it's targeted towards bots.
                         */
                        if (end.bots === undefined) {
                            end.bots = true;
                        }

                        this.e.deprecated = !!end.deprecated;

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
