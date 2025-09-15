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

export interface BookResponseDto {
  /**
   * The unique identifier of the book
   * @example "cm123456789abcdef"
   */
  id: string;
  /**
   * The title of the book
   * @example "The Great Gatsby"
   */
  title: string;
  /**
   * The author of the book
   * @example "F. Scott Fitzgerald"
   */
  author: string | null;
  /**
   * The description of the book
   * @example "A classic American novel set in the Jazz Age"
   */
  description: string | null;
  /**
   * The number of pages in the book
   * @example 180
   */
  pages: number | null;
  /**
   * The URL of the book's cover image
   * @example "https://example.com/book-cover.jpg"
   */
  imageURL: string | null;
  /**
   * The ISBN of the book
   * @example "978-0-7432-7356-5"
   */
  ISBN: string | null;
  /**
   * The timestamp when the book was created
   * @format date-time
   * @example "2024-01-15T10:30:00.000Z"
   */
  createdAt: string;
  /**
   * The timestamp when the book was last updated
   * @format date-time
   * @example "2024-01-15T10:30:00.000Z"
   */
  updatedAt: string;
}

export interface CreateBookDto {
  /**
   * The title of the book
   * @example "The Great Gatsby"
   */
  title: string;
  /**
   * The author of the book
   * @example "F. Scott Fitzgerald"
   */
  author?: string;
  /**
   * The description of the book
   * @example "A classic American novel set in the Jazz Age"
   */
  description?: string;
  /**
   * The number of pages in the book
   * @example 180
   */
  pages?: number;
  /**
   * The URL of the book's cover image
   * @example "https://example.com/book-cover.jpg"
   */
  imageURL?: string;
  /**
   * The ISBN of the book (ISBN-10 or ISBN-13)
   * @example "978-0-7432-7356-5"
   */
  ISBN?: string;
}

export interface UpdateBookDto {
  /**
   * The title of the book
   * @example "The Great Gatsby"
   */
  title?: string;
  /**
   * The author of the book
   * @example "F. Scott Fitzgerald"
   */
  author?: string;
  /**
   * The description of the book
   * @example "A classic American novel set in the Jazz Age"
   */
  description?: string;
  /**
   * The number of pages in the book
   * @example 180
   */
  pages?: number;
  /**
   * The URL of the book's cover image
   * @example "https://example.com/book-cover.jpg"
   */
  imageURL?: string;
  /**
   * The ISBN of the book (ISBN-10 or ISBN-13)
   * @example "978-0-7432-7356-5"
   */
  ISBN?: string;
}

export interface PatchBookDto {
  /**
   * The title of the book
   * @example "The Great Gatsby"
   */
  title?: string;
  /**
   * The author of the book
   * @example "F. Scott Fitzgerald"
   */
  author?: string;
  /**
   * The description of the book
   * @example "A classic American novel set in the Jazz Age"
   */
  description?: string;
  /**
   * The number of pages in the book
   * @example 180
   */
  pages?: number;
  /**
   * The URL of the book's cover image
   * @example "https://example.com/book-cover.jpg"
   */
  imageURL?: string;
  /**
   * The ISBN of the book (ISBN-10 or ISBN-13)
   * @example "978-0-7432-7356-5"
   */
  ISBN?: string;
}

export interface ResponseUserDto {
  /**
   * The unique identifier of the user
   * @example "cm123456789abcdef"
   */
  id: string;
  /**
   * The name of the user
   * @example "John Doe"
   */
  name: string;
  /**
   * The email address of the user
   * @example "john.doe@example.com"
   */
  email: string;
  /**
   * The timestamp when the user was created
   * @format date-time
   * @example "2024-01-15T10:30:00.000Z"
   */
  createdAt: string;
  /**
   * The timestamp when the user was last updated
   * @format date-time
   * @example "2024-01-15T10:30:00.000Z"
   */
  updatedAt: string;
  /**
   * The URL of the user's avatar
   * @example "https://example.com/avatar.jpg"
   */
  avatarURL: string | null;
  /**
   * The providers of the user
   * @example ["local","google","github"]
   */
  provider: string[];
}

export interface UpdateUserDto {
  /**
   * The full name of the user
   * @example "John Doe"
   */
  name?: string;
  /**
   * The email address of the user
   * @example "john.doe@example.com"
   */
  email?: string;
  /**
   * The new password for the user account
   * @example "newSecurePassword123"
   */
  password?: string;
  /**
   * The URL of the user's avatar
   * @default ""
   * @example "https://example.com/avatar.jpg"
   */
  avatarURL?: string;
  /**
   * The providers of the user
   * @default ["local"]
   * @example ["local","google","github"]
   */
  provider?: string[];
}

export interface LoginDto {
  /**
   * The email address of the user
   * @example "john.doe@example.com"
   */
  email: string;
  /**
   * The password of the user
   * @example "mySecurePassword123"
   */
  password: string;
}

export interface AuthResponseDto {
  /**
   * The JWT access token for authentication
   * @example "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
   */
  access_token: string;
}

export interface RegisterDto {
  /**
   * The full name of the user
   * @example "John Doe"
   */
  name: string;
  /**
   * The email address of the user
   * @example "john.doe@example.com"
   */
  email: string;
  /**
   * The password for the user account
   * @example "mySecurePassword123"
   */
  password: string;
  /**
   * The URL of the user's avatar
   * @default ""
   * @example "https://example.com/avatar.jpg"
   */
  avatarURL?: string;
  /**
   * The providers of the user
   * @default ["local"]
   * @example ["local","google","github"]
   */
  provider?: string[];
}

export interface EmailCheckResponseDto {
  /**
   * Whether the email already exists in the system
   * @example true
   */
  exists: boolean;
}

export interface GithubAuthDto {
  /**
   * The code from github
   * @example "1234567890"
   */
  code: string;
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
 * Progress Tracker Backend API Specification
 */
export class Api<
  SecurityDataType extends unknown,
> extends HttpClient<SecurityDataType> {
  api = {
    /**
     * @description This endpoint returns all books with query parameters
     *
     * @tags Books
     * @name BooksControllerFindAll
     * @summary Find all books
     * @request GET:/api/v1/books
     */
    booksControllerFindAll: (
      query?: {
        /**
         * The search query could be title, author, or ISBN
         * @default ""
         * @example "Gatsby"
         */
        search?: string;
        /**
         * The page number for pagination
         * @default 1
         * @example 1
         */
        page?: number;
        /**
         * The number of books per page
         * @default 10
         * @example 10
         */
        limit?: number;
        /**
         * The field to sort by
         * @default "createdAt"
         * @example "createdAt"
         */
        sortedBy?: string;
        /**
         * The sort order (ascending or descending)
         * @default "desc"
         * @example "desc"
         */
        sortOrder?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<BookResponseDto[], object>({
        path: `/api/v1/books`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description This endpoint creates a new book
     *
     * @tags Books
     * @name BooksControllerCreate
     * @summary Create a new book
     * @request POST:/api/v1/books
     */
    booksControllerCreate: (data: CreateBookDto, params: RequestParams = {}) =>
      this.request<BookResponseDto, void | object>({
        path: `/api/v1/books`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description This endpoint returns a single book by ID
     *
     * @tags Books
     * @name BooksControllerFindOne
     * @summary Find one book
     * @request GET:/api/v1/books/{id}
     */
    booksControllerFindOne: (id: string, params: RequestParams = {}) =>
      this.request<BookResponseDto, void | object>({
        path: `/api/v1/books/${id}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description This endpoint updates a book by ID
     *
     * @tags Books
     * @name BooksControllerUpdate
     * @summary Update a book
     * @request PUT:/api/v1/books/{id}
     */
    booksControllerUpdate: (
      id: string,
      data: UpdateBookDto,
      params: RequestParams = {},
    ) =>
      this.request<BookResponseDto, void | object>({
        path: `/api/v1/books/${id}`,
        method: "PUT",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description This endpoint patches a book by ID
     *
     * @tags Books
     * @name BooksControllerPatch
     * @summary Patch a book
     * @request PATCH:/api/v1/books/{id}
     */
    booksControllerPatch: (
      id: string,
      data: PatchBookDto,
      params: RequestParams = {},
    ) =>
      this.request<BookResponseDto, void | object>({
        path: `/api/v1/books/${id}`,
        method: "PATCH",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description This endpoint deletes a book by ID
     *
     * @tags Books
     * @name BooksControllerDelete
     * @summary Delete a book
     * @request DELETE:/api/v1/books/{id}
     */
    booksControllerDelete: (id: string, params: RequestParams = {}) =>
      this.request<BookResponseDto, void | object>({
        path: `/api/v1/books/${id}`,
        method: "DELETE",
        format: "json",
        ...params,
      }),

    /**
     * @description This endpoint returns a user by id
     *
     * @tags User
     * @name UserControllerGetById
     * @summary Get a user by id
     * @request GET:/api/v1/user/{id}
     */
    userControllerGetById: (id: string, params: RequestParams = {}) =>
      this.request<ResponseUserDto, void | object>({
        path: `/api/v1/user/${id}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description This endpoint updates a user
     *
     * @tags User
     * @name UserControllerUpdate
     * @summary Update a user
     * @request PUT:/api/v1/user/{id}
     */
    userControllerUpdate: (
      id: string,
      data: UpdateUserDto,
      params: RequestParams = {},
    ) =>
      this.request<ResponseUserDto, void | object>({
        path: `/api/v1/user/${id}`,
        method: "PUT",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description This endpoint deletes a user
     *
     * @tags User
     * @name UserControllerDelete
     * @summary Delete a user
     * @request DELETE:/api/v1/user/{id}
     */
    userControllerDelete: (id: string, params: RequestParams = {}) =>
      this.request<ResponseUserDto, void | object>({
        path: `/api/v1/user/${id}`,
        method: "DELETE",
        format: "json",
        ...params,
      }),

    /**
     * @description This endpoint logs in a user
     *
     * @tags Auth
     * @name AuthControllerLogin
     * @summary Login a user
     * @request POST:/api/v1/auth/login
     */
    authControllerLogin: (data: LoginDto, params: RequestParams = {}) =>
      this.request<AuthResponseDto, void | AuthResponseDto>({
        path: `/api/v1/auth/login`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description This endpoint registers a user
     *
     * @tags Auth
     * @name AuthControllerRegister
     * @summary Register a user
     * @request POST:/api/v1/auth/register
     */
    authControllerRegister: (data: RegisterDto, params: RequestParams = {}) =>
      this.request<
        AuthResponseDto,
        | {
            message?: string[];
            error?: string;
            statusCode?: number;
          }
        | AuthResponseDto
      >({
        path: `/api/v1/auth/register`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description This endpoint checks if an email is already in use
     *
     * @tags Auth
     * @name AuthControllerEmailCheck
     * @summary Check if an email is already in use
     * @request GET:/api/v1/auth/email-check
     */
    authControllerEmailCheck: (
      query: {
        /**
         * The email address to check for availability
         * @example "john.doe@example.com"
         */
        email: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<EmailCheckResponseDto, EmailCheckResponseDto>({
        path: `/api/v1/auth/email-check`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description This endpoint returns the current user data
     *
     * @tags Auth
     * @name AuthControllerMe
     * @summary Get the current user data
     * @request GET:/api/v1/auth/me
     */
    authControllerMe: (params: RequestParams = {}) =>
      this.request<ResponseUserDto, void | object>({
        path: `/api/v1/auth/me`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description This endpoint authenticates a user with github
     *
     * @tags Auth
     * @name AuthControllerGithubAuth
     * @summary Authenticate a user with github
     * @request POST:/api/v1/auth/github
     */
    authControllerGithubAuth: (
      data: GithubAuthDto,
      params: RequestParams = {},
    ) =>
      this.request<AuthResponseDto, void | AuthResponseDto>({
        path: `/api/v1/auth/github`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
}
