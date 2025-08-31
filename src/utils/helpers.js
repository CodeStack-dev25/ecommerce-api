export const successResponse = (res, data = {}, message = "Operación exitosa", status = 200) => {
  return res.status(status).json({
    success: true,
    message,
    data,
    errors: []
  });
};

export const errorResponse = (res, message = "Ocurrió un error", errors = [], status = 500) => {
  return res.status(status).json({
    success: false,
    message,
    data: {},
    errors
  });
};