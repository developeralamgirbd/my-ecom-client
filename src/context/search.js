import React, {createContext, useContext, useState} from 'react';

const SearchContext = createContext();

const SearchProvider = ({children}) => {
    const [posts, setPosts] = useState([]);
    const [keyword, setKeyword] = useState('');
    const [total, setTotal] = useState(0);
    const values = {
        posts, setPosts, keyword, setKeyword, total, setTotal
    }
    return (
        <SearchContext.Provider value={values}>
            {children}
        </SearchContext.Provider>
    );
};

const useSearch = () => useContext(SearchContext);

export {SearchProvider, useSearch}