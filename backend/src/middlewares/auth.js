const adminAuth = (req,res,next) => {
    console.log("admin authentication");
    const token = "xyz";
    const isAdminAuth = token === "xyz";
    if(!isAdminAuth){
        res.status(401).send("unauthorized");
    } 
    else {
        next();
    }
};

const userAuth = (req,res,next) => {
    console.log("user authentication");
    const token = "abc";
    const isUserAuth = token === "abc";
    if(!isUserAuth){
        res.status(401).send("unauthorised")
    } else {
        next();
    }
    
}

module.exports = {
    adminAuth,
    userAuth
}