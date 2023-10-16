const API_RES = 'http://localhost:4000/api';

export const generateBookings = async (token,id,body) => {
    try {
        const response = await fetch(`${API_RES}/booking/${id}/hostal`,{
            method: 'POST',
            headers: {
                'Content-type':'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(body)
        });
        return await response.json();
    } catch (error) {
        return error;
    }
}

export const getMyBookings = async (token) => {
    try {
        const response = await fetch(`${API_RES}/booking`,{
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

export const getAllBookings = async () => {
    try {
        const response = await fetch(`${API_RES}/booking/hostal`,{
            method:'GET'
        });
        return await response.json();
    } catch (error) {
        return error
    }
}