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

        <div class="alert alert-info" v-if="this.$route.name === 'Twitter'">
            Twitter APIs have been officially removed as of <a href="https://twitter.com/Decicus/status/1708189451275456936">September 30th, 2023</a> and will no longer be maintained.
        </div>

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

                        <template v-if="e.cached === true">
                            <div class="alert alert-info">
                                This endpoint is cached and won't always be fully up-to-date. See the <a href="/cached-endpoints">Cached endpoints</a> page for more information.
                            </div>
                        </template>

                        <template v-if="e.notes && e.notes.length > 0">
                            <h4 class="text-info">Notes:</h4>
                            <ul class="list-group" v-for="(note, index) in e.notes" id="notes" :key="index">
                                <li class="list-group-item" v-html="note.replace(/{{baseUrl}}/g, config.baseUrl)"></li>
                            </ul>
                        </template>

                        <br>

                        <p class="text-info">
                            Not a developer? Confused? Please read the part of the homepage <a href="/#nondev">dedicated to non-developers</a>, which tries to explain some of these things.
                            <br>
                            Still confused? Feel free to <a v-bind:href="config.discordUrl">visit our <i class="fab fa-discord"></i> Discord server</a> and you will most likely get help with your issue.
                        </p>

                        <br>

                        <h4 class="text-info">Standard request:</h4>
                        <p>Please remember that the <code>:</code> in front of each parameter is just a placeholder and should not be included in the request.
                        <br>
                        Example: If your channel name or username is <code>decicus</code>, then you would put just <code>decicus</code> and <strong>NOT</strong> <code>:decicus</code>.</p>
                        <pre><strong class="text-primary">{{ e.method || 'GET' }}</strong> <kbd>{{ config.baseUrl + route }}</kbd></pre>

                        <h5 v-if="e.bots !== undefined && e.bots !== false">Bot examples:</h5>
                        <div id="bots" v-if="e.bots !== undefined && e.bots !== false">
                            <p>
                                Bot examples have been updated to include chat variables for Twitch APIs that will automatically translate to channel names/usernames.
                                <br>
                                That means you should be able to copy-paste most of the Twitch-related APIs directly and they will work "out of the box".
                            </p>

                            <template v-if="bots.nightbot">
                                <!-- Nightbot -->
                                <strong class="text-primary"><a href="https://nightbot.tv/">Nightbot</a> command:</strong>
                                <pre><kbd>$(urlfetch {{ replaceBotVariables('nightbot', e.url) }})</kbd></pre>
                            </template>

                            <template v-if="bots.ankhbot">
                                <!-- Ankhbot / Streamlabs Chatbot -->
                                <strong class="text-primary"><a href="https://streamlabs.com/chatbot">Streamlabs Chatbot</a> command:</strong>
                                <pre><kbd>$readapi({{ replaceBotVariables('ankhbot', e.url)  }})</kbd></pre>
                            </template>

                            <template v-if="bots.slcloudbot">
                                <!-- Streamlabs Cloudbot -->
                                <strong class="text-primary"><a href="https://streamlabs.com/cloudbot">Streamlabs Cloudbot</a> command:</strong>
                                <pre><kbd>{readapi.{{ replaceBotVariables('slcloudbot', e.url)  }}}</kbd></pre>
                            </template>

                            <template v-if="bots.streamelements">
                                <strong class="text-primary"><a href="https://streamelements.com/">StreamElements</a> command:</strong>
                                <pre><kbd>${customapi.{{ replaceBotVariables('streamelements', e.url)  }}}</kbd></pre>
                            </template>

                            <template v-if="bots.fossabot">
                                <strong class="text-primary"><a href="https://fossabot.com/">Fossabot</a> command:</strong>
                                <pre><kbd>$(customapi {{ replaceBotVariables('fossabot', e.url)  }})</kbd></pre>
                            </template>

                            <template v-if="bots.deepbot">
                                <!-- Deepbot -->
                                <strong class="text-primary"><a href="https://deepbot.tv/">Deepbot</a> command:</strong>
                                <pre><kbd>@customapi@[{{ replaceBotVariables('deepbot', e.url)  }}]</kbd></pre>
                            </template>

                            <template v-if="bots.phantombot">
                                <!-- PhantomBot -->
                                <strong class="text-primary"><a href="https://phantombot.tv/">PhantomBot</a> command:</strong>
                                <pre><kbd>(customapi {{ replaceBotVariables('phantombot', e.url)  }})</kbd></pre>
                            </template>

                            <template v-if="bots.ohbot">
                                <!-- Ohbot -->
                                <strong class="text-primary"><a href="https://ohbot.3v.fi/">Ohbot</a> command:</strong>
                                <pre><kbd>[customapi {{ replaceBotVariables('ohbot', e.url)  }}]</kbd></pre>
                            </template>
                        </div>

                        <br>

                        <div id="routes" v-if="e.parameters && e.parameters.length > 0">
                            <h4 class="text-info">Route parameters:</h4>

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
                            <h4 class="text-info">Query string parameters:</h4>

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
            <div class="list-group-item" v-for="(endpoint, index) in endpoints" :key="index">
                <a class="endpointListItem" v-on:click="openModal(endpoint.route)">{{ basePath }}/{{ endpoint.route }}</a>

                <span v-if="endpoint.deprecated == true" class="badge badge-danger badge-pill ml-2">Deprecated</span>
            </div>
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
 * Replaces relevant variables with the correct bot variables.
 */
const botVariables = {
    // https://cdn.streamlabs.com/chatbot/Documentation_Twitch.pdf
    ankhbot: {
        ':channel': '$mychannel',
        ':user': '$touserid',
    },
    // https://streamlabs.com/dashboard#/cloudbot/commands/variables
    // Requires login
    slcloudbot: {
        ':channel': '{channel.name}',
        ':user': '{touser.name}',
    },
    // https://wiki.deepbot.tv/custom_commands
    deepbot: {
        ':channel': '@stream@',
        ':user': '@user@',
    },
    // https://fossabot.com/docs/commands/intro
    fossabot: {
        ':channel': '$(channel)',
        ':user': '$(user)',
    },
    // https://docs.nightbot.tv/commands/variableslist
    nightbot: {
        ':channel': '$(channel)',
        ':user': '$(touser)',
    },
    // https://ohbot.3v.fi/commands.html
    ohbot: {
        ':channel': '[channel]',
        // First parameter or fallback to user executing command... I think?
        ':user': '[0|[user]]',
    },
    // https://phantombot.github.io/PhantomBot/guides/#guide=content/commands/command-variables
    phantombot: {
        ':channel': '(channelname)',
        ':user': '(touser)',
    },
    // https://streamelements.com/dashboard/bot-commands/variables
    streamelements: {
        ':channel': '${channel}', // eslint-disable-line no-template-curly-in-string
        ':user': '${touser}', // eslint-disable-line no-template-curly-in-string
    },
};

/**
 * Replaces colon-prefixed variables with the correct bot variables.
 */
const twitchPaths = ['/bttv', '/ffz', '/twitch'];
function replaceBotVariables(bot, input) {
    const replacements = botVariables[bot];

    /**
     * Verify that the replacements for the bot exists.
     *
     * Also verify that the APIs are Twitch-related, as we don't want to replace
     * `:user` and similar variables for Twitter APIs, for instance.
     */
    const { path } = this.$route;
    if (!replacements || !twitchPaths.includes(path)) {
        return input;
    }

    const channel = replacements[':channel'];
    const user = replacements[':user'];
    return input
        .replaceAll(':channel', channel)
        .replaceAll(':user', user);
}

/**
 * Set default setting in "Bot example settings" dropdown.
 */
const bots = {
    ankhbot: true,
    slcloudbot: true,
    deepbot: true,
    fossabot: true,
    nightbot: true,
    ohbot: true,
    phantombot: true,
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
            botVars: botVariables,
            config,
            // Endpoint data
            e: {
                bots: true,
                deprecated: false,
                cached: false,
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
                        // eslint-disable-next-line no-param-reassign
                        end.bots = true;
                    }

                    this.e.deprecated = !!end.deprecated;
                    this.e.cached = !!end.cached;

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
        replaceBotVariables,
    },

    mounted() {
        const path = this.$route.path.replace('/', '');
        const endpoint = this.$route.query.endpoint || '';
        const movedEndpoints = {
            'followage/:channel/:user': 'followage/:channel/:user?token=YOUR_TOKEN_HERE',
            'followed/:channel/:user': 'followed/:channel/:user?token=YOUR_TOKEN_HERE',
        };

        this.$http.get(`/static/yaml/endpoints/${path}.yaml`).then((response) => {
            const { body } = response;
            const data = yaml.load(body);

            const basePath = data.base_path;
            const { endpoints } = data;

            this.basePath = basePath;
            this.endpoints = endpoints;

            if (endpoint === '' || endpoint === '/') {
                return;
            }

            const route = decodeURIComponent(endpoint);
            if (movedEndpoints[route]) {
                this.openModal(movedEndpoints[route]);
                return;
            }

            endpoints.forEach((end) => {
                if (end.route !== route) {
                    return;
                }

                this.openModal(end.route);
            });
        }).catch((error) => {
            console.info('Error fetching endpoint data:', error);
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
