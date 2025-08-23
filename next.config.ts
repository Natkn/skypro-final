module.exports = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/home/courses',
        permanent: true,
      },
    ];
  },
};