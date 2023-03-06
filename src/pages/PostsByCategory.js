import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {getPostsByCategoryRequest, getPostsRequest} from "../APIRequest/productApi";
import {Button, Col, Row} from "antd";
import PostCard from "../components/card/ProductCard";

const PostsByCategory = () => {

    const params = useParams();
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [total, setTotal] = useState(0);
    const [posts, setPosts] = useState([])

    const loadPosts = async ()=> {
        try {
            getPostsByCategoryRequest(params.name, page).then(res => {
                setPosts(res?.data[0]?.posts);
                setTotal(res?.data[0]?.totalPost[0]?.count)
            })

        }catch (e) {
            console.log(e)
        }
    }

    const loadMore = async ()=>{
        try {
            setLoading(true);
            getPostsByCategoryRequest(params.name, page).then(res => {
                setPosts([...posts, ...res?.data[0]?.posts])
            })
            setLoading(false);
        }catch (e) {
            console.log(e);
        }

    }

    useEffect(()=> {
        if (page === 1) return;
        loadMore().catch(e => console.log(e));

    }, [page])

    useEffect(()=> {
        document.title = params.name
        loadPosts().catch(e => console.log(e));
    }, [params.name])

    return (
        <>
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

export default PostsByCategory;