// eslint.config.js
export default [
    {
        files: ["js/**/*.js"],
        languageOptions: {
            sourceType: "module",
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