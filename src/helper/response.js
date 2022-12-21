module.exports = {
    success: (res, data, status, message) => {
        res.json({
            code: 200,
            status,
            data,
            message,
        })
    },
    failed: (res, error, status, message) => {
        res.json({
            code: 500,
            status,
            data: null,
            error,
            message
        })
    },

    succesWithToken : (res, token, status, message) => {
        res.json({
            status,
            token,
            message
        })
    },

    succesWithPagination : (res, result, status, message, pagination) => {
        const resultPrint = {};
        resultPrint.status = "success";
        resultPrint.statusCode = status;
        resultPrint.data = result;
        resultPrint.message = message || null;
        if (pagination) {
          resultPrint.pagination = pagination;
        }
      
        res.status(status).json(resultPrint);
      },
}