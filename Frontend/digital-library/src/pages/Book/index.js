import React from "react";
import Header from "../../components/header";
import Footer from "../../components/footer";
import './styles.css'


function Book() {
    
    return(
        <div>
            <Header />
            
            <section className="section">
                <aside className="aside-search">
                    <input type="search" placeholder="Book name" />
                    <select>
                        <option>Item 1</option>
                        <option>Item 1</option>
                        <option>Item 1</option>
                    </select>
                    <button>
                        Search
                    </button>
                </aside>
                <aside className="list-books">
                <div class="mb-3">
  <div class="row g-0">
    <div class="col-md-4">
      <img src='../../assets/favicon.png' class="img-fluid rounded-start" alt="..."/>
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <p className="card-category">Programmer</p>
        <h5 class="card-title">C++ Programming Language</h5>
        <p class="card-author">Bjarne Stoustrup</p>
        <button class="card-button">
            See details
        </button>
      </div>
    </div>
  </div>
</div>
                </aside>
            </section>

            <Footer />
        </div>
    )
}

export default Book;