module.exports = {
    root: true,
    env: {
        node: true
    },
    extends: ["plugin:vue/essential", "@vue/airbnb"],
    parserOptions: {
        parser: "babel-eslint"
    },
    rules: {
        "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
        "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
        indent: ["error", 4],
        'max-len': ['error', {
            code: 250,
            ignoreUrls: true,
        }],
    }
};
