import { PostFormData } from "../../utils/http-client";

export const uploadPDF = function (data,headers) {
    return PostFormData(`/summarize`, 'POST', data, true,headers);
}
export const uploadAdjusterMail = function (data,headers) {
    return PostFormData(`/generate-email`, 'POST', data, true,headers);
}