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

        <div class="card" id="v2.1.0">
            <h4 class="card-header bg-primary text-white">
                Version 2.1.0 - Privacy Policy &amp; Caching

                <span class="badge badge-secondary float-right" title="November 28th, 2020">2020-11-28</span>
            </h4>

            <div class="card-body">
                <h5><i class="fab fa-1x fa-fw fa-twitch"></i> Twitch</h5>
                <ul>
                    <li>
                        The following endpoints are now temporarily cached due to excessive requests from various sources, causing issues with Twitch's rate limits:
                        <ul>
                            <li><code>avatar</code> - 5 minutes per user.</li>
                            <li><code>game</code> - 1 minute per channel.</li>
                            <li><code>status/title</code> - 1 minute per channel.</li>
                            <li><code>subpoints</code> - 2 minutes per channel (used to be 1 minute).</li>
                            <li><code>viewercount</code> - 1 minute per channel.</li>
                        </ul>
                        It's possible that more endpoints will have caching implemented in the future, but we're starting off with these.
                    </li>
                    <li><code>/latest_sub</code>: A minor bug has been fixed where <code>count</code> could be set to anything less than 1 and not return anything. Now it falls back to 1 instead.</li>
                </ul>

                <h5><i class="fas fa-1x fa-fw fa-gamepad"></i> DayZ</h5>
                <ul>
                    <li>iZurvive - Map search has been updated to a more recent version of Chernarus.</li>
                    <li>iZurvive - Map search has a slightly different searching algorithm, which may give different results than previously.</li>
                    <li>A <a href="/dayz?endpoint=news">news</a> endpoint has been added, that retrieves the latest news article from the <a href="https://dayz.com/">DayZ website</a>.</li>
                    <li>'Status Report' has been changed to use the 'News' endpoint and is now technically deprecated.</li>
                </ul>

                <h5><i class="fas fa-1x fa-fw fa-user-secret"></i> Privacy Policy</h5>
                <ul>
                    <li>A privacy policy has been published under the main website and linked on the homepage: <a href="https://decapi.me/privacy-policy">DecAPI.me/privacy-policy</a>.</li>
                    <li>Privacy policy was long overdue, but nothing has changed with the service itself (in case anyone is concerned about that).</li>
                    <li>If you have any feedback, questions or concerns in regards to the privacy policy, <a href="/contact">please contact me</a> &mdash; either via Discord or email.</li>
                </ul>

                <h5><i class="fas fa-1x fa-fw fa-info"></i> Miscellaneous Other Changes</h5>
                <ul>
                    <li>The underlying framework, Laravel, has been upgraded from 6.x to 8.x</li>
                    <li>A CLI command for <code>twitch:help</code> (used for updating Twitch help articles) has been removed, as it no longer works.</li>
                    <li>
                        A new configuration option in <code>.env</code> has been added: <code>CACHE_PREFIX</code>. Only really useful for cases where someone is running two separate instances of DecAPI on the same host.
                    </li>
                </ul>
            </div>
        </div>

        <div class="card mt-4" id="v2.0.1">
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

        <div class="card mt-4" id="v2.0.0">
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
