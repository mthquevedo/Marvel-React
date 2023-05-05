import './Personagens.css'
import React, { useCallback, useEffect, useState } from 'react';
import api from '../../Services/api';
import BotaoMais from '../../Botão Mais';

interface ResponseData {
    id: string;
    name: string;
    description: string;
    thumbnail: {
        path: string;
        extension: string;
    };
    back: string;
}



const Personagens: React.FC = () => {
    const [characters, setCharacters] = useState<ResponseData[]>([]);

    useEffect(() => {
        api
            .get('/characters')
            .then(response => {
                console.log(response.data.data.results)
                setCharacters(response.data.data.results);
            })
            .catch(err => console.log(err))
    }, []);

    const carregarMais = useCallback(async () => {
        try {
            const offset = characters.length;
            const response = await api.get(`characters`, {
                params: {
                    offset,
                },
            });

            setCharacters([...characters, ...response.data.data.results]);

        } catch (err) {
            console.log(err)
        }
    }, [characters])

    function botao() {
        return (
            <BotaoMais onClick={carregarMais} />
        )
    }

    return (
        <><div className='titulo'>
            <h1>PERSONAGENS</h1>
        </div>
            <div className='card-list'>
                {characters.map(character => {
                    const urlImg = character.thumbnail.path + '.' + character.thumbnail.extension;
                    const back = { backgroundImage: `url(${urlImg})` };
                    return (
                        <><div className='card' key={character.id}>
                            <div id="img" style={back} />
                            <h2>{character.name}</h2>
                            <p>{character.description}</p>
                        </div>
                        </>
                    )
                })}
            </div>
            {botao()}
        </>);
};

export default Personagens;

    // useEffect(() => {
    //     axios
    //         .get(`${baseURL}ts=${time}&apikey=${publicKey}&hash=${hash}`)
    //         .then(response => console.log(response.data.data))
    //         .catch(error => console.log(error))
    // }, []);