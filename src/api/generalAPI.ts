import axiosInstance from "./axiosConfig";
import { useToast } from 'vue-toastification'

const toast = useToast();

export const index = async (url: string) => {
    
    try{
        const response = await axiosInstance.get(`${url}`);
        return response.data;
    }catch(error: any){
        toast.error(error.response.data.error);
        throw error;
    }
};

export const store = async (url: string, TypeData: any) => {
    try {
        let link = url != '' ? `${url}` : ``;
        const response = await axiosInstance.post(link, TypeData);
        if(response.data.success){
            
            toast.success(response.data.message);
        }else{
            toast.error(response.data.message);
        }
        
        return response.data;
    } catch (error: any) {
        toast.error(error.response.data.error);
      throw error;
    }
  };
  

export const update = async (url: string, updatedData: any) => {
    try {
        const response = await axiosInstance.put(`${url}`, updatedData);

        if(response.data.success){
            toast.success(response.data.success);
        }

        return response.data;
    } catch (error: any) {
        toast.error(error.response.data.error);
        throw error;
    }
};

export const show = async (url: string, feedback = false) => {
    try {
        const response = await axiosInstance.get(`${url}`);

        if(feedback && response.data.success){
            toast.success(response.data.success);
        }

        return response.data;
    } catch (error: any) {
        toast.error(error.response.data.error);
        throw error;
    }
};


export const destroy = async (url: string) => {
    try {
        const response = await axiosInstance.delete(`${url}`);

        if(response.data.success){
            toast.success(response.data.success);
        }

        return response.data;
    } catch (error: any) {
        toast.error(error.response.data.error);
        throw error;
    }
};
