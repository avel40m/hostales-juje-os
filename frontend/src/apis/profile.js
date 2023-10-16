const API_RES = 'http://localhost:4000/api';

export const getProfile = async (token) => {
    try {
        const response = await fetch(`${API_RES}/profile`,{
            method: 'GET',
            headers: {
                'Authorization':`Bearer ${token}`
            }
        });
        return await response.json(); 
    } catch (error) {
        return error
    }
}

export const createProfile = async (token,body) => {
    try {
        const response = await fetch(`${API_RES}/profile`,{
            method: 'POST',
            headers: {
                'Content-type':'application/json',
                'Authorization':`Bearer ${token}`
            },
            body: JSON.stringify(body)
        })
        return response;
    } catch (error) {
        return error
    }
}

export const editProfile = async (token,body) => {
    try {
        const response = await fetch(`${API_RES}/profile`,{
            method: 'PUT',
            headers: {
                'Content-type':'application/json',
                'Authorization':`Bearer ${token}`
            },
            body: JSON.stringify(body)
        })
        return response;
    } catch (error) {
        return error
    }
}