const mongoose = require("mongoose")
const UserProfile = require("../models/UserProfiles")
const UserAccessibilty = require("../models/UserAccessebility")

const Access_Check = async(user,Access) => {
    const userRole = user.userRole.name
    console.log(userRole)
    if(userRole === "Special"){
        const userAccess = (await UserAccessibilty.findOne({userId : user._id})).access[Access]
        if(userAccess === true){
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

