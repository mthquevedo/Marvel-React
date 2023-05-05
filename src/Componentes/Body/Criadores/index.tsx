import './Criadores.css'
import React, { useCallback, useEffect, useState } from 'react';
import api from '../../Services/api';
import BotaoMais from '../../Botão Mais';

interface ResponseData {
    id: string;
    firstName: string;
    middleName: string;
    fullName: string;
    description: string;
    thumbnail: {
        path: string;
        extension: string;
    };
    back: string;
}


const Criadores: React.FC = () => {
    const [creators, setCreators] = useState<ResponseData[]>([]);
    const [searchInput, setSearchInput] = useState("");
    const [search, setSearch] = useState("");

    useEffect(() => {
        api
            .get(`/creators?nameStartsWith=${search}`)
            .then((response) => {
                setCreators(response.data.data.results);
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
            const offset = creators.length;
            const response = await api.get(`creators`, {
                params: {
                    offset,
                },
            });

            setCreators([...creators, ...response.data.data.results]);

        } catch (err) {
            console.log(err)
        }
    }, [creators])

    function handleSearch() {
        const dados = creators;
        const pesquisas = JSON.stringify(dados.map(creator => creator.fullName));

        localStorage.setItem('dados', pesquisas)
    }

    function botao() {
        return (
            <BotaoMais onClick={carregarMais} />
        )
    }

    return (
        <><div className='titulo'>
            <h1>CRIADORES</h1>
            <input type="search"
                placeholder="Busque aqui o nome do criador(a)"
                value={searchInput}
                onChange={handleSearchInputChange}
                onClick={handleSearch} />

        </div>
            <div className='card-list'>
                {creators.map(creator => {
                    const urlImg = creator.thumbnail.path + '.' + creator.thumbnail.extension;
                    const back = { backgroundImage: `url(${urlImg})` };
                    return (
                        <><div className='card' key={creator.id}>
                            <div id="img" style={back} />
                            <h2>{creator.fullName}</h2>
                            <p>{creator.description}</p>
                        </div>
                        </>
                    )
                })}
            </div>
            {botao()}
        </>);
}

export default Criadores