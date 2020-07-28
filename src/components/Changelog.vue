<template>
    <div id="app">
        <h2><i class="fas fa-1x fa-fw fa-list-alt"></i> Changelog</h2>

        <p>
            The changelog for DecAPI is meant to mostly cover changes to the API that may impact users, but may also contain some more technical changes that have occurred with the service in the backend.
            <br>
            Changes prior to V2.0.0 aren't documented, because it's not really feasible.
            <br>
            However, you can browse the <a href="https://github.com/Decicus/DecAPI/commits/d4a849c7d0131ac74d64938e7850f1badb77335a">commit log prior to V2.0.0 on GitHub</a>, which should give you a decent overview.
        </p>

        <div class="card" id="v2.0.1">
            <h4 class="card-header bg-primary text-white">
                Version 2.0.1 - Minor changes

                <span class="badge badge-secondary float-right" title="July 28th, 2020">2020-07-28</span>
            </h4>

            <div class="card-body">
                <h5><i class="fab fa-1x fa-fw fa-twitch"></i> Twitch</h5>
                <ul>
                    <li>
                        <strong>Backend changes:</strong> The new Twitch API (Helix) is now used to retrieve a channel's game or stream title.
                    </li>
                </ul>

                <h5><i class="fas fa-1x fa-fw fa-code"></i> Laravel Framework - Security Update</h5>
                <ul>
                    <li>
                        Laravel released a <a href="https://blog.laravel.com/laravel-cookie-security-releases">security update</a> and DecAPI's dependencies have been updated to use a patched version of the framework.
                        <ul>
                            <li>The live version should not be affected by this regardless, as it does not save any session data in cookies.</li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>

        <div class="card" id="v2.0.0">
            <h4 class="card-header bg-primary text-white">
                Version 2.0.0 - Official Release!

                <span class="badge badge-secondary float-right" title="July 24th, 2020">2020-07-24</span>
            </h4>
            <div class="card-body">
                <h5><i class="fab fa-1x fa-fw fa-twitch"></i> Twitch</h5>
                <ul>
                    <li>
                        Channel/usernames that are "mentioned" using <code>@username</code> will now have their <code>@</code> stripped before being passed through to Twitch's API.
                        <ul>
                            <li>TL;DR: <code>@lirik</code> will be treated as <code>lirik</code></li>
                        </ul>
                    </li>

                    <li>The base path <code><a href="https://decapi.me/twitch">/twitch</a></code> that lists endpoints in DecAPI has had some changes too:
                        <ul>
                            <li>It now includes a link to the documentation.</li>
                            <li>The <code>followers</code> endpoint had a typo and didn't link correctly, which has now been fixed.</li>
                        </ul>
                    </li>
                </ul>

                <h5><i class="fas fa-1x fa-fw fa-home"></i> Homepage</h5>
                <ul>
                    <li>Links on the homepage have been changes a little bit to clarify what is/isn't DecAPI-related.</li>
                </ul>
            </div>
        </div>
    </div>
</template>
