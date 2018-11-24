import io from 'socket.io-client';

const socketConnection = {
  _instance: null,
  get instance() {
    if (!this._instance) {
      this._instance = io('/');
    }
    return this._instance;
  }
};

export default socketConnection;
