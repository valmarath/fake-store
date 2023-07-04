import { useState, useEffect } from 'react';
import './styles.scss';

export const Filter = ({ sort, category }) => {

    const [categoryData, setCategoryData] = useState([]);

    useEffect(() => {
        getCategory();
      }, [])


    const searchHandler = (e) => {
        e.preventDefault();
    }

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
        <div className='filters'>
            <form className='search' onSubmit={searchHandler}>
                <p>Search</p>
                <input className='searchInput'></input>
                <button type='submit'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
    </svg>
                </button>
            </form>

            <select defaultValue="" onChange={categoryChangeHandler} className='category'>
                <option value={""} disabled>Category</option>
                <option value={"all"}>all</option>
                {categoryData.map((option, index) => {
                return <option key={index} >
                            {option}
                        </option>
                    })}
            </select>

            <select defaultValue="" onChange={sortChangeHandler} className='sort'>
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