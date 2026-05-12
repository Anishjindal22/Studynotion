const jwt = require("jsonwebtoken")


function extractTokenFromHeader(authorizationHeader) {
    if (!authorizationHeader || typeof authorizationHeader !== "string") {
        return null;
    }

    const [scheme, rawToken] = authorizationHeader.trim().split(/\s+/);
    if (!rawToken || scheme.toLowerCase() !== "bearer") {
        return null;
    }

    return rawToken.replace(/^"|"$/g, "").trim();
}

exports.auth = async (req,res, next) => {

    try {
        const tokenFromBody = req.body?.token;
        const tokenFromCookie = req.cookies?.token;
        const tokenFromHeader = extractTokenFromHeader(req.get("Authorization"));

        const token = (tokenFromBody || tokenFromCookie || tokenFromHeader || "")
            .toString()
            .replace(/^"|"$/g, "")
            .trim();
        
        if(!token) {
            return res.status(401).json({
                success:false,
                message:'Token is missing',
            });
        }
        try {
            const payload = jwt.verify(token,process.env.JWT_SECRET);
            req.user = payload;
        } catch (error) {
            const message =
                error?.name === "TokenExpiredError"
                    ? "Token expired. Please login again."
                    : "Invalid token.";

            return res.status(401).json({
                success:false,
                message,
            })
        } 
        next();
    } catch (error) {
        console.error("Token validation failed:", error.message);
        return res.status(401).json({
            success:false,
            message:"Error in validating token"
        })
    }
}

exports.isStudent = async(req,res,next) => {
    try{
        if(req.user.accountType !== "Student") {
            return res.status(401).json({
                success:false,
                message:'This is a protected route for Students only',
            });
        }
        next();
    }
    catch(error) {
        return res.status(500).json({
            success:false,
            message:'User role cannot be verified, please try again'
        })
    }
}
exports.isInstructor = async(req,res,next) => {
    try{
        if(req.user.accountType !== "Instructor") {
            return res.status(401).json({
                success:false,
                message:'This is a protected route for Instructor only',
            });
        }
        next();
    }
    catch(error) {
        return res.status(500).json({
            success:false,
            message:'User role cannot be verified, please try again'
        })
    }
}

exports.isAdmin = async (req, res, next) => {
    try{
           if(req.user.accountType !== "Admin") {
               return res.status(401).json({
                   success:false,
                   message:'This is a protected route for Admin only',
               });
           }
           next();
    }
    catch(error) {
       return res.status(500).json({
           success:false,
           message:'User role cannot be verified, please try again'
       })
    }
   }
