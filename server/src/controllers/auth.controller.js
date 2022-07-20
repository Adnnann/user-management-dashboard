//to protect routes in case of requests coming from unathorized user from POSTMAN or similar tools

// const hasAuthorization = (req, res, next) => {
//     if(!req.cookies.userJwtToken){
//         return res.send({error:'User not signed'})
//     }else if(jwtDecode(req.cookies.userJwtToken).role !== 'admin'){
//         return res.send({error:'User not authorized'})
//     }
//     next()
// }

// export { hasAuthorization }