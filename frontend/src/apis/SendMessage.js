const API_RES = 'http://localhost:4000/api';

export const sendMessage = async (body) => {
    try {
        const response = await fetch(`${API_RES}/sendemail`,{
            method: 'POST',
            headers: {
                'content-type':'application/json'
            },
            body: JSON.stringify(body)
        })
        return response
    } catch (error) {
        return error;
    }
}