import axios from "axios";
import { CreateNewCard, LoginUser, RegisterUser } from "../@types/types";

export const baseUrl = 'https://monkfish-app-z9uza.ondigitalocean.app/bcard2';
export const usersUrl = `${baseUrl}/users`;
export const loginUrl = `${baseUrl}/users/login`;
export const newCardsUrl = `${baseUrl}/createCard`;
export const cardDetailsUrl = `${baseUrl}/cards`; // הוספת כתובת לפרטי כרטיס

export const register = (data: RegisterUser) => axios.post(usersUrl, data);
export const login = async (data: LoginUser) => {
    try {
        const response = await axios.post(loginUrl, data);
        console.log('Login response:', response.data); // הודעת ניפוי
        return response.data; // החזרת התגובה כולה, שהיא הטוקן
    } catch (error) {
        console.error('Login API error:', error);
        throw error;
    }
};

export const createCard = (data: CreateNewCard) => axios.post(newCardsUrl, data, {
    headers: {
        "x-auth-token": localStorage.getItem("token"),
    },
});

export const userDetails = (id: string) => {
    const url = `${usersUrl}/${id}`;
    return axios.get(url, {
        headers: {
            "x-auth-token": localStorage.getItem("token"),
        },
    });
};

export const getCardDetails = async (id: string, token: string | null) => {
    console.log('Fetching card details with ID:', id); // הודעת ניפוי
    try {
        const response = await axios.get(`${cardDetailsUrl}/${id}`, {
            headers: {
                'x-auth-token': token,
            },
        });
        console.log('Card details response:', response.data); // הודעת ניפוי
        return response.data;
    } catch (error) {
        console.error('Card details API error:', error);
        throw error;
    }
};

// פונקציה לעדכון כרטיס
export const updateCard = async (id: string, data: Partial<CreateNewCard>,token: string | null) => {
    console.log('Updating card with ID:', id); // הודעת ניפוי
    console.log('Update data:', data); // הודעת ניפוי
    console.log('Token:', token); // הודעת ניפוי

    try {
        const response = await axios.put(`${cardDetailsUrl}/${id}`, data, {
            headers: {
                'x-auth-token': token,
            },
        });
        console.log('Update response:', response.data); // הודעת ניפוי
        return response.data;
    } catch (error) {
        console.error('Update API error:', error);
        throw error;
    }
};

// פונקציה לעדכון משתמש
export const updateUser = async (id: string, data: Partial<RegisterUser>) => {
    const url = `${usersUrl}/${id}`;
    try {
        const response = await axios.put(url, data, {
            headers: {
                "x-auth-token": localStorage.getItem("token"),
            },
        });
        console.log('Update response:', response.data); // הודעת ניפוי
        return response.data;
    } catch (error) {
        console.error('Update API error:', error);
        throw error;
    }
};

// פונקציה למחיקת כרטיס
export const deleteCard = async (id: string, token: string | null) => {
    const url = `${cardDetailsUrl}/${id}`;
    try {
        const response = await axios.delete(url, {
            headers: {
                'x-auth-token': token,
            },
        });
        console.log('Delete response:', response.data); // הודעת ניפוי
        return response.data;
    } catch (error) {
        console.error('Delete API error:', error);
        throw error;
    }
};

// פונקציה למחיקת משתמש
export const deleteUser = async (id: string) => {
    const url = `${usersUrl}/${id}`;
    try {
        const response = await axios.delete(url, {
            headers: {
                "x-auth-token": localStorage.getItem("token"),
            },
        });
        console.log('Delete response:', response.data); // הודעת ניפוי
        return response.data;
    } catch (error) {
        console.error('Delete API error:', error);
        throw error;
    }
};






export const auth = {
    register,
    login,
    userDetails,
    createCard,
    getCardDetails,
    updateCard,
    updateUser,
    deleteUser,
    deleteCard, // הוספת הפונקציה למחיקת כרטיסים לאובייקט auth
};

export default auth;
