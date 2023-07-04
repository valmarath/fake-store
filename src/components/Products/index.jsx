import './styles.scss';
import { useState, useEffect } from 'react';
import { Filter } from '../Filter';


export const Products = () => {

    const [loading, setLoading] = useState(true);
    const [sort, setSort] = useState();
    const [category, setCategory] = useState("all");
    const [data, setData] = useState([]);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        getProducts();
    }, []);

    useEffect(() => {
        console.log(category);

        let filteredProducts = [];
        if (category === "all") {
            filteredProducts = data;
        } else {
            filteredProducts = data.filter((product) => product.category === category);
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

    const starArray = [1, 2, 3, 4, 5];

    const fillRatingStar = (key, rating) => {
        if(Math.floor(rating) >= key) {
            return "#2B32DC"
        } else {
            return "none"
        }
    }

    return (
        <div>
            {loading == false &&
            <>
                <Filter
                    sort={setSort}
                    category={setCategory}
                    loading={setLoading}
                />
        
                <div className='products'>
                    <h2>Products</h2>
                    <hr></hr>
                    <div className='ProductSection'>
                        {products.map((product) => (
                            <div key={product.id} className='productItem'>
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
            </>
            }
            {loading == true && 
                <>
                    Loading...
                </>
            }

        </div>
    );
}