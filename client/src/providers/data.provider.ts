/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

// import dependencies
import { DataProvider } from "@refinedev/core";
import { AxiosResponse } from "axios";

// import api
import ApiClient from "@/api/apiClient";

/**
 * Helper function to get the controller method for a given resource
 * @param resource The resource to get the controller method for
 * @param postfix The postfix to add to the controller method
 * @returns The controller method
 */
const getControllerMethod = (
    resource: string,
    postfix: string
): ((...args: any[]) => Promise<AxiosResponse<any>>) | null => {
    if (resource.endsWith("s")) {
        resource = resource.slice(0, -1);
    }
    const methodName = `${resource}Controller${postfix}`;
    const controllerMethod = (ApiClient.api as any)[methodName];
    if (typeof controllerMethod !== "function") {
        return null;
    }
    return controllerMethod;
};

export const dataProvider: DataProvider = {
    getOne: async ({ resource, id, meta }) => {
        const controllerMethod = getControllerMethod(resource, "FindById");

        if (controllerMethod === null) {
            throw new Error(`Controller method ${resource} not found`);
        }
        const response = await controllerMethod(id);
        return { data: response.data };
    },
    update: () => {
        throw new Error("Not implemented");
    },
    getList: async ({ resource }) => {
        const controllerMethod:
            | ((...args: any[]) => Promise<AxiosResponse<any>>)
            | null = getControllerMethod(resource, "FindAll");
        if (controllerMethod === null) {
            throw new Error(`Controller method ${resource} not found`);
        }
        const response = await controllerMethod();
        return { data: response.data, total: response.data.length };
    },

    /**
     * Get the base url of the api
     * @returns The base url of the api
     */
    getApiUrl: (): string => {
        return ApiClient.instance.defaults.baseURL || "";
    },
};

export default dataProvider;
