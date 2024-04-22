import React, { useState } from 'react';

import { Link } from 'react-router-dom';
import './styles.css'
import Header from '../../components/header';
import Footer from '../../components/footer';
import * as Icon from 'react-bootstrap-icons';

function Home() {


  return (
    <div>
      <Header pageName={'Home'} />
      
      <section className='section'>
        <div class="row text-center col-search">
          <div class="col-sm-6 col-md-8">
            <h4>IPB Digital Library</h4> 
          </div>
          <div class="col-6 col-md-4">
            <input type='search' placeholder='Search book' />
            <button>
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
            <a>Open Access Policy of Scientific Publications</a>
            <a>Preservation Policy</a>
            <a>Digital Library Regulation</a>
            <a>Request for Non-Publication online - Masther Thesis</a>
            <a>Copyright - Sherpa Romeo</a>
            <a>Documentation Services and Libraries of IPB</a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Home;