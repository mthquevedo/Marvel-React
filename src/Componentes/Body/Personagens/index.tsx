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
    const [search, setSearch] = useState("");
    const [searchInput, setSearchInput] = useState("");

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


    function botao() {
        return (
            <BotaoMais onClick={carregarMais} />
        )
    }

    return (
        <><div className='titulo'>
            <h1>PERSONAGENS</h1>
            <input type="search"
                placeholder="Busque aqui"
                value={searchInput}
                onChange={handleSearchInputChange} />

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