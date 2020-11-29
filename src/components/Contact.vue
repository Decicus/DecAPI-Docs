<template>
    <div id="app">
        <div class="card">
            <h5 class="card-header bg-primary text-white"><i class="fas fa-info"></i> Contact information</h5>
            <div class="card-body">
                General questions, issues or maybe you need some help? Please <a v-bind:href="config.discordUrl"><i class="fab fa-discord"></i> join the Discord server</a>!
                <br>
                General bug or feedback? Please use the <a href="https://github.com/Decicus/DecAPI/issues"><i class="fab fa-github"></i> GitHub issue tracker</a>.
                <br>
                Other concerns? Please contact me privately via email: <a href="mailto:alex@thomassen.sh"><i class="fas fa-envelope"></i> alex@thomassen.sh</a>
            </div>
        </div>

        <div class="card mt-4" id="security">
            <h5 class="card-header bg-primary text-white"><i class="fas fa-shield-alt"></i> Security</h5>
            <div class="card-body">
                <p>For security issues, please send an email to <a href="mailto:alex@thomassen.sh">alex@thomassen.sh</a></p>
                <p>Here's also my <a href="/static/public-key-alex@thomassen.sh.asc">PGP key</a> that you can encrypt the email with, if you find it necessary.</p>
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
