import { PostFormData } from "../../utils/http-client";

export const uploadPDF = function (data,headers) {
    return PostFormData(`/generateFromPDF`, 'POST', data, true,headers);
}
export const uploadAdjusterMail = function (data,headers) {
    return PostFormData(`/generateFromEmail`, 'POST', data, true,headers);
}