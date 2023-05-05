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
    const [searchInput, setSearchInput] = useState("");
    const [search, setSearch] = useState("");

    useEffect(() => {
        api
            .get(`/characters?nameStartsWith=${search}`)
            .then((response) => {
                setCharacters(response.data.data.results);
            })
            .catch((err) => console.log(err));
    }, [search]);

    const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchInput(e.target.value);
        if (e.target.value === "") {
            setSearch("a");
        } else {
            setSearch(e.target.value);
        }
    };

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

    function handleSearch() {
        const dados = characters;
        const pesquisas = JSON.stringify(dados.map(character => character.name));

        localStorage.setItem('dados', pesquisas)
    }

    function botao() {
        return (
            <BotaoMais onClick={carregarMais} />
        )
    }

    return (
        <>
            <div className='container-personagens'>
                <div className='titulo'>
                    <h1>PERSONAGENS</h1>
                    <input type="search"
                        placeholder="Busque aqui o nome do personagem"
                        value={searchInput}
                        onChange={handleSearchInputChange}
                        onClick={handleSearch} />

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
            </div>
        </>);
};

export default Personagens;