/* eslint-disable @typescript-eslint/no-explicit-any */

// import dependencies
import {
    CrudFilters,
    CrudSorting,
    DataProvider,
    Pagination,
} from "@refinedev/core";
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
    /**
     * Get a resource by id
     * @param resource The resource to get by id
     * @param id The id of the resource to get
     * @returns {
     *  data: any
     * }
     */
    getOne: async ({ resource, id }) => {
        // get the controller method for the resource
        const controllerMethod = getControllerMethod(resource, "FindById");

        if (controllerMethod === null) {
            throw new Error(`Controller method ${resource} not found`);
        }
        const response = await controllerMethod(id);
        return {
            data: response.data,
        };
    },

    /**
     * Update a resource
     * @param resource The resource to update
     * @param id The id of the resource to update
     * @param variables The variables to update the resource with
     * @returns {
     *  data: any
     * }
     */
    update: async ({ resource, id, variables }) => {
        // get the controller method for the resource
        const controllerMethod = getControllerMethod(resource, "Replace");
        if (controllerMethod === null) {
            throw new Error(`Controller method ${resource} not found`);
        }
        const response = await controllerMethod(id, variables);

        return {
            data: response.data,
        };
    },

    /**
     * Get the list of a resource
     * @param resource The resource to get the list of
     * @returns {
     *  data: any,
     *  total: number
     * }
     */
    getList: async ({
        resource,
        pagination,
        sorters,
        filters,
    }: {
        resource: string;
        pagination?: Pagination | undefined;
        sorters?: CrudSorting | undefined;
        filters?: CrudFilters | undefined;
    }) => {
        // build the query object
        const query = {
            sort: sorters?.[0]?.field,
            order: sorters?.[0]?.order,
            page: pagination?.currentPage,
            limit: pagination?.pageSize,
            search: filters?.[0]?.value,
        };
        // get the controller method for the resource
        const controllerMethod:
            | ((...args: any[]) => Promise<AxiosResponse<any>>)
            | null = getControllerMethod(resource, "FindAll");
        if (controllerMethod === null) {
            throw new Error(`Controller method ${resource} not found`);
        }
        const response = await controllerMethod(query);
        return { data: response.data, total: response.data.length };
    },

    /**
     * Create a resource
     * @param resource The resource to create
     * @param variables The variables to create the resource with
     * @returns {
     *  data: any
     * }
     */
    create: async ({ resource, variables }) => {
        // get the controller method for the resource
        const controllerMethod = getControllerMethod(resource, "Create");
        if (controllerMethod === null) {
            throw new Error(`Controller method ${resource} not found`);
        }
        const response = await controllerMethod(variables);
        return { data: response.data };
    },

    /**
     * Delete a resource
     * @param resource The resource to delete
     * @param id The id of the resource to delete
     * @returns {
     *  data: any
     * }
     */
    deleteOne: async ({ resource, id }) => {
        // get the controller method for the resource
        const controllerMethod = getControllerMethod(resource, "DeleteById");
        if (controllerMethod === null) {
            throw new Error(`Controller method ${resource} not found`);
        }
        const response = await controllerMethod(id);
        return { data: response.data };
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
