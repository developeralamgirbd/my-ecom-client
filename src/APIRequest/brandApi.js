import axios from "axios";
import toast from "react-hot-toast";

/*
export const categoryCreateUpdateRequest = async (name, id,)=>{

    try {
            if (!id){
                await axios.post('/categories', {name});
                toast.success('Category create success')
            }else {
                const {data} = await axios.patch(`/categories/${id}`, {name});
                // if (data.result.modifiedCount > 0){
                //     toast.success('Category update success')
                // }else {
                //     toast.error('Category update fail')
                // }
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

export const subCategoryCreateUpdateRequest = async (name, id, formAction)=>{

    try {
        if (formAction === 'create'){
            await axios.post('/sub-categories', {name, parentID: id});
            toast.success('Category create success')
        }else {
            const {data} = await axios.patch(`/sub-categories/${id}`, {name});
            // if (data.result.modifiedCount > 0){
            //     toast.success('Category update success')
            // }else {
            //     toast.error('Category update fail')
            // }
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


export const subCatChildrenCreateUpdateRequest = async (name, id,index)=>{

    try {

        const {data} = await axios.put(`/sub-categories-children`, {name, id, index});
        toast.success('Category create success')

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
}*/

export const getBrandsRequest = async ()=>{
    try {
        const {data} = await axios.get('/brands');
        console.log('brand',data)
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

//
// export const deleteCategoryRequest = async (id)=>{
//     try {
//         const {data} = await axios.delete(`/categories/${id}`);
//         console.log(data.data.deletedCount);
//         if (data.data.deletedCount > 0){
//             toast.success('Category delete success')
//             return true
//         }
//
//     }catch (e) {
//         if (e.response.status === 400){
//             toast.error(e.response.data.error)
//             return false
//         }else {
//             toast.error('Server error occurred')
//             return false
//         }
//     }
// }
//
// export const getSingleCategoryRequest = async (id, childName)=>{
//     try {
//         const {data} = await axios.get(`/categories/${id}/${childName}`);
//         return data
//
//     }catch (e) {
//         if (e.response.status === 400){
//             toast.error(e.response.data.error)
//         }else {
//             toast.error('Server error occurred')
//         }
//     }
// }