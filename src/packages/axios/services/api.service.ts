import { buildQueryString } from "@/packages/axios/utils/buildQueryString";
import { replaceUrlParams } from "@/packages/axios/utils/replaceUrlParams";
import type { AxiosRequestConfig, Method } from "axios";

interface ApiConfig<Request> {
  mode: "private" | "public";
  endpoint: string;
  method: Method;
  request?: Request;
  params?: Record<string, string | number | boolean>;
  query?: Record<string, string | number | boolean>;
}

export function api<Request, Response>(request: ApiConfig<Request>) {
  return async (): Promise<Response> => {
    let url = request.endpoint;
    if (request.params) {
      url = replaceUrlParams(request.endpoint, request.params);
    }
    if (request.query) {
      url += buildQueryString(request.query);
    }
    const config : AxiosRequestConfig = {
      url,
      method: request.method,
      data: request.request,
    };
    const response = request.mode === "private"
      ? await (await import("@/packages/axios/instances/private.instance")).default(config)
      : await (await import("@/packages/axios/instances/public.instance")).default(config);
    return response.data;
  }
}