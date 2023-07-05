import './styles.scss';
import { useState, useEffect } from 'react';
import Modal from "react-modal";
import { Link } from 'react-router-dom';
import { Filter } from '../Filter';


export const Products = () => {

    const [loading, setLoading] = useState(true);
    const [sort, setSort] = useState();
    const [category, setCategory] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");
    const [data, setData] = useState([]);
    const [products, setProducts] = useState([]);
    const [modalIsOpen, setIsOpen] = useState(false);
    const [modalProduct, setModalProduct] = useState({});

    useEffect(() => {
        getProducts();
    }, []);

    useEffect(() => {
        setFilter(false);
    }, [sort, category]);

    const getProducts = () => {
        fetch("https://fakestoreapi.com/products")
        .then(response => {
          return response.json()
        })
        .then(data => {
            setData(data);
            setProducts(data);
            setLoading(false);
        })
    }

    const searchProducts = () => {
        setFilter(true);
    }

    const setFilter = (searchFilter) => {
        let filteredProducts = [];
        if (category === "all") {
            if(searchFilter === true || searchQuery !== "") {
                filteredProducts = data.filter((item) => item.title.toLowerCase().includes(searchQuery.toLowerCase()));
            } else {
                filteredProducts = data;
            }
        } else {
            if(searchFilter === true || searchQuery !== "") {
            filteredProducts = data.filter((product) => product.category === category).
                                    filter((item) => item.title.toLowerCase().includes(searchQuery.toLowerCase()));
            } else {
                filteredProducts = data.filter((product) => product.category === category)
            }
        }
        let priceAsc = (a, b) => {
            return a.price - b.price;
        }
        let priceDesc = (a, b) => {
            return b.price - a.price;
        }
        let titleAsc = (a, b) => {
            return a.title.localeCompare(b.title)
        }
        let titleDesc = (a, b) => {
            return b.title.localeCompare(a.title)
        }

        let orderedProducts = filteredProducts;

        switch(sort) {
            case "Price (asc)":
                orderedProducts = filteredProducts.slice().sort(priceAsc); 
                break;
            case "Price (desc)":
                orderedProducts = filteredProducts.slice().sort(priceDesc); 
                break;
            case "Title (asc)":
                orderedProducts = filteredProducts.slice().sort(titleAsc); 
                break;
            case "Title (desc)":
                orderedProducts = filteredProducts.slice().sort(titleDesc); 
                break;
        }
        setProducts(orderedProducts);
    }

    const starArray = [1, 2, 3, 4, 5];

    const fillRatingStar = (key, rating) => {
        if(Math.floor(rating) >= key) {
            return "#2B32DC"
        } else {
            return "none"
        }
    }

    async function openModal(id) {
        await fetch(`https://fakestoreapi.com/products/${id}`)
        .then(response => {
          return response.json()
        })
        .then(data => {
            setModalProduct(data);
            setIsOpen(true);
        })
    }
    
    function closeModal() {
        setIsOpen(false);
        setTimeout(() => {
            setModalProduct({});
          }, "1000");
    }

    return (
        <div>
            {loading == false &&
            <>
                <Filter
                    sort={setSort}
                    category={setCategory}
                    search={setSearchQuery}
                    searchFunction={searchProducts}
                />
        
                <div className='products'>
                    <h2>Products</h2>
                    <hr></hr>
                    <div className='ProductSection'>
                        {products.map((product) => (
                            <div key={product.id} className='productItem' onClick={() => openModal(product.id)}>
                                <div className='productImage'><img src={product.image}/></div>
                                <div className='productInfo'>
                                    <div className='productTitle'>{product.title}</div>
                                    <div className='productCategory'>{product.category}</div>
                                    <div className='productStar'>
                                        {starArray.map((star) => (
                                            <svg key={star} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={fillRatingStar(star, product.rating.rate)} strokeWidth={1.5} stroke="#2B32DC" className="w-6 h-6">
                                                <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                                            </svg>
                                        ))}
                                    </div>
                                    <div className='productRate'>{product.rating.rate}</div>
                                    <div className='productRatingCount'>{product.rating.count} reviews</div>
                                    <div className='productLine'>
                                        <hr></hr>
                                    </div>
                                    <div className='productPrice'>$ {product.price}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    overlayClassName="modal-overlay"
                    className="modal-content"
                    ariaHideApp={false}
                    closeTimeoutMS={1000}
                >
                    <div className='productImage'><img src={modalProduct.image}/></div>
                    <div className='productInfo'>
                        <div className='productTitle'>{modalProduct.title}</div>
                        <div className='productRateGroup'>
                            <div className='ratingSection'>
                                <div className='productStar'>
                                    {starArray.map((star) => (
                                        <svg key={star} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={fillRatingStar(star, modalProduct?.rating?.rate)} strokeWidth={1.5} stroke="#2B32DC" className="w-6 h-6">
                                            <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                                        </svg>
                                    ))}
                                </div>
                                <div className='productRate'>{modalProduct?.rating?.rate}</div>
                            </div>
                            <div className='productRatingCount'>{modalProduct?.rating?.count} reviews</div>
                        </div>
                        <div className='productPrice'>$ {modalProduct.price}</div>
                        <div className='productLine'>
                            <hr></hr>
                        </div>
                        <div className='productDescription'>{modalProduct.description}</div>
                        <div className='productCategory'>{modalProduct.category}</div>
                        <Link to={'/cart'}>
                            <button className='productBuy'>
                                Buy Now
                            </button>
                        </Link>

                    </div>
                    <div className='closeModal'>
                        <svg onClick={closeModal} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#8F8B8B" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </div>

                </Modal>
            </>
            }
            {loading == true && 
                <div className='loading'>
                    Loading...
                </div>
            }

        </div>
    );
}