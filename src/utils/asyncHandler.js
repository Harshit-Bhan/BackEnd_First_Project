const asyncHandler = (requestHandler) => {
    return async (req , res ,next) => {
        try {
            return await Promise.resolve(requestHandler(req, res, next));
        } catch (err) {
            return next(err);
        }
    }
}

// function asyncHandler(requestHandler){
//     return function(req,res,next){
//         Promise.resolve(requestHandler(req,res,next)).catch((err) => next(err))
//     }
// }


export {asyncHandler};

// const asyncHandler = (func) => async (req , res , next) => {
//     try {
//         await func(req , res ,next)
//     } catch (error){
//         res.status(error.code || 500).json({
//             success : false,
//             message: error.message
//         })
//     }
// }

// function asyncHandler(func){
//     return async function (){
//         return function(){
//         };
//     }
// }