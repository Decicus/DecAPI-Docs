<template>
    <div id="app">
        <nav class="navbar navbar-dark navbar-expand-lg bg-dark" role="navigation">
            <a class="navbar-brand" href="/">DecAPI Docs</a>
            <button
                class="navbar-toggler" type="button"
                data-toggle="collapse" data-target="#topNavDropdown"
                aria-controls="topNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="topNavDropdown">
                <ul class="nav navbar-nav mr-auto">
                    <li class="navbar-item" v-bind:class="{ active: this.$route.name === 'Home' }">
                        <a href="/" class="nav-link"><i class="fas fa-home fa-fw"></i> Home</a>
                    </li>

                    <li class="navbar-item" v-bind:class="{ active: this.$route.name === 'Changelog' }">
                        <a href="/changelog" class="nav-link"><i class="fas fa-fw fa-list-alt"></i> Changelog</a>
                    </li>

                    <li class="navbar-item" v-bind:class="{ active: this.$route.name === 'Contact' }">
                        <a href="/contact" class="nav-link"><i class="far fa-envelope fa-fw"></i> Contact</a>
                    </li>

                    <li class="navbar-item">
                        <a href="/contact#security" class="nav-link"><i class="fas fa-fw fa-shield-alt"></i> Security</a>
                    </li>

                    <li class="navbar-item" v-bind:class="{ active: this.$route.name === 'Cached endpoints' }">
                        <a href="/cached-endpoints" class="nav-link"><i class="fas fa-clock"></i> Cached endpoints</a>
                    </li>
                </ul>

                <ul class="nav navbar-nav justify-content-end">
                    <li class="navbar-item">
                        <a @click="toggleDarkMode" class="nav-link">
                            <div v-if="darkMode">
                                <i class="fas fa-fw fa-sun"></i> Light mode
                            </div>
                            <div v-else>
                                <i class="fas fa-fw fa-moon"></i> Dark mode
                            </div>
                        </a>
                    </li>
                    <li class="navbar-item">
                        <a href="https://decapi.me/privacy-policy" class="nav-link">
                            <i class="fas fa-user-secret fa-fw"></i> Privacy Policy
                        </a>
                    </li>
                    <li class="navbar-item">
                        <a v-bind:href="config.discordUrl" class="nav-link">
                            <i class="fab fa-discord fa-fw"></i> Discord server
                        </a>
                    </li>
                    <li class="navbar-item">
                        <a href="https://github.com/Decicus/DecAPI-Docs" class="nav-link"><i class="fas fa-book fa-fw"></i> DecAPI Docs on GitHub</a>
                    </li>
                    <li class="navbar-item">
                        <a href="https://github.com/Decicus/DecAPI" class="nav-link"><i class="fab fa-github fa-fw"></i> DecAPI on GitHub</a>
                    </li>
                </ul>
            </div>
        </nav>

        <main class="py-4">
            <div class="container-fluid">
                <router-view></router-view>
            </div>
        </main>
    </div>
</template>

<script>
import config from './config';

/**
 * A very ugly way to have dark mode, but I honestly can't be bothered
 * to figure out how to do it the "Vue way" when I'm planning on rewriting
 * the docs to something else anyway. Eventually™
 */
function checkDarkMode() {
    const bootstrapTheme = document.querySelector('#bootstrap-theme');
    const darkMode = localStorage.getItem('darkMode');
    if (darkMode === '1') {
        bootstrapTheme.setAttribute('href', '/static/css/darkly.min.css');
        return;
    }

    bootstrapTheme.setAttribute('href', '/static/css/cosmo.min.css');
}

export default {
    name: 'app',
    created() {
        this.$store.dispatch('LOAD_BASE_ENDPOINTS');
    },
    data() {
        return {
            darkMode: localStorage.getItem('darkMode') === '1',
            config,
        };
    },
    mounted() {
        checkDarkMode();
    },
    methods: {
        toggleDarkMode() {
            this.darkMode = !this.darkMode;
            localStorage.setItem('darkMode', this.darkMode ? '1' : '0');
            checkDarkMode();
        },
    },
};
</script>
