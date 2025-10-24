/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface RegisterRequestDto {
  /** The username of the user */
  username: string;
  /**
   * The email of the user
   * @format email
   */
  email: string;
  /**
   * The password of the user
   * @minLength 8
   * @maxLength 128
   */
  password: string;
}

export interface LoginRequestDto {
  /**
   * The email of the user
   * @format email
   */
  email: string;
  /**
   * The password of the user
   * @minLength 8
   * @maxLength 128
   */
  password: string;
}

export type UserCreateRequestDto = object;

export interface UserResponseDto {
  /** The id of the user */
  id: string;
  /** The username of the user */
  username: string;
  /** The email of the user */
  email: string;
  /** The avatar url of the user */
  avatarUrl: string;
  /** The provider of the user */
  provider: string[];
  /** The role of the user */
  role: "ADMIN" | "USER";
  /**
   * The created at timestamp
   * @format date-time
   */
  createdAt: string;
  /**
   * The updated at timestamp
   * @format date-time
   */
  updatedAt: string;
  /**
   * The deleted at timestamp
   * @format date-time
   */
  deletedAt: string | null;
}

export type UserUpdateRequestDto = object;

export interface BookCreateRequestDto {
  /**
   * The title of the book
   * @maxLength 255
   */
  title: string;
  /**
   * The pages of the book
   * @min 1
   * @max 3000
   */
  pages: number;
  /**
   * The author of the book
   * @maxLength 255
   */
  author?: string | null;
  /** The description of the book */
  description?: string | null;
  /** The ISBN 10 of the book */
  isbn10?: string | null;
  /** The ISBN 13 of the book */
  isbn13?: string | null;
  /** The cover image file (JPEG, PNG, GIF, or WebP, max 10MB) */
  cover?: object | null;
}

export interface BookResponseDto {
  /** The id of the book */
  id: string;
  /** The title of the book */
  title: string;
  /** The pages of the book */
  pages: number;
  /** The author of the book */
  author: string | null;
  /** The description of the book */
  description: string | null;
  /** The ISBN 10 of the book */
  isbn10: string | null;
  /** The ISBN 13 of the book */
  isbn13: string | null;
  /** The cover url of the book */
  coverUrl: string | null;
  /** The created by id of the book */
  createdById: string;
  /**
   * The created at timestamp
   * @format date-time
   */
  createdAt: string;
  /**
   * The updated at timestamp
   * @format date-time
   */
  updatedAt: string;
}

export interface BookUpdateRequestDto {
  /**
   * The title of the book
   * @maxLength 255
   */
  title?: string;
  /**
   * The pages of the book
   * @min 1
   * @max 3000
   */
  pages?: number;
  /**
   * The author of the book
   * @maxLength 255
   */
  author?: string | null;
  /** The description of the book */
  description?: string | null;
  /** The ISBN 10 of the book */
  isbn10?: string | null;
  /** The ISBN 13 of the book */
  isbn13?: string | null;
  /** The cover image file (JPEG, PNG, GIF, or WebP, max 10MB) */
  cover?: object | null;
}

export interface UserBookCreateRequestDto {
  /**
   * The book id of the user book
   * @format uuid
   */
  bookId: string;
}

export interface UserBookResponseDto {
  /** The id of the user book */
  id: string;
  /** The user id of the user book */
  userId: string;
  /** The book id of the user book */
  bookId: string;
  /** The reading status of the user book */
  status: string;
  /** The current page of the user book */
  currentPage: number;
  /**
   * The start date of the user book
   * @format date-time
   */
  startDate: string | null;
  /**
   * The completed date of the user book
   * @format date-time
   */
  completedDate: string | null;
  /** The total minutes of the user book */
  totalMinutes: number;
  /** The total days of the user book */
  totalDays: number;
  /**
   * The created at timestamp
   * @format date-time
   */
  createdAt: string;
  /**
   * The updated at timestamp
   * @format date-time
   */
  updatedAt: string;
}

export interface ReadingRecordingCreateRequestDto {
  /**
   * The date of the reading recording
   * @format date-time
   */
  date: string;
  /**
   * The pages of the reading recording
   * @min 1
   * @max 3000
   */
  pages: number;
  /**
   * The minutes of the reading recording
   * @min 1
   * @max 600
   */
  minutes: number;
  /** The notes of the reading recording */
  notes?: string | null;
}

export interface FileDeleteRequestDto {
  /**
   * The URL of the file to be deleted
   * @format uri
   */
  url: string;
}

import type {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  HeadersDefaults,
  ResponseType,
} from "axios";
import axios from "axios";

export type QueryParamsType = Record<string | number, any>;

export interface FullRequestParams
  extends Omit<AxiosRequestConfig, "data" | "params" | "url" | "responseType"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseType;
  /** request body */
  body?: unknown;
}

export type RequestParams = Omit<
  FullRequestParams,
  "body" | "method" | "query" | "path"
>;

export interface ApiConfig<SecurityDataType = unknown>
  extends Omit<AxiosRequestConfig, "data" | "cancelToken"> {
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
  secure?: boolean;
  format?: ResponseType;
}

export enum ContentType {
  Json = "application/json",
  JsonApi = "application/vnd.api+json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public instance: AxiosInstance;
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private secure?: boolean;
  private format?: ResponseType;

  constructor({
    securityWorker,
    secure,
    format,
    ...axiosConfig
  }: ApiConfig<SecurityDataType> = {}) {
    this.instance = axios.create({
      ...axiosConfig,
      baseURL: axiosConfig.baseURL || "",
    });
    this.secure = secure;
    this.format = format;
    this.securityWorker = securityWorker;
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected mergeRequestParams(
    params1: AxiosRequestConfig,
    params2?: AxiosRequestConfig,
  ): AxiosRequestConfig {
    const method = params1.method || (params2 && params2.method);

    return {
      ...this.instance.defaults,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...((method &&
          this.instance.defaults.headers[
            method.toLowerCase() as keyof HeadersDefaults
          ]) ||
          {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected stringifyFormItem(formItem: unknown) {
    if (typeof formItem === "object" && formItem !== null) {
      return JSON.stringify(formItem);
    } else {
      return `${formItem}`;
    }
  }

  protected createFormData(input: Record<string, unknown>): FormData {
    if (input instanceof FormData) {
      return input;
    }
    return Object.keys(input || {}).reduce((formData, key) => {
      const property = input[key];
      const propertyContent: any[] =
        property instanceof Array ? property : [property];

      for (const formItem of propertyContent) {
        const isFileType = formItem instanceof Blob || formItem instanceof File;
        formData.append(
          key,
          isFileType ? formItem : this.stringifyFormItem(formItem),
        );
      }

      return formData;
    }, new FormData());
  }

  public request = async <T = any, _E = any>({
    secure,
    path,
    type,
    query,
    format,
    body,
    ...params
  }: FullRequestParams): Promise<AxiosResponse<T>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const responseFormat = format || this.format || undefined;

    if (
      type === ContentType.FormData &&
      body &&
      body !== null &&
      typeof body === "object"
    ) {
      body = this.createFormData(body as Record<string, unknown>);
    }

    if (
      type === ContentType.Text &&
      body &&
      body !== null &&
      typeof body !== "string"
    ) {
      body = JSON.stringify(body);
    }

    return this.instance.request({
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type ? { "Content-Type": type } : {}),
      },
      params: query,
      responseType: responseFormat,
      data: body,
      url: path,
    });
  };
}

/**
 * @title Progress Tracker API
 * @version 1.0
 * @license MIT (https://opensource.org/licenses/MIT)
 * @contact
 *
 * API documentation for the Progress Tracker application
 */
export class Api<
  SecurityDataType extends unknown,
> extends HttpClient<SecurityDataType> {
  api = {
    /**
     * No description
     *
     * @tags auth
     * @name AuthControllerRegister
     * @summary Register a new user
     * @request POST:/api/v1/auth/register
     */
    authControllerRegister: (
      data: RegisterRequestDto,
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/api/v1/auth/register`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags auth
     * @name AuthControllerLogin
     * @summary Login a user
     * @request POST:/api/v1/auth/login
     */
    authControllerLogin: (data: LoginRequestDto, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/v1/auth/login`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags auth
     * @name AuthControllerEmailCheck
     * @summary Check if an email exists
     * @request GET:/api/v1/auth/email-check/{email}
     */
    authControllerEmailCheck: (email: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/v1/auth/email-check/${email}`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags users
     * @name UserControllerFindAll
     * @summary Get all users
     * @request GET:/api/v1/users
     */
    userControllerFindAll: (
      query?: {
        /** The key of the query */
        key?: string;
        /** The value of the query */
        value?: string;
        /** The sort of the query */
        sort?: string;
        /** The order of the query */
        order?: "asc" | "desc";
        /**
         * The limit of the query
         * @min 1
         */
        limit?: number;
        /**
         * The page of the query
         * @min 1
         */
        page?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/api/v1/users`,
        method: "GET",
        query: query,
        ...params,
      }),

    /**
     * No description
     *
     * @tags users
     * @name UserControllerCreate
     * @summary Create a new user
     * @request POST:/api/v1/users
     */
    userControllerCreate: (
      data: UserCreateRequestDto,
      params: RequestParams = {},
    ) =>
      this.request<UserResponseDto, any>({
        path: `/api/v1/users`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags users
     * @name UserControllerFindById
     * @summary Get a user by ID
     * @request GET:/api/v1/users/{id}
     */
    userControllerFindById: (id: string, params: RequestParams = {}) =>
      this.request<UserResponseDto, any>({
        path: `/api/v1/users/${id}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags users
     * @name UserControllerUpdate
     * @summary Update a user by ID
     * @request PATCH:/api/v1/users/{id}
     */
    userControllerUpdate: (
      id: string,
      data: UserUpdateRequestDto,
      params: RequestParams = {},
    ) =>
      this.request<UserResponseDto, any>({
        path: `/api/v1/users/${id}`,
        method: "PATCH",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags users
     * @name UserControllerDelete
     * @summary Delete a user by ID
     * @request DELETE:/api/v1/users/{id}
     */
    userControllerDelete: (id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/v1/users/${id}`,
        method: "DELETE",
        ...params,
      }),

    /**
     * No description
     *
     * @tags books
     * @name BookControllerCreate
     * @summary Create a new book
     * @request POST:/api/v1/books
     */
    bookControllerCreate: (
      data: BookCreateRequestDto,
      params: RequestParams = {},
    ) =>
      this.request<BookResponseDto, any>({
        path: `/api/v1/books`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags books
     * @name BookControllerFindAll
     * @summary Find all books
     * @request GET:/api/v1/books
     */
    bookControllerFindAll: (
      query?: {
        /** The key to be used to query the books */
        key?: string;
        /** The value to be used to query the books */
        value?: string;
        /** The sort of the query */
        sort?: string;
        /** The order of the query */
        order?: "asc" | "desc";
        /**
         * The limit of the query
         * @min 1
         */
        limit?: number;
        /**
         * The page of the query
         * @min 1
         */
        page?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/api/v1/books`,
        method: "GET",
        query: query,
        ...params,
      }),

    /**
     * No description
     *
     * @tags books
     * @name BookControllerUpdate
     * @summary update a book
     * @request PATCH:/api/v1/books/{id}
     */
    bookControllerUpdate: (
      id: string,
      data: BookUpdateRequestDto,
      params: RequestParams = {},
    ) =>
      this.request<BookResponseDto, any>({
        path: `/api/v1/books/${id}`,
        method: "PATCH",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags books
     * @name BookControllerFindById
     * @summary Find a book by id
     * @request GET:/api/v1/books/{id}
     */
    bookControllerFindById: (id: string, params: RequestParams = {}) =>
      this.request<BookResponseDto, any>({
        path: `/api/v1/books/${id}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags books
     * @name BookControllerDelete
     * @summary Delete a book by id
     * @request DELETE:/api/v1/books/{id}
     */
    bookControllerDelete: (id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/v1/books/${id}`,
        method: "DELETE",
        ...params,
      }),

    /**
     * No description
     *
     * @tags UserBook
     * @name UserBookControllerFindAll
     * @summary Find all user books
     * @request GET:/api/v1/user-books
     */
    userBookControllerFindAll: (
      query?: {
        /**
         * The book id of the query
         * @format uuid
         */
        bookId?: string;
        /** The key of the query */
        key?: string;
        /** The value of the query */
        value?: string;
        /** The sort of the query */
        sort?: string;
        /** The order of the query */
        order?: "asc" | "desc";
        /** The limit of the query */
        limit?: number;
        /** The page of the query */
        page?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/api/v1/user-books`,
        method: "GET",
        query: query,
        ...params,
      }),

    /**
     * No description
     *
     * @tags UserBook
     * @name UserBookControllerCreate
     * @summary Create a user book
     * @request POST:/api/v1/user-books
     */
    userBookControllerCreate: (
      data: UserBookCreateRequestDto,
      params: RequestParams = {},
    ) =>
      this.request<UserBookResponseDto, any>({
        path: `/api/v1/user-books`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags UserBook
     * @name UserBookControllerFindById
     * @summary Find a user book by id
     * @request GET:/api/v1/user-books/{id}
     */
    userBookControllerFindById: (id: string, params: RequestParams = {}) =>
      this.request<UserBookResponseDto, any>({
        path: `/api/v1/user-books/${id}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags UserBook
     * @name UserBookControllerDelete
     * @summary Delete a user book by id
     * @request DELETE:/api/v1/user-books/{id}
     */
    userBookControllerDelete: (id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/v1/user-books/${id}`,
        method: "DELETE",
        ...params,
      }),

    /**
     * No description
     *
     * @tags UserBook
     * @name UserBookControllerCreateRecording
     * @summary Create a recording for a user book
     * @request POST:/api/v1/user-books/{id}/recordings
     */
    userBookControllerCreateRecording: (
      id: string,
      data: ReadingRecordingCreateRequestDto,
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/api/v1/user-books/${id}/recordings`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags UserBook
     * @name UserBookControllerFindRecordings
     * @summary Find recordings by user book id
     * @request GET:/api/v1/user-books/{id}/recordings
     */
    userBookControllerFindRecordings: (
      id: string,
      query?: {
        /**
         * The date of the reading recording
         * @format date-time
         */
        date?: string;
        /** The sort of the reading recording */
        sort?: string;
        /** The order of the reading recording */
        order?: "asc" | "desc";
        /**
         * The limit of the reading recording
         * @min 1
         */
        limit?: number;
        /**
         * The page of the reading recording
         * @min 1
         */
        page?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/api/v1/user-books/${id}/recordings`,
        method: "GET",
        query: query,
        ...params,
      }),

    /**
     * No description
     *
     * @tags UserBook
     * @name UserBookControllerDeleteRecordings
     * @summary Delete recordings by user book id
     * @request DELETE:/api/v1/user-books/{id}/recordings
     */
    userBookControllerDeleteRecordings: (
      id: string,
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/api/v1/user-books/${id}/recordings`,
        method: "DELETE",
        ...params,
      }),

    /**
     * No description
     *
     * @tags cloud
     * @name CloudControllerUploadFile
     * @summary Upload a file to cloud storage
     * @request POST:/api/v1/cloud/upload
     */
    cloudControllerUploadFile: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/v1/cloud/upload`,
        method: "POST",
        ...params,
      }),

    /**
     * No description
     *
     * @tags cloud
     * @name CloudControllerUploadImage
     * @summary Upload an image to cloud storage
     * @request POST:/api/v1/cloud/upload/image
     */
    cloudControllerUploadImage: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/v1/cloud/upload/image`,
        method: "POST",
        ...params,
      }),

    /**
     * No description
     *
     * @tags cloud
     * @name CloudControllerUploadAvatar
     * @summary Upload an avatar image to cloud storage
     * @request POST:/api/v1/cloud/upload/avatar
     */
    cloudControllerUploadAvatar: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/v1/cloud/upload/avatar`,
        method: "POST",
        ...params,
      }),

    /**
     * No description
     *
     * @tags cloud
     * @name CloudControllerDeleteFile
     * @summary Delete a file from cloud storage
     * @request DELETE:/api/v1/cloud/delete
     */
    cloudControllerDeleteFile: (
      data: FileDeleteRequestDto,
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/api/v1/cloud/delete`,
        method: "DELETE",
        body: data,
        type: ContentType.Json,
        ...params,
      }),
  };
}
