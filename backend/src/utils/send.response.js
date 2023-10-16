export const sendSuccessResponse = (res, message = null,data = null,sendStatus = 200) => {
    res.status(sendStatus).json({
        status: sendStatus,
        message,
        data
    });
}

export const sendResponseError = (res,message,error = null,sendStatus = 500) => {
    res.status(sendStatus).json({
        status: sendStatus,
        message,
        error
    })
}