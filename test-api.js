import handler from './api/songs.js';
const req = { query: { mode: 'kpop' }, method: 'GET' };
const res = { 
  setHeader: () => {}, 
  status: (code) => ({ json: (data) => console.log(code, data) }) 
};
await handler(req, res);
