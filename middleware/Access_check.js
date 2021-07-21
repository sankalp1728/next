const mongoose = require("mongoose")
const UserProfile = require("../models/UserProfiles")

const Access_Check = async(user,Access) => {
    const userRole = user.userRole.name
    console.log(user.userRole.name)
    if(userRole == "special"){
        const userAccess = await UserAccessibilty.findOne({email : user.email}).access[Access]
        if(userAccess == true){
            return true;
        }else{
            return false;
        }
    }
    const userProfile = await UserProfile.findOne({role : userRole});
    const profile = userProfile.access[Access];
    if(profile == true){
        return true;
    }else{
        return false;
    }
}

module.exports = {
    Access_Check
}

