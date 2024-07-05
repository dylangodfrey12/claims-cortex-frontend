import { PostFormData } from "../../utils/http-client";

export const sendMail = function (data) {
    return PostFormData(`/sendEmail`, 'POST', data, true);
}