import axios from "axios";
import toast from "react-hot-toast";

export const productCreateUpdateRequest = async (value, id)=>{

    try {
        let url = '/products';
        if (!id){
            const {data} = await axios.post('/products', value);
            toast.success('Product create success')
            return true
        }else {
            url = `/products/${id}`;
            await axios.patch(url, value);
            toast.success('Product update success')
            return true
        }
    }catch (e) {
        if (e.response.status === 400){
            toast.error(e.response.data.error)
            return false
        }else {
            toast.error('Server error occurred')
            return false
        }
    }
}

export const getSingleProductRequest = async (id)=>{
    try {
        const {data} = await axios.get(`/products/${id}`);

        return data

    }catch (e) {
        if (e.response.status === 400){
            toast.error(e.response.data.error)
        }else {
            toast.error('Server error occurred')
        }
    }
}

export const getProductsRequest = async (page, perpage = 12)=>{
    try {
        const {data} = await axios.get(`/products/${page}/${perpage}/list`);
        return data

    }catch (e) {
        if (e.response.status === 400){
            toast.error(e.response.data.error)
        }else {
            toast.error('Server error occurred')
        }
    }
}

export const getPostsByCategoryRequest = async (name, page)=>{
    try {
        const {data} = await axios.get(`/posts/category/${name}/${page}`);
        return data

    }catch (e) {
        if (e.response.status === 400){
            // toast.error(e.response.data.error)
        }else {
            toast.error('Server error occurred')
        }
    }
}


export const getProductsByCategoryRequest = async (name, page, perpage = 12)=>{
    try {
        const {data} = await axios.get(`/products/category/${name}/${page}/${perpage}`);
        return data

    }catch (e) {
        if (e.response.status === 400){
            // toast.error(e.response.data.error)
        }else {
            toast.error('Server error occurred')
        }
    }
}

export const getPostsByKeywordRequest = async (keyword, page)=>{
    try {
        const {data} = await axios.get(`/posts/search/${keyword}/${page}`);
        return data
    }catch (e) {

    }
}

export const getProductsByKeywordRequest = async (keyword, page, perpage = 12)=>{
    try {
        const {data} = await axios.get(`/products/search/${keyword}/${page}/${perpage}`);
        return data
    }catch (e) {
        if (e.response.status === 400){
            // toast.error(e.response.data.error)
        }else {
            toast.error('Server error occurred')
        }
    }
}

export const getAuthPostsRequest = async ()=>{
    try {
        const {data} = await axios.get('/posts/auth');
        return data

    }catch (e) {
        if (e.response.status === 400){
            toast.error(e.response.data.error)
        }else {
            toast.error('Server error occurred')
        }
    }
}

export const deletePostRequest = async (id)=>{
    try {
        const {data} = await axios.delete(`/posts/${id}`);

        if (data.data.deletedCount > 0){
            toast.success('Post delete success')
            return true
        }

    }catch (e) {
        if (e.response.status === 400){
            toast.error(e.response.data.error)
            return false
        }else {
            toast.error('Server error occurred')
            return false
        }
    }
}

