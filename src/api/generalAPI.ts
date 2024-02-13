import axiosInstance from "./axiosConfig";
import { useToast } from 'vue-toastification'

const toast = useToast()

export const index = async (url: string) => {
    try{
        const response = await axiosInstance.get(`/api/${url}`);
        return response.data;
    }catch(error){
        throw error;
    }
};

export const store = async (url: string, TypeData: any) => {
    try {
        let link = url != '' ? `/api/${url}` : `/api`;
        const response = await axiosInstance.post(link, TypeData);
        if(response.data.success){
            console.log('passou aqui');
            console.log(response.data.success);
            toast.success(response.data.success);
        }

        return response.data;
    } catch (error) {
      throw error;
    }
  };
  

export const update = async (url: string, updatedData: any) => {
    try {
        const response = await axiosInstance.put(`/api/${url}`, updatedData);

        if(response.data.success){
            toast.success(response.data.success);
        }

        return response.data;
    } catch (error) {
        throw error;
    }
};

export const show = async (url: string, feedback = false) => {
    try {
        const response = await axiosInstance.get(`/api/${url}`);

        if(feedback && response.data.success){
            toast.success(response.data.success);
        }

        return response.data;
    } catch (error) {
        throw error;
    }
};


export const destroy = async (url: string) => {
    try {
        const response = await axiosInstance.delete(`/api/${url}`);

        if(response.data.success){
            toast.success(response.data.success);
        }

        return response.data;
    } catch (error) {
        throw error;
    }
};
