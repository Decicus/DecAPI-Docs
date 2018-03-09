<template>
    <div id="app">
        <nav class="navbar navbar-default" role="navigation">
            <div class="container-fluid">
                <div class="navbar-header">
                    <a class="navbar-brand" href="/">DecAPI Docs</a>
                </div>

                <ul class="nav navbar-nav">
                    <li v-bind:class="{ active: this.$route.name === 'Home' }"><a href="/"><i class="fa fa-1x fa-home"></i> Home</a></li>
                </ul>

                <ul class="nav navbar-nav navbar-right">
                    <li><a href="https://github.com/Decicus/DecAPI-Docs"><i class="fa fa-1x fa-book"></i> DecAPI Docs on GitHub</a></li>
                    <li><a href="https://github.com/Decicus/DecAPI"><i class="fa fa-1x fa-github"></i> DecAPI on GitHub</a></li>
                </ul>
            </div>
        </nav>

        <div class="container-fluid">
            <div class="page-header">
                <h1>DecAPI Docs</h1>
            </div>
        </div>

        <div class="container-fluid">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
export default {
    name: 'app',
    created() {
        this.$store.dispatch('LOAD_BASE_ENDPOINTS');
    },
};
</script>
