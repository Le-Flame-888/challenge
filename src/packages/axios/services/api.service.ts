import { buildQueryString } from "@/packages/axios/utils/buildQueryString";
import { replaceUrlParams } from "@/packages/axios/utils/replaceUrlParams";
import type { AxiosRequestConfig, Method } from "axios";

interface ApiConfig<Request> {
  mode: "private" | "public";
  endpoint: string;
  method: Method;
  request?: Request;
  params?: Record<string, string | number | boolean>;
  query?: Record<string, string | number | boolean | null | undefined>;
}

type ApiRequest<T> = { data?: T; params?: Record<string, any>; query?: Record<string, any> };

export function api<Request, Response>(config: Omit<ApiConfig<Request>, 'request'>) {
  return async (request?: ApiRequest<Request> | Request): Promise<{ data: Response, headers: any }> => {
    let url = config.endpoint;
    let data: Request | undefined;
    let params: Record<string, any> | undefined;
    let query: Record<string, any> | undefined;

    // Handle different request formats
    if (request && typeof request === 'object' && ('data' in request || 'params' in request || 'query' in request)) {
      const apiReq = request as ApiRequest<Request>;
      data = apiReq.data;
      params = apiReq.params;
      query = apiReq.query;
    } else {
      data = request as Request;
    }

    // Replace URL parameters
    if (params) {
      url = replaceUrlParams(url, params);
    }

    // Merge and clean query parameters
    const queryParams = { ...config.query };
    if (query) {
      Object.entries(query).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          queryParams[key] = value;
        }
      });
    }

    // Add query string if there are any query parameters
    if (Object.keys(queryParams).length > 0) {
      url += buildQueryString(queryParams);
    }

    const axiosConfig: AxiosRequestConfig = {
      url,
      method: config.method,
      data,
    };

    try {
      const response = config.mode === "private"
        ? await (await import("@/packages/axios/instances/private.instance")).default(axiosConfig)
        : await (await import("@/packages/axios/instances/public.instance")).default(axiosConfig);
      
      return { 
        data: response.data, 
        headers: response.headers 
      };
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  };
}