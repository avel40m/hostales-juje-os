const API_RES = 'http://localhost:4000/api';

export const postLogin  = async (datos) => {
    try {
        const response = await fetch(`${API_RES}/login`,{
            method: 'POST',
            headers: {
                'Content-type':'application/json'
            },
            body: JSON.stringify(datos)
        });
        return await response.json();
    } catch (error) {
        return error;
    }
}

export const postRegister = async (datos) => {
    try {
        const response = await fetch(`${API_RES}/register`,{
            method: 'POST',
            headers: {
                'Content-type':'application/json'
            },
            body: JSON.stringify(datos)
        });
        return await response.json();
    } catch (error) {
        return error;
    }
}

export const getUser = async (token) => {
    try {
        const response = await fetch(`${API_RES}/verify-token`,{
            method: 'GET',
            headers: {
                'Authorization':`Bearer ${token}`
            }
        });
        return await response.json();
    } catch (error) {
        return error;
    }
}

export const getAllUser = async (token) => {
    try {
        const response = await fetch(`${API_RES}/users`,{
            method: 'GET',
            headers: {
                'Authorization':`Bearer ${token}`
            }
        });
        return await response.json();
    } catch (error) {
        return error;
    }
}