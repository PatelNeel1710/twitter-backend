const errorHandlerAsync = (func: any) => {
    return (req: any, res: any, next: any) => {
        try {
            func(req, res, next);
        } catch (err) {
            next(err);
        }
    };
};

export default errorHandlerAsync;