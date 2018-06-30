<template>
    <div id="app">
        <div class="card">
            <h5 class="card-header bg-primary text-white"><i class="fas fa-info"></i> Contact information</h5>
            <div class="card-body">
                General questions, issues or maybe you need some help? Please <a v-bind:href="config.discordUrl"><i class="fab fa-discord"></i> join the Discord server</a>!
                <br>
                General bug or feedback? Please use the <a href="https://github.com/Decicus/DecAPI/issues"><i class="fab fa-github"></i> GitHub issue tracker</a>.
                <br>
                Security issue? Please contact me privately via email: <a href="mailto:alex@thomassen.xyz"><i class="fas fa-envelope"></i> alex@thomassen.xyz</a>
            </div>
        </div>
    </div>
</template>

<script>
    import config from '../config';

    export default {
        data() {
            return {
                config,
            };
        },
    };
</script>
