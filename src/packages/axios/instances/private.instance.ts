import baseInstance from "@/packages/axios/instances/base.instance";
import { axiosAuthenticationInterceptor } from "@/packages/axios/interceptors/authentication.interceptor";

const privateInstance = baseInstance();

// Add the authentication interceptor to the private instance
privateInstance.interceptors.request.use(axiosAuthenticationInterceptor.onFulfilled, axiosAuthenticationInterceptor.onRejected);

export default privateInstance;