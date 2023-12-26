// /** @type {import('next').NextConfig} */
// const nextConfig = {}

// module.exports = nextConfig


// const withMDX = require('@next/mdx')()

const {
    remarkCodeHike,
} = require("@code-hike/mdx")

const withMDX = require("@next/mdx")({
    extension: /\.mdx?$/,
    options: {
        remarkPlugins: [
            [remarkCodeHike, { theme: "dracula-soft", showCopyButton: true }]
        ],
    },
})


/** @type {import('next').NextConfig} */
const nextConfig = {

    transpilePackages: ['@mdxeditor/editor', 'react-diff-view'],
    reactStrictMode: true,
    webpack: (config) => {
        // this will override the experiments
        config.experiments = { ...config.experiments, topLevelAwait: true };
        // this will just update topLevelAwait property of config.experiments
        // config.experiments.topLevelAwait = true 
        return config;
    },
    // Configure `pageExtensions` to include MDX files
    pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
    // Optionally, add any other Next.js config below
}

module.exports = withMDX(nextConfig)

// const {
//     remarkCodeHike,
// } = require("@code-hike/mdx")

// const withPlugins = require('next-compose-plugins');
// const withMDX = require('@next/mdx')({
//     extension: /\.mdx?$/,
//     options: {
//         remarkPlugins: [
//             [remarkCodeHike, { theme: "dracula-soft", showCopyButton: true }]
//         ],
//     },
// });

// const withPWA = require('next-pwa')({
//     dest: 'public',
//     disable: process.env.NODE_ENV === 'development',
//     register: true,
//     skipWaiting: true,
// });

// const nextConfig = {
//     transpilePackages: ['@mdxeditor/editor', 'react-diff-view'],
//     reactStrictMode: true,
//     webpack: (config) => {
//         config.experiments = { ...config.experiments, topLevelAwait: true };
//         return config;
//     },
//     pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
// }

// module.exports = withPlugins([
//     withMDX,
//     withPWA
// ], nextConfig);






