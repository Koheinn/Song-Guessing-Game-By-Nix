import handler from './api/songs.js';
const req = { query: { mode: 'myanmar' }, method: 'GET' };
const res = { 
  setHeader: () => {}, 
  status: (code) => ({ json: (data) => console.log(code, data.length) }) 
};
await handler(req, res);
