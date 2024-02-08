import axiosInstance from "./axiosConfig";
import { useToast } from 'vue-toastification'

const toast = useToast()

export const getAll = async (url: string) => {
    try{
        const response = await axiosInstance.get(`/api/companies/${url}`);
        return response.data;
    }catch(error){
        throw error;
    }
};

export const create = async (url: string, TypeData: any) => {
    try {
        let link = url != '' ? `/api/companies/${url}` : `/api/companies`;
        const response = await axiosInstance.post(link, TypeData);

        if(response.data.success){
            toast.success(response.data.success);
        }

        return response.data;
    } catch (error) {
      throw error;
    }
  };
  

export const update = async (url: string, updatedData: any) => {
    try {
        const response = await axiosInstance.put(`/api/companies/${url}`, updatedData);

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
        const response = await axiosInstance.get(`/api/companies/${url}`);

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
        const response = await axiosInstance.delete(`/api/companies/${url}`);

        if(response.data.success){
            toast.success(response.data.success);
        }

        return response.data;
    } catch (error) {
        throw error;
    }
};
