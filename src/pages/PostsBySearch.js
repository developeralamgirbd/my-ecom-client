import React, {useEffect, useState} from 'react';
import {useSearch} from "../context/search";
import {Button, Col, Row} from "antd";
import PostCard from "../components/card/ProductCard";
import { getPostsByKeywordRequest} from "../APIRequest/productApi";

const PostsBySearch = () => {
    const {posts, setPosts, keyword, total, setTotal} = useSearch();
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);


    const loadMore = async ()=>{
        try {
            setLoading(true);
            getPostsByKeywordRequest(keyword, 1).then(res => {
                setPosts(res?.data[0]?.posts);
                setTotal(res?.data[0]?.totalPost[0]?.count);
            })
            setLoading(false);
        }catch (e) {
            console.log(e);
        }

    }

    useEffect(()=> {
        if (page === 1) {
            return;
        }
        loadMore().catch()
    }, [page])

    useEffect(()=>{
        document.title = keyword
    },[keyword])


    return (
        <>
            <h3>Search by - {keyword}</h3>
            {
                posts?.length > 0 ?
                    <Row gutter={16}>

                        {
                            posts.map(post => (
                                <Col span={8}>
                                    <PostCard post={post}/>
                                </Col>
                            ))

                        }
                    </Row>
                    :<h3 className='text-center d-block'>Post Not found</h3>
            }

            {posts && posts.length < total && (

                <div className='d-flex justify-content-center my-5 mb-5'>
                    <Button type="primary" className='mb-5'
                            loading={loading}
                            disabled={loading}
                            onClick={event => {
                                event.preventDefault();
                                setPage(page + 1);
                            }}
                    >
                        Load More
                    </Button>
                </div>
            )}

        </>
    );
};

export default PostsBySearch;