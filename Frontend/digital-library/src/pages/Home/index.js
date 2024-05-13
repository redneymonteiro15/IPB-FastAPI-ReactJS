import React, { useEffect, useState } from 'react';
import Header from '../../components/header';
import Footer from '../../components/footer';
import * as Icon from 'react-bootstrap-icons';
import './styles.css'
import { useNavigate } from 'react-router-dom';

const link = [
  'https://portal3.ipb.pt/uploads/bibliotecas/Politica_de_Acesso_Aberto_de_Publicacoes_Cientificas_na_Biblioteca_Digital_do_IPB.pdf',
  'https://portal3.ipb.pt/uploads/bibliotecas/Poli%CC%81tica%20Preservacao%20Biblioteca%20Digital%20v1.pdf',
  'https://portal3.ipb.pt/uploads/bibliotecas/Regulamento%20Biblioteca%20Digital%20do%20IPB.pdf',
  'https://view.officeapps.live.com/op/view.aspx?src=https%3A%2F%2Fportal3.ipb.pt%2Fuploads%2Fbibliotecas%2Fimagens%2FPEDIDO_NAO_PUBLICACAO_BIBLIOTECADIGITAL.docx&wdOrigin=BROWSELINK',
  'https://www.sherpa.ac.uk/romeo/',
  'https://portal3.ipb.pt/index.php/pt/bibliotecas/servicos-de-documentacao-e-bibliotecas'
]

function Home() {
  const navigate = useNavigate();

  const [search, setSerach] = useState('')

  

  useEffect(() => {
    
  }, [])

  const searchBook = () => {
    navigate(`/book/?search=${encodeURIComponent(search)}`);
  }

  const handleSearchBook = (event) => {
    setSerach(event.target.value)
  }

  const openLink = (id) => {
    window.open(link[id], '_blank');
  }

  return (
    <div>
      <Header pageName={'Home'} />
      
      <section className='home'>
        <div class="row text-center col-search">
          <div class="col-sm-6 col-md-8">
            <h4>IPB Digital Library</h4> 
          </div>
          <div class="col-6 col-md-4">
            <input type='search' placeholder='Search book' value={search} onChange={handleSearchBook} />
            <button onClick={() => searchBook()}>
              <Icon.Search className='icon-search' />
            </button>
          </div>
        </div>
        <div class="row text-center col-info">
          <div class="col-sm-6 col-md-8">
            <h3>Welcome</h3>
            <p>
              The IPB Digital Library aims to disseminate and allow free access to scientific production produced by the academic community, promoting the integration, sharing and visibility of scientific information and ensuring the preservation of the intellectual memory of the Bragança Polytechnic Institute.
            </p>
          </div>
          <div class="col-4 col-md-4">
            <a onClick={() => openLink(0)}>Open Access Policy of Scientific Publications</a>
            <a onClick={() => openLink(1)}>Preservation Policy</a>
            <a onClick={() => openLink(2)}>Digital Library Regulation</a>
            <a onClick={() => openLink(3)}>Request for Non-Publication online - Masther Thesis</a>
            <a onClick={() => openLink(4)}>Copyright - Sherpa Romeo</a>
            <a onClick={() => openLink(5)}>Documentation Services and Libraries of IPB</a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Home;