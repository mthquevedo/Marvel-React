import axios from 'axios';
import md5 from 'md5';

const publicKey = '1432c7b8161969814497cbd05253892a';
const privateKey = '4df402fcf0e9544b6c8e7541aafe2a4576876acc';

const ts = Number(new Date());
const hash = md5(ts + privateKey + publicKey);

const api = axios.create({
  baseURL: 'http://gateway.marvel.com/v1/public',
  params: {
    apikey: publicKey,
    ts: ts,
    hash: hash,
  },
});

export default api