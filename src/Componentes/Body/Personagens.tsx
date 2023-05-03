import React, { useEffect } from 'react';
import axios from 'axios';
import md5 from 'md5';

const baseURL = 'http://gateway.marvel.com/v1/public/characters?';

const publicKey = '1432c7b8161969814497cbd05253892a';
const privateKey = '4df402fcf0e9544b6c8e7541aafe2a4576876acc';

const time = Number(new Date());

const hash = md5(time + privateKey + publicKey);

const Personagens: React.FC = () => {
    useEffect(() => {
        axios
            .get(`${baseURL}ts=${time}&apikey=${publicKey}&hash=${hash}`)
            .then(response => console.log(response.data.data))
            .catch(error => console.log(error))
    }, [])

    return (<h1>Personagensa</h1>
    )
}

export default Personagens