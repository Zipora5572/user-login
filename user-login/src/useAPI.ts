import axios from 'axios';
import { UserType } from './User';
import { useState } from 'react';


const API_URL = 'http://localhost:3000/api/user';

const fetchUserByEmail = async (email: string)=> {
    try {
        const response = await axios.get(`${API_URL}`, {
            params: { email } 
        });
       
        return response.data; 
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
         
            
            console.error('Error fetching user:', error.response.data.message);
        } else {
            console.error('Error:', error.message);
        }
        return null; 
    }
};


export const register = async (user: Omit<UserType, 'id'>) => {
    try {
        const res = await axios.post(`${API_URL}/register`,
            {
                email: user.email,
                password: user.password
            },
        )
        console.log(res.data);
        
        return res.data;

       
    } catch (e) {
        console.log(e);
        if (e.status === 422)
            alert('user already sign up')
    }
}

export const login = async (user:Partial<UserType>) => {
    try {
        const res = await axios.post(`${API_URL}/login`,
            {
                email: user.email,
                password: user.password
            },
        )
        console.log(res.data);
        
        return res.data;
     
    } catch (e) {
        console.log(e);
        if (axios.isAxiosError(e) && e.response?.status === 401) {
            alert('user not found')
        }
    }
}


export const update= async (user: Partial<UserType>) => {
    try {
        if (!user.email) {
            throw new Error('Email is required');
        }
        const userData = await fetchUserByEmail(user.email);
       
        
        const res = await axios.put(`${API_URL}`,
            {
                email: user.email,
                password: user.password
            },
         { headers: {'user-id':userData.userId} }
        )
        console.log(res.data);
        
        return res.data;
    } catch (e) {
        console.log(e);
        if (axios.isAxiosError(e) && e.response?.status === 401) {
            alert('user not found')
        }
    }
}
