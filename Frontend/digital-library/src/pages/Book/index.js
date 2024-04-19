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

                </aside>
            </section>

            <Footer />
        </div>
    )
}

export default Book;