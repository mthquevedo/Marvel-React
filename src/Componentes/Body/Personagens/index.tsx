import './Personagens.css'
import React, { useEffect, useState } from 'react';
import api from '../../Services/api';

interface ResponseData {
    id: string;
    name: string;
    description: string;
    thumbnail: {
        path: string;
        extension: string;
    };
}

const Personagens: React.FC = () => {
    const [personagens, setPersonagens] = useState<ResponseData[]>([]);

    useEffect(() => {
        api
            .get('/characters')
            .then(response => {
                setPersonagens(response.data.data.results);
            })
            .catch(err => console.log(err))
    }, []);

    return (<h1>Personagens</h1>);
};

export default Personagens;

    // useEffect(() => {
    //     axios
    //         .get(`${baseURL}ts=${time}&apikey=${publicKey}&hash=${hash}`)
    //         .then(response => console.log(response.data.data))
    //         .catch(error => console.log(error))
    // }, []);