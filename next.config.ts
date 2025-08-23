module.exports = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/workout',
        permanent: true,
      },
    ];
  },
};