const API_URL = 'http://localhost:4000/api';

export const postPayment = async (nombre,precio,id) => {
    const body = {nombre,precio,id};
try {
    const response = await fetch(`${API_URL}/create-order`,{
        method:'POST',
        headers: {
            'Content-type':'application/json'
        },
        body: JSON.stringify(body)
    })
    return await response.json();
} catch (error) {
    return error    
}
}

export const getPayment = async (id) => {
    try {
        const response = await fetch(`${API_URL}/booking/${id}/pay`,{
            method: 'GET'
        });
        return await response.json();
    } catch (error) {
        return error
    }
}