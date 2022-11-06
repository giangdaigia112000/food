const { i18n } = require("./next-i18next.config");

module.exports = {
    i18n: {
        // These are all the locales you want to support in
        // your application
        locales: ["vi", "en", "fr", "nl-NL"],
        // This is the default locale you want to be used when visiting
        // a non-locale prefixed path e.g. `/hello`
        defaultLocale: "vi",
        // This is a list of locale domains and the default locale they
        // should handle (these are only required when setting up domain routing)
        domains: [
            {
                domain: "example.com",
                defaultLocale: "vi",
                // other locales that should be handled on this domain
                locales: ["vi"],
            },
        ],
    },
    env: {
        BASE_API: "https://d7e9-222-252-27-131.ap.ngrok.io/",
    },
};
