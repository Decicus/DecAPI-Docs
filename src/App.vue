<template>
    <div id="app">
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
