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
    // Configure `pageExtensions` to include MDX files
    pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
    // Optionally, add any other Next.js config below
}

module.exports = withMDX(nextConfig)





