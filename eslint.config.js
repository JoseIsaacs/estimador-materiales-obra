// eslint.config.js
module.exports = [
    {
        languageOptions: {
            sourceType: "script",
            globals: {
                window: "readonly",
                document: "readonly",
                console: "readonly",
                parseFloat: "readonly",
                Math: "readonly"
            }
        },
        rules: {
            "no-unused-vars": "warn",
            "no-undef": "warn",
            "semi": ["error", "always"]
        }
    }
];
