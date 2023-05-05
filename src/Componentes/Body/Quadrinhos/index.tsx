import './Quadrinhos.css'
import React, { useCallback, useEffect, useState } from 'react';
import api from '../../Services/api';
import BotaoMais from '../../Botão Mais';

interface ResponseData {
    id: string;
    title: string;
    description: string;
    thumbnail: {
        path: string;
        extension: string;
    };
    back: string;
}

const Quadrinhos: React.FC = () => {
    const [comics, setComics] = useState<ResponseData[]>([]);
    const [searchInput, setSearchInput] = useState("");
    const [search, setSearch] = useState("");

    useEffect(() => {
        api
            .get(`/comics?nameStartsWith=${search}`)
            .then((response) => {
                setComics(response.data.data.results);
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
            const offset = comics.length;
            const response = await api.get(`comics`, {
                params: {
                    offset,
                },
            });

            setComics([...comics, ...response.data.data.results]);

        } catch (err) {
            console.log(err)
        }
    }, [comics])

    function handleSearch() {
        const dados = comics;
        const pesquisas = JSON.stringify(dados.map(comic => comic.title));

        localStorage.setItem('dados', pesquisas)
    }

    function botao() {
        return (
            <BotaoMais onClick={carregarMais} />
        )
    }

    return (
        <><div className='titulo'>
            <h1>QUADRINHOS</h1>
            <input type="search"
                placeholder="Busque aqui o nome do quadrinho"
                value={searchInput}
                onChange={handleSearchInputChange}
                onClick={handleSearch} />

        </div>
            <div className='card-list'>
                {comics.map(comic => {
                    const urlImg = comic.thumbnail.path + '.' + comic.thumbnail.extension;
                    const back = { backgroundImage: `url(${urlImg})` };
                    return (
                        <><div className='card' key={comic.id}>
                            <div id="img" style={back} />
                            <h2>{comic.title}</h2>
                            <p>{comic.description}</p>
                        </div>
                        </>
                    )
                })}
            </div>
            {botao()}
        </>);
};

export default Quadrinhos