<template>
    <div id="app">
        <h2><i class="fas fa-clock"></i> Cached endpoints</h2>
        <p>
            To avoid too many unnecessary requests to third-party APIs (especially Twitch, but others may be affected later), we cache the results of API calls where we can.
            <br>
            In most scenarios we try to avoid caching for too long (to avoid "stale" data), but depending on the amount if incoming requests DecAPI receives from users, these numbers may need to be increased.
            <br>
            While there will be attempts made to keep this page as up-to-date as possible, the "source of truth" should be considered the <a href="https://github.com/Decicus/DecAPI/blob/master/config/twitch.php">the DecAPI configuration file in the main repository</a>.
        </p>

        <h3><i class="fab fa-twitch"></i> Twitch</h3>
        <table class="table table-bordered">
            <thead>
                <th><i class="fas fa-link fa-fw fa-1x"></i> API Endpoint</th>
                <th><i class="fas fa-clock fa-fw fa-1x"></i> Cache length</th>
                <th><i class="fas fa-sticky-note fa-fw fa-1x"></i> Description</th>
            </thead>
            <tbody>
                <tr>
                    <td><code>accountage / creation</code></td>
                    <td>6 hours (21600 seconds)</td>
                    <td>
                        Since an account's creation date never changes, this could theoretically be cached indefinitely, but there's an arbitrary time set just to get rid of data that won't necessarily be accessed in the near future.
                        <br>
                        Accountage is still calculated in "realtime" when DecAPI receives a request, but it's based on the cached <i>creation date</i>. It does not cache the "accountage" itself.
                        <br>
                        This will only really be a problem in scenarios where an account is suspended/disabled after having the creation date cached.
                        As it would still return a valid response, even if the account is no longer accessible via Twitch's API.
                    </td>
                </tr>

                <tr>
                    <td><code>avatar</code></td>
                    <td>30 minutes (1800 seconds)</td>
                    <td>Avatar URLs are cached up to 30 minutes. It may cause invalid URLs to be returned if a user changes their avatar and Twitch deletes the old URL quickly.</td>
                </tr>

                <tr>
                    <td><code>game / title</code></td>
                    <td>3 minutes (180 seconds)</td>
                    <td>
                        A channel's current game and stream title come from the same Twitch API, thus these are cached together.
                        <br>
                        If <code>game</code> is requested, the <code>title</code> will be cached too. Same goes for the other way around.
                    </td>
                </tr>

                <tr>
                    <td><code>followcount</code></td>
                    <td>2 minutes (120 seconds)</td>
                    <td></td>
                </tr>

                <tr>
                    <td><code>subpoints / subcount</code></td>
                    <td>2 minutes (120 seconds)</td>
                    <td>Subscriber <i>points</i> and subscriber <i>count</i> come from the same API. If one is retrieved from Twitch's API, they're both cached for the same amount of time.</td>
                </tr>

                <tr>
                    <td><code>subscriber_emotes</code></td>
                    <td>1 hour (60 minutes / 3600 seconds)</td>
                    <td>If any future endpoints rely on a channel's emote information (e.g. follower emotes), it will likely share this cache.</td>
                </tr>

                <tr>
                    <td><code>uptime / viewercount</code></td>
                    <td>5 minutes (300 seconds)</td>
                    <td>
                        Uptime / viewercount are cached together as they come from the same Twitch API.
                        <br>
                        Uptime will still be calculated in "realtime", as it's based off the "stream start time". We don't cache the uptime text itself, only the stream start time.
                        <br>
                        This does mean that uptime status may be slightly delayed in cases where the stream switches between offline/online.
                    </td>
                </tr>

                <tr>
                    <td><code>videos / vod_replay</code></td>
                    <td>5 minutes (300 seconds)</td>
                    <td></td>
                </tr>
            </tbody>
        </table>

        <h3><i class="fab fa-youtube"></i> YouTube</h3>
        <table class="table table-bordered">
            <thead>
                <th><i class="fas fa-link fa-fw fa-1x"></i> API Endpoint</th>
                <th><i class="fas fa-clock fa-fw fa-1x"></i> Cache length</th>
                <th><i class="fas fa-sticky-note fa-fw fa-1x"></i> Description</th>
            </thead>
            <tbody>
                <tr>
                    <td><code>videoid</code></td>
                    <td>3 hours (10800 seconds)</td>
                    <td>
                        Searches are cached for up to 3 hours. Only affects exact searches (case insensitive, e.g. <code>Never Gonna Give You Up</code> = <code>never gonna give you up</code>).
                    </td>
                </tr>
            </tbody>
        </table>
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
