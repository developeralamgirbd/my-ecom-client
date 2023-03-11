import axios from "axios";
import { useNavigate } from "react-router-dom";
import {useSearch} from "../context/search";
import {getProductsByKeywordRequest} from "../APIRequest/productApi";
import React from "react";

const Search = () => {

    const { setProducts, keyword, setKeyword, setTotal,setSearchProductLoading } = useSearch();
    const navigate = useNavigate();

    const handleSubmit = async (e)=> {
        e.preventDefault();
        try {
            setSearchProductLoading(true)
            getProductsByKeywordRequest(keyword, 1).then(res => {
                setSearchProductLoading(false)
                setProducts(res?.products?.rows);
                setTotal(res?.products?.total)
            })

            navigate('/search');

        }catch (e) {
            console.log(e)
        }
    }
    return (

        <form className="d-flex" role="search" onSubmit={handleSubmit}>
            <input className="form-control me-2" type="search" placeholder="Search"
                   name='search'
                   onChange={(e) => {
                       setKeyword(e.target.value);
                      }}
                   value={keyword}
                   aria-label="Search"/>
            <button className="btn btn-outline-success" type="submit">Search</button>
        </form>

    // <form className="d-flex" onSubmit={handleSubmit}>
    //         <input
    //             type="search"
    //             style={{ borderRadius: "0px" }}
    //             className="form-control"
    //             placeholder="Search"
    //             name='search'
    //             onChange={(e) => {
    //                 setKeyword(e.target.value);
    //             }}
    //             value={keyword}
    //         />
    //         <button
    //             className="btn btn-outline-primary"
    //             type="submit"
    //             style={{ borderRadius: "0px" }}
    //         >
    //             Search
    //         </button>
    //     </form>
    );
}

export default Search;