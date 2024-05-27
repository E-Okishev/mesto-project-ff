import {profileTitle, profileDescription} from './const.js'

export function updateUserInfo(userInfo) {
    profileTitle.textContent = userInfo.name;
    profileDescription.textContent = userInfo.about;
}