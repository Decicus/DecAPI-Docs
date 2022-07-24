<template>
    <div id="app">
        <div class="card">
            <h5 class="card-header bg-primary text-white">
                <i class="fas fa-info"></i> General information
            </h5>
            <div class="card-body">
                These pages will house the documentation of endpoints under DecAPI.
                <br>
                This is currently <strong>work in progress</strong> and <strong>incomplete</strong>, which means that some endpoints lack documentation or may not be fully documented.
                <br>
                If you would like to contribute, take a look at the <a href="https://github.com/Decicus/DecAPI-Docs"><i class="fab fa-github"></i> GitHub repository</a> for this documentation.
            </div>
        </div>

        <br>

        <div class="card" id="general-questions">
            <a href="#general-questions">
                <h5 class="card-header bg-primary text-white"><i class="fas fa-question"></i> General questions/support</h5>
            </a>
            <div class="card-body">
                If you have any general questions or need some help, DecAPI now has a <a v-bind:href="config.discordUrl">Discord server</a> that you could join.
                <br>
                <br>
                For other ways of contact, please take a look at <a href="/contact">the contact page</a>.
            </div>
        </div>

        <br>

        <div class="card" id="default-options">
            <a href="#default-options">
                <h5 class="card-header bg-primary text-white"><i class="fa fa-1x fa-cog"></i> Default options &amp; results</h5>
            </a>
            <div class="card-body">
                <p>These are options or results that will be the default, <strong>unless the notes about the endpoint mention otherwise</strong>.</p>

                <ul class="list-group">
                    <li class="list-group-item">The base URL for all endpoints is <code>{{ baseUrl }}</code>.</li>
                    <li class="list-group-item"><strong>HTTP</strong> requests are supported, but <strong>HTTPS (TLS 1.x)</strong> is encouraged.</li>
                    <li class="list-group-item">The default HTTP method supported is <code>GET</code>.</li>
                    <li class="list-group-item">Responses are typically <code>Content-Type: text/plain</code>.</li>
                    <li class="list-group-item">For endpoints that mention JSON support without any further information, send <code>Accept: application/json</code> in the request header to receive the response as JSON instead.</li>
                    <li class="list-group-item">Parameters are <strong>always</strong> required.</li>
                    <li class="list-group-item">Query strings are <strong>never</strong> required.</li>
                    <li class="list-group-item">Parameter/query string examples may be prefixed by a colon (<code>:</code>),
                        for example: <code>:username</code> or <code>:channel</code>. These should be omitted and replaced by the input value from the actual requests.
                    </li>
                </ul>
            </div>
        </div>

        <br>

        <div class="card" id="localization">
            <a href="#localization">
                <h5 class="card-header bg-primary text-white"><i class="fa fa-1x fa-globe"></i> Localization / translations</h5>
            </a>

            <div class="card-body">
                DecAPI now has some basic localization support for certain endpoints. As of right now, it's only <code>/twitch</code> routes, but eventually it'll be expanded to support the other routes as well.
                <br><br>
                To use the localization options, use the two-letter country code defined in <a href="https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2">ISO 3166-1 alpha-2</a> in the <code>GET</code> parameter <code>lang</code>. The default value is <code>en</code> (English) and you would (for example) use <code>de</code> for German, or <code>no</code> for Norwegian. English is also used as a "fallback" if a language isn't supported for certain types of messages.
                <br>
                Keep in mind that the translations are provided by volunteers. If you'd like to translate something into another language, take a look at the <a href="https://github.com/Decicus/DecAPI/tree/master/resources/lang">'lang' directory on GitHub</a> for examples. Feel free to visit <a href="https://links.decapi.me/discord">the Discord server</a> if you need assistance getting started.
                <br><br>
                <ul class="list-group">
                    <li class="list-group-item"><strong>Example #1:</strong> Accountage with precision 7 and language set to Norwegian - <a href="https://decapi.me/twitch/accountage/decicus?precision=7&lang=no">https://decapi.me/twitch/accountage/decicus?precision=7&lang=no</a></li>
                    <li class="list-group-item"><strong>Example #2:</strong> Accountage with only language set to Norwegian - <a href="https://decapi.me/twitch/accountage/decicus?lang=no">https://decapi.me/twitch/accountage/decicus?lang=no</a></li>
                </ul>
            </div>
        </div>

        <br>

        <div class="card" id="rate-limits">
            <a href="#rate-limits">
                <h5 class="card-header bg-primary text-white"><i class="fa fa-1x fa-cog"></i> Rate limits</h5>
            </a>

            <div class="card-body">
                For the <strong>most part</strong> requests to DecAPI are not rate limited. However, there are a few exceptions to prevent abuse of the service.
                <br>
                If your application requires more requests than what is listed below, I suggest you look into using the API of the service directly instead.
                <br>
                Rate limits are applied based on the IP address the request originates from.

                <br><br>

                <h4>Currently rate limited routes:</h4>
                <div class="list-group">
                    <div class="list-group-item">
                        <h5 class="list-group-item-heading"><a href="/twitch"><code>/twitch/*</code> routes:</a></h5>
                        <p class="list-group-item-text">
                            Currently rate limited to <strong>100 requests per 60 seconds</strong>.
                            <br>
                            <a href="https://dev.twitch.tv/docs">Twitch API documentation</a>
                        </p>
                    </div>

                    <div class="list-group-item">
                        <h5 class="list-group-item-heading"><a href="/steam"><code>/steam/*</code> routes:</a></h5>
                        <p class="list-group-item-text">
                            Currently rate limited to <strong>15 requests per 60 seconds</strong>.
                            <br>
                            <a href="https://developer.valvesoftware.com/wiki/Steam_Web_API">Steam web API documentation</a>
                        </p>
                    </div>
                </div>

                <br>

                <h4>Bypassing rate limits:</h4>
                Most people will be fine with the few (and relatively generous) rate limits I have applied.
                <br>
                However, if you notice you're getting rate limited relatively often, you have the following options:
                <div class="list-group">
                    <a href="https://dev.twitch.tv/docs" class="list-group-item"><i class="fab fa-twitch"></i> Use the Twitch API directly (Twitch's rate limits still apply).</a>
                    <a href="https://developer.valvesoftware.com/wiki/Steam_Web_API" class="list-group-item"><i class="fab fa-steam"></i> Use the Steam web APIs directly.</a>
                    <a href="https://github.com/Decicus/DecAPI#setup" class="list-group-item"><i class="fab fa-github"></i> Host it yourself and set your own rate limits.</a>
                </div>

                <br><br>

                <h4>Domains:</h4>
                The <i>official</i> instance of DecAPI is currently being hosted on multiple domains/sub-domains.
                <br>
                In the past there used to be different versions on certain domains. Nowadays that's not the case and for the most part they're running the same version.
                <br>
                Regardless of the list, I recommend using the primary domain: <code>decapi.me</code>
                <br><br>
                <h5>List of domains:</h5>
                <ul class="list-group">
                    <li class="list-group-item"><code>decapi.me / www.decapi.me</code></li>
                    <li class="list-group-item"><code>beta.decapi.me</code></li>
                    <li class="list-group-item"><code>decapi.net / www.decapi.net</code></li>
                </ul>
            </div>
        </div>

        <br>

        <div class="card" id="nondev">
            <a href="#nondev">
                <h5 class="card-header bg-primary text-white"><i class="fa fa-1x fa-question"></i> Information for non-developers:</h5>
            </a>
            <div class="card-body">
                This page is primarily meant for developers, but some of you might be looking at this to use it with bots or similar (in this case they're often called "custom APIs").
                <br>
                In that case you're probably really confused as to how to use this, so this is an attempt to explain a few things for some of you.
                <br>
                If you have any further questions after reading this, feel free to <a v-bind:href="config.discordUrl">visit our <i class="fab fa-discord"></i> Discord server</a>.
                <br>
                Alternatively contact me via the information on my <a href="/contact">contact page</a>, and I will attempt to reply to the best of my ability.
                <br>
                <br>

                <h5 id="nondev-qs"><strong>Query string (aka "QS") parameters:</strong></h5>
                <ul class="list-group">
                    <li class="list-group-item">
                        QS parameters are <i>normally</i> key/value pairs.
                        <br>
                        Example: <code>channel=decicus</code>.
                    </li>
                    <li class="list-group-item">
                        QS parameters that do not have a value are specified with just the key name, but can <i>optionally</i> be specified with a value.
                        <br>
                        Example: <code>list</code> instead of <code>list=value</code>
                    </li>
                    <li class="list-group-item">
                        To specify a QS parameter, you put a <code>?</code> after the main URL and specify your key or key/value.
                        <br>
                        Full URL example: <code>{{ baseUrl }}/twitch/uptime?channel=decicus</code>
                    </li>
                    <li class="list-group-item">
                        If you wish to specify <strong>more than one</strong> QS parameter, place an <code>&amp;</code> between each key or key/value pair.
                        <br>
                        Full URL example: <code>{{ baseUrl }}/misc/currency?from=USD&amp;to=NOK&amp;value=25</code>
                    </li>
                    <li class="list-group-item">
                        Because QS parameters are key/value pairs, their order <strong>does not matter</strong>. The two examples below achieve the same result.
                        <br>
                        Example #1: <code>{{ baseUrl }}/misc/currency?value=25&amp;from=USD&amp;to=NOK</code>
                        <br>
                        Example #2: <code>{{ baseUrl }}/misc/currency?from=USD&amp;to=NOK&amp;value=25</code>
                    </li>
                </ul>

                <br>

                <h5 id="nondev-routes"><strong>Route parameters:</strong></h5>
                <ul class="list-group">
                    <li class="list-group-item">
                        Route parameters are ordered values.
                        <br>
                        This means that in the URL, they have to be specified in the order that the placeholders mention them in.
                        <br>
                        For the examples below, I'll be using the <code>/twitch/followage</code> endpoint. This endpoint is displayed as: <code>{{ baseUrl }}/twitch/followage/:channel/:user</code>
                        <br>
                        Example #1: <code>{{ baseUrl }}/twitch/followage/tsm_smak/decicus</code>
                        <br>
                        Compared to (example #2): <code>{{ baseUrl }}/twitch/followage/decicus/tsm_smak</code>
                        <br>
                        <br>
                        Notice how for the first example, <strong>"tsm_smak"</strong> is the <strong>first</strong> name and "decicus" is the <strong>second</strong> one. This means that "tsm_smak" is the channel to check, and "decicus" is the user.
                        <br>
                        When you change the positions of these names, you also change what they are treated as.
                        <br>
                        In example #2, while it looks very similar, "decicus" is the first parameter, meaning it's treated as the channel. While "tsm_smak" is the user, giving a completely different result.
                    </li>
                    <li class="list-group-item">
                        Unlike QS parameters, they are <strong>NOT key/value pairs</strong>, and just the values.
                        <br>
                        This means that <code>:channel</code> should just be <code>decicus</code> (example).
                    </li>
                </ul>

                <br>

                <h5 id="nondev-bots"><strong>Bot usage:</strong></h5>
                <ul class="list-group">
                    <li class="list-group-item">
                        If you have already looked at some of the API endpoints, you might have noticed that they mention a few bots and how to add the specific endpoint to these bots.
                        <br>
                        But each endpoint is displayed without any route/query string parameters, which means you have to add them yourself.
                        <br>
                        Using the information you read through earlier about these parameters, you just modify the URL.
                        <br>
                        I have done a few examples below, using the <code>/twitch/followers/:channel</code> endpoint.
                    </li>
                    <li class="list-group-item">
                        <strong>Nightbot</strong> example: <code>$(urlfetch {{ baseUrl }}/twitch/followers/decicus?count=5&amp;direction=desc)</code>
                    </li>
                    <li class="list-group-item">
                        <strong>Streamlabs Chatbot</strong> example: <code>$readapi({{ baseUrl }}/twitch/followers/decicus?count=5&amp;direction=desc)</code>
                    </li>
                </ul>
            </div>
        </div>

        <br>

        <div class="card" id="toc">
            <a href="#toc">
                <h5 class="card-header bg-primary text-white"><i class="fas fa-table"></i> Table of contents:</h5>
            </a>
            <div class="card-body">
                <p>
                    The table of contents will only link you to the specific "categories", and not to any specific endpoints.
                    <br>
                    However, you can click the path/header for the endpoint and it will allow you to directly link to that section.
                </p>
                <div class="list-group" v-if="baseEndpoints.length > 0">
                    <router-link v-for="base in baseEndpoints" v-bind:to="base.name" v-bind:key="base.name" class="list-group-item">
                        <i class="fa-fw" v-bind:class="'fa-' + (base.icon ? base.icon : 'info fas')"></i> {{ base.title }}
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import config from '../config';

export default {
    data() {
        return {
            baseEndpoints: [],
            baseUrl: config.baseUrl,
            config,
        };
    },

    created() {
        this.baseEndpoints = this.$store.state.baseEndpoints;
        this.$store.watch((state) => {
            this.baseEndpoints = state.baseEndpoints;
        });
    },
};
</script>
