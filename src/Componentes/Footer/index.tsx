import './Footer.css'

interface FooterProps {
    enderecoImagem: string
    textoAlternativo?: string
}

const Footer = ({enderecoImagem, textoAlternativo}: FooterProps) => {
    return (
        <footer className="footer">
            <p>Desenvolvido por Matheus Quevedo</p>
            <img src={enderecoImagem} alt={textoAlternativo} />
        </footer>
    )
}

export default Footer