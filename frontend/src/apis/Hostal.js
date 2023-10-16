const API_RES = 'http://localhost:4000/api';

export const createHostal = async (data) => {
    try {
        const response = await fetch(`${API_RES}/hostal`,{
            method: 'POST',
            headers: {
                'Content-type':'application/json'
            },
            body: JSON.stringify(data)
        })
        console.log(await response.json());
        return response;
    } catch (error) {
        return error
    }
}

export const getHostal = async () => {
    try {
        const response = await fetch(`${API_RES}/hostal`,{
            method:'GET'
        });
        return await response.json();
    } catch (error) {
       return error 
    }
}

export const detailsHostal = async (id) => {
    try {
        const response = await fetch(`${API_RES}/hostal/${id}`,{
            method: 'GET'
        });
        return await response.json();
    } catch (error) {
        return error
    }
}

export const getHostalMenu = async () => {
    try {
        const response = await fetch(`${API_RES}/menu/hostal`,{
            method: 'GET'
        })
        return await response.json();
    } catch (error) {
        return error
    }
}

export const getHostalMenuDetails = async (id) => {
    try {
        const response = await fetch(`${API_RES}/menu/${id}/details`,{
            method: 'GET'
        });
        return await response.json();
    } catch (error) {
        return error
    }
}