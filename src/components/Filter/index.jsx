import { useState, useEffect } from 'react';
import './styles.scss';

export const Filter = ({ sort, category }) => {

    const [categoryData, setCategoryData] = useState([]);

    useEffect(() => {
        getCategory();
      }, [])

    const getCategory = () => {
        fetch("https://fakestoreapi.com/products/categories")
        .then(response => {
          return response.json()
        })
        .then(data => {
            setCategoryData(data);
        })
    }

    const categoryChangeHandler = (event) => {
        category(event.target.value);
    }

    const sortOptions = ['Price (asc)', 'Price (desc)', 'Title (asc)', 'Title (desc)'];
    const sortChangeHandler = (event) => {
        sort(event.target.value);
    }

    return (
        <div>
            <input placeholder='search'></input>

            <select defaultValue="" onChange={categoryChangeHandler}>
                <option value={""} disabled>Category</option>
                {categoryData.map((option, index) => {
                return <option key={index} >
                            {option}
                        </option>
                    })}
            </select>

            <select defaultValue="" onChange={sortChangeHandler}>
            <option value="" disabled>SortBy</option>
            {sortOptions.map((option, index) => {
                return <option key={index} >
                            {option}
                        </option>
                    })}
            </select>
        </div>
    );
}