import axios from "axios";
import { useNavigate } from "react-router-dom";
import {useSearch} from "../context/search";
import {getPostsByKeywordRequest} from "../APIRequest/productApi";
import React from "react";

const Search = () => {

    const { setPosts, keyword, setKeyword, setTotal } = useSearch();
    const navigate = useNavigate();

    const handleSubmit = async (e)=> {
        e.preventDefault();
        try {
            getPostsByKeywordRequest(keyword, 1).then(res => {
                setPosts(res?.data[0]?.posts);
                setTotal(res?.data[0]?.totalPost[0]?.count);
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