const API_RES = 'http://localhost:4000/api';

export const createComment = async (token,body) => {
    try {
        const response = fetch(`${API_RES}/comment`,{
            method: 'POST',
            headers: {
                'Content-type':'application/json',
                'Authorization':`Bearer ${token}`
            },
            body: JSON.stringify(body)
        });
        return response;
    } catch (error) {
        return error
    }
}

export const getCommentsHostal = async () => {
    try {
        const response = await fetch(`${API_RES}//comment/hostal`,{method:'GET'});
        return await response.json();
    } catch (error) {
        return error
    }
}