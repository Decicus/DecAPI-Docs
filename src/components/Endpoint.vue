<template>
    <div class="panel panel-success" id="endpoint-template">
        <div class="panel-heading">
            <h3 class="panel-title" id="title">
                <a href="#{{ route }}">{{ route }}</a>
            </h3>
        </div>
        <div class="panel-body" id="main-body">
            <p class="text-warning">Notes:</p>
            <ul id="description" class="list-group text-primary"></ul>
            <strong class="text-primary">Standard request:</strong>
            <pre id="http"><strong class="text-primary"></strong> <code></code></pre>

            <div id="bots">
                <template v-if="bot-nightbot">
                    <!-- Nightbot -->
                    <strong class="text-primary"><a href="https://beta.nightbot.tv/">Nightbot</a> command:</strong>
                    <pre><code>$(urlfetch {{ url }})</code></pre>
                </template>

                <template v-if="bot-ankhbot">
                    <!-- Ankhbot -->
                    <strong class="text-primary"><a href="http://marcinswierzowski.com/Gallery/Projects/AnkhBotR2/">Ankhbot</a> command:</strong>
                    <pre><code>$readapi({{ url }})</code></pre>
                </template>

                <template v-if="bot-deepbot">
                    <!-- Deepbot -->
                    <strong class="text-primary"><a href="https://deepbot.deep.sg/">Deepbot</a> command:</strong>
                    <pre><code>@customapi@[{{ url }}]</code></pre>
                </template>

                <template v-if="bot-phantombot">
                    <!-- PhantomBot -->
                    <strong class="text-primary"><a href="https://phantombot.tv/">PhantomBot</a> command:</strong>
                    <pre><code>(customapi {{ url }})</code></pre>
                </template>

                <template v-if="bot-ohbot">
                    <!-- Ohbot -->
                    <strong class="text-primary"><a href="https://ohbot.3v.fi/">Ohbot</a> command:</strong>
                    <pre><code>[customapi {{ url }}]</code></pre>
                </template>
            </div>

            <div id="routes" v-if="parameters.length > 0">
                <p class="text-warning">Route parameters:</p>

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
                        <tr v-for="p in parameters">
                            <th>{{ p.name }}</th>

                            <td v-if="Array.isArray(p.description)">{{ p.description.join("<br>") }}</td>
                            <td v-else>{{ p.description }}</td>

                            <td><i class="fa fa-1x" v-bind:class="p.optional ? 'fa-times' : 'fa-check'"></i></td>
                            <td><code>{{ p.type || 'string' }}</code></td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div id="qs" v-if="qs.length > 0">
                <p class="text-warning">Query string parameters:</p>

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
                        <tr v-for="p in qs">
                            <th>{{ p.name }}</th>

                            <td v-if="Array.isArray(p.description)">{{ p.description.join("<br>") }}</td>
                            <td v-else>{{ p.description }}</td>

                            <td><i class="fa fa-1x" v-bind:class="p.required ? 'fa-check' : 'fa-times'"></i></td>
                            <td><code>{{ p.type || 'string' }}</code></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Endpoint',
        data() {
            return {

            };
        },
    };
</script>
