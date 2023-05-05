import './botaoMais.css';

interface BotaoMaisProps {
    onClick: () => void;
}

const BotaoMais: React.FC<BotaoMaisProps> = ({ onClick }) => {
    return (
        <div className='botao-container'>
            <button className='botao-mais' onClick={onClick}>Carregar mais</button>
        </div>
    );
}

export default BotaoMais;