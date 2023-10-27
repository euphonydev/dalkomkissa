const withNextIntl = require('next-intl/plugin')(
    './src/lib/i18n.ts'
);

module.exports = withNextIntl({
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'mamumipzdykcblllgrus.supabase.co'
            },
            {
                protocol: 'https',
                hostname: '*.googleusercontent.com'
            },
            {
                protocol: 'https',
                hostname: 'robohash.org'
            }
        ],
    },
});