import axios from "axios";
import toast from "react-hot-toast";

export const categoryCreateUpdateRequest = async (name, id)=>{
    try {
        let url = '/categories';
        if (!id){
            await axios.post(url, {name});
            toast.success('Category create success')
        }else {
            url = `/categories/${id}`;
            await axios.patch(url, {name});
            toast.success('Category update success')
        }

        return true
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

export const getCategoryRequest = async ()=>{
    try {
        const {data} = await axios.get('/categories');
        return data
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


export const deleteCategoryRequest = async (id)=>{
    try {
        const {data} = await axios.delete(`/categories/${id}`);
        console.log(data.data.deletedCount);
        if (data.data.deletedCount > 0){
            toast.success('Category delete success')
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

export const getSingleCategoryRequest = async (id)=>{
    try {
        const {data} = await axios.get(`/categories/${id}`);
        return data

    }catch (e) {
        if (e.response.status === 400){
            toast.error(e.response.data.error)
        }else {
            toast.error('Server error occurred')
        }
    }
}