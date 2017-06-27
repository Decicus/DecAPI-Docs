<template>
    <div id="app">
        <div class="panel panel-primary">
            <div class="panel-heading">
                <h3 class="panel-title"><i class="fa fa-1x fa-info"></i> General information</h3>
            </div>
            <div class="panel-body">
                These pages will house the documentation of endpoints under DecAPI.
                <br>
                This is currently <strong>work in progress</strong> and <strong>incomplete</strong>, which means that some endpoints lack documentation or may not be fully documented.
                <br>
                If you would like to contribute, take a look at the <a href="https://github.com/Decicus/DecAPI-Docs"><i class="fa fa-github fa-1x"></i> GitHub repository</a> for this documentation.
            </div>
        </div>

        <div class="panel panel-primary">
            <div class="panel-heading">
                <h3 class="panel-title"><i class="fa fa-1x fa-cog"></i> Default options &amp; results</h3>
            </div>
            <div class="panel-body">
                <p>These are options or results that will be the default, <strong>unless the notes about the endpoint mention otherwise</strong>.</p>
                <div class="list-group">
                    <li class="list-group-item">The base URL for all endpoints is <code>{{ baseUrl }}</code>.</li>
                    <li class="list-group-item"><strong>HTTP</strong> requests are supported, but <strong>HTTPS (TLS 1.x)</strong> is encouraged.</li>
                    <li class="list-group-item">The default HTTP method supported is <code>GET</code>.</li>
                    <li class="list-group-item">Responses are typically <code>Content-Type: text/plain</code>.</li>
                    <li class="list-group-item">For endpoints that mention JSON support without any further information, send <code>Accept: application/json</code> in the request header to receive the response as JSON instead.</li>
                    <li class="list-group-item">Parameters are <strong>always</strong> required.</li>
                    <li class="list-group-item">Query strings are <strong>never</strong> required.</li>
                    <li class="list-group-item">Parameter/query string examples may be surrounded by "curly brackets", for example: <code>{USERNAME}</code>. These should be omitted in the actual requests.</li>
                </div>
            </div>
        </div>

        <div class="panel panel-primary" id="nondev">
            <div class="panel-heading">
                <h3 class="panel-title"><i class="fa fa-1x fa-question"></i> Information for non-developers:</h3>
            </div>
            <div class="panel-body">
                This page is primarily meant for developers, but some of you might be looking at this to use it with bots or similar (in this case they're often called "custom APIs").
                <br>
                In that case you're probably really confused as to how to use this, so this is an attempt to explain a few things for some of you.
                <br>
                If you have any further questions after reading this, then feel free to contact me via the information on my <a href="https://blog.decicus.com/contact/">contact page</a>, and I will attempt to reply to the best of my ability.
                <br>

                <h4 id="nondev-qs"><strong>Query string (aka "QS") parameters:</strong></h4>
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

                <h4 id="nondev-routes"><strong>Route parameters:</strong></h4>
                <ul class="list-group">
                    <li class="list-group-item">
                        Route parameters are ordered values.
                        <br>
                        This means that in the URL, they have to be specified in the order that the placeholders mention them in.
                        <br>
                        For the examples below, I'll be using the <code>/twitch/followage</code> endpoint. This endpoint is displayed as: <code>{{ baseUrl }}/twitch/followage/{CHANNEL}/{USER}</code>
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
                        This means that <code>{CHANNEL}</code> should just be <code>decicus</code> (example).
                    </li>
                </ul>

                <h4 id="nondev-bots"><strong>Bot usage:</strong></h4>
                <ul class="list-group">
                    <li class="list-group-item">
                        If you have already looked at some of the API endpoints, you might have noticed that they mention a few bots and how to add the specific endpoint to these bots.
                        <br>
                        But each endpoint is displayed without any route/query string parameters, which means you have to add them yourself.
                        <br>
                        Using the information you read through earlier about these parameters, you just modify the URL.
                        <br>
                        I have done a few examples below, using the <code>/twitch/followers/{CHANNEL}</code> endpoint.
                    </li>
                    <li class="list-group-item">
                        <strong>Nightbot</strong> example: <code>$(urlfetch {{ baseUrl }}/twitch/followers/decicus?count=5&amp;direction=desc)</code>
                    </li>
                    <li class="list-group-item">
                        <strong>Ankhbot</strong> example: <code>$readapi({{ baseUrl }}/twitch/followers/decicus?count=5&amp;direction=desc)</code>
                    </li>
                </ul>
            </div>
        </div>

        <div class="panel panel-primary" id="toc" v-if="baseEndpoints.length > 0">
            <div class="panel-heading">
                <h3 class="panel-title"><i class="fa fa-1x fa-table"></i> Table of contents:</h3>
            </div>
            <div class="panel-body">
                <p>
                    The table of contents will only link you to the specific "categories", and not to any specific endpoints.
                    <br>
                    However, you can click the path/header for the endpoint and it will allow you to directly link to that section.
                </p>
                <div class="list-group">
                    <a v-for="base in baseEndpoints" v-bind:href="'#' + base.name" class="list-group-item">
                        <i class="fa fa-1x fa-fw" v-bind:class="'fa-' + (base.icon ? base.icon : 'info')"></i> {{ base.title }}
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                baseEndpoints: [],
                baseUrl: 'https://beta.decapi.me',
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
