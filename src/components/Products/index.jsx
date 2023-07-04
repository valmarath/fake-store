import './styles.scss';
import { useState, useEffect } from 'react';
import { Filter } from '../Filter';


export const Products = () => {

    const [loading, setLoading] = useState(true);
    const [sort, setSort] = useState();
    const [category, setCategory] = useState();
    const [products, setProducts] = useState([]);

    useEffect(() => {
        getProducts();
    }, []);

    useEffect(() => {
        console.log("effect", sort);
    }, [sort]);

    useEffect(() => {
        console.log("effect", category);
    }, [category]);

    const getProducts = () => {
        fetch("https://fakestoreapi.com/products")
        .then(response => {
          return response.json()
        })
        .then(data => {
            setProducts(data);
            setLoading(false);
        })
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
        
                <p>Products</p>
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