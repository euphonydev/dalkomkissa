const withNextIntl = require('next-intl/plugin')(
    './src/lib/i18n.ts'
);

module.exports = withNextIntl({
    images: {
        domains: ['mamumipzdykcblllgrus.supabase.co', '*.googleusercontent.com', 'robohash.org'],
    },
});