const API_RES = 'http://localhost:4000/api';

export const createDetailsHostal = async (idHostal,data) => {
    try {
        const response = await fetch(`${API_RES}/details/${idHostal}/hostal`,{
            method: 'POST',
            headers: {
                'Content-type':'application/json'
            },
            body: JSON.stringify(data)
        });
        return response;
    } catch (error) {
        return error;
    }
}