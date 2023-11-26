/** @type {import('next').NextConfig} */
const path = require("path");

const nextConfig = {
    sassOptions: {
        includePaths: [path.join(__dirname, "styles")],
        prependData: `@import "./base.scss";`,
    },
    images: {
        domains: ["navajafina.netlify.app", "www.tailwind-kit.com", "ae01.alicdn.com"],
    },
    important: true,
    // Active dark mode on class basis
    darkMode: "class",
    i18n: {
        locales: ["en-US"],
        defaultLocale: "en-US",
    },
    purge: {
        content: ["./pages/**/*.tsx", "./components/**/*.tsx"],
        // These options are passed through directly to PurgeCSS
    },
    theme: {
        extend: {
            backgroundImage: (theme) => ({
                check: "url('/icons/check.svg')",
                landscape: "url('/images/landscape/2.jpg')",
            }),
        },
    },
    variants: {
        extend: {
            backgroundColor: ["checked"],
            borderColor: ["checked"],
            inset: ["checked"],
            zIndex: ["hover", "active"],
        },
    },
    plugins: [],
    future: {
        purgeLayersByDefault: true,
    },
};

module.exports = nextConfig;