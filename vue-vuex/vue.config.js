const path = require('path');

module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000/'
      },
      '/socket.io': {
        target: 'http://localhost:5000',
        ws: true
      }
    }
  }
};
