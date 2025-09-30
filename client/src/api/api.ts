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

export interface UserResponseDto {
  /** The unique identifier of the user */
  id: string;
  /** The username of the user */
  username: string;
  /** The email of the user */
  email: string;
  /** The avatar url of the user */
  avatar_url: string;
  /** The provider of the user */
  provider: string[];
  /** The role of the user */
  role: string;
  /**
   * The created at date of the user
   * @format date-time
   */
  createdAt: string;
  /**
   * The updated at date of the user
   * @format date-time
   */
  updatedAt: string;
}

export interface UpdateUserDto {
  /**
   * The username of the user
   * @example "JohnDoe"
   */
  username?: string;
  /**
   * The email of the user
   * @example "john.doe@gmail.com"
   */
  email?: string;
  /**
   * The password of the user
   * @example "password"
   */
  password?: string;
  /**
   * The avatar url of the user
   * @example "https://example.com/avatar.png"
   */
  avatar_url?: object;
  /**
   * The role of the user
   * @example "USER"
   */
  role?: "ADMIN" | "USER";
}

export interface CreateUserDto {
  /**
   * The username of the user
   * @example "JohnDoe"
   */
  username: string;
  /**
   * The email of the user
   * @example "john.doe@gmail.com"
   */
  email: string;
  /**
   * The password of the user
   * @example "password"
   */
  password: string;
  /**
   * The avatar url of the user
   * @example "https://example.com/avatar.png"
   */
  avatar_url?: object;
  /**
   * The role of the user
   * @example "USER"
   */
  role?: "ADMIN" | "USER";
}

export interface CreateBookDto {
  /** The title of the book */
  title: string;
  /** The author of the book */
  author?: string;
  /** The description of the book */
  description: string;
  /** The ISBN10 of the book */
  ISBN10?: string;
  /** The ISBN13 of the book */
  ISBN13?: string;
  /** The pages of the book */
  pages?: number;
  /** The cover url of the book */
  cover_url?: string;
}

export interface BookResponseDto {
  /** The unique identifier of the book */
  id: string;
  /** The title of the book */
  title: string;
  /** The author of the book */
  author: string;
  /** The description of the book */
  description: string;
  /** The ISBN10 of the book */
  ISBN10: string;
  /** The ISBN13 of the book */
  ISBN13: string;
  /** The pages of the book */
  pages: number;
  /** The cover url of the book */
  cover_url: string;
  /**
   * The created at date of the book
   * @format date-time
   */
  createdAt: string;
  /**
   * The updated at date of the book
   * @format date-time
   */
  updatedAt: string;
}

export interface UpdateBookDto {
  /** The title of the book */
  title?: string;
  /** The author of the book */
  author?: string;
  /** The description of the book */
  description?: string;
  /** The ISBN10 of the book */
  ISBN10?: string;
  /** The ISBN13 of the book */
  ISBN13?: string;
  /** The pages of the book */
  pages?: number;
  /** The cover url of the book */
  cover_url?: string;
}

export interface AllBookResponseDto {
  /** The book list */
  books: BookResponseDto[];
  /** The total count of the books */
  totalCount: number;
}

export interface LoginRequestDto {
  /** The email of the user */
  email: string;
  /** The password of the user */
  password: string;
}

export interface RegisterUserDto {
  /** The username of the user */
  username: string;
  /** The email of the user */
  email: string;
  /** The password of the user */
  password: string;
}

export interface LoginResponseDto {
  /** The access token */
  access_token: string;
}

export interface EmailCheckResponseDto {
  /** Whether the email exists */
  exists: boolean;
}

export interface FileUploadResponseDto {
  /** The file url */
  file_url: string;
  /** Whether the file was uploaded successfully */
  success: boolean;
}

export interface TrackBookRequestDto {
  /** The book id to track */
  book_id: string;
}

export interface UserBookResponseDto {
  /** The unique identifier of the user book */
  id: string;
  /** The book id of the user book */
  book_id: string;
  /** The user id of the user book */
  user_id: string;
  /** The status of the user book */
  status: string;
  /** The current page of the user book */
  current_page: number;
  /**
   * The start date of the user book
   * @format date-time
   */
  start_date: string;
  /**
   * The completed date of the user book
   * @format date-time
   */
  completed_date: string;
  /** The total minutes of the user book */
  total_minutes: number;
  /** The total days of the user book */
  total_days: number;
  /**
   * The created at date of the user book
   * @format date-time
   */
  createdAt: string;
  /**
   * The updated at date of the user book
   * @format date-time
   */
  updatedAt: string;
}

export interface BookProgressDto {
  /** book data */
  book: BookResponseDto;
  /** user book data */
  userBook: UserBookResponseDto;
}

export interface UserBooksResponseDto {
  /** The books */
  books: BookProgressDto[];
  /** The total count of the books */
  totalCount: number;
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
 * @version v1
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
     * No description
     *
     * @tags User
     * @name UserControllerGetMe
     * @summary Get the current user
     * @request GET:/api/v1/users/me
     */
    userControllerGetMe: (params: RequestParams = {}) =>
      this.request<UserResponseDto, void>({
        path: `/api/v1/users/me`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags User
     * @name UserControllerUpdateMe
     * @summary Update the current user
     * @request PATCH:/api/v1/users/me
     */
    userControllerUpdateMe: (data: UpdateUserDto, params: RequestParams = {}) =>
      this.request<UserResponseDto, void>({
        path: `/api/v1/users/me`,
        method: "PATCH",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags User
     * @name UserControllerDeleteMe
     * @summary Delete the current user
     * @request DELETE:/api/v1/users/me
     */
    userControllerDeleteMe: (params: RequestParams = {}) =>
      this.request<UserResponseDto, void>({
        path: `/api/v1/users/me`,
        method: "DELETE",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags User
     * @name UserControllerReplaceMe
     * @summary Replace the current user
     * @request PUT:/api/v1/users/me
     */
    userControllerReplaceMe: (
      data: UpdateUserDto,
      params: RequestParams = {},
    ) =>
      this.request<UserResponseDto, void>({
        path: `/api/v1/users/me`,
        method: "PUT",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags User
     * @name UserControllerCreate
     * @summary Create a user
     * @request POST:/api/v1/users
     */
    userControllerCreate: (data: CreateUserDto, params: RequestParams = {}) =>
      this.request<UserResponseDto, void>({
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
     * @tags User
     * @name UserControllerFindById
     * @summary Find a user by id
     * @request GET:/api/v1/users/{id}
     */
    userControllerFindById: (id: string, params: RequestParams = {}) =>
      this.request<UserResponseDto, void>({
        path: `/api/v1/users/${id}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags User
     * @name UserControllerUpdate
     * @summary Update a user by id
     * @request PATCH:/api/v1/users/{id}
     */
    userControllerUpdate: (
      id: string,
      data: UpdateUserDto,
      params: RequestParams = {},
    ) =>
      this.request<UserResponseDto, void>({
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
     * @tags User
     * @name UserControllerDeleteById
     * @summary Delete a user by id
     * @request DELETE:/api/v1/users/{id}
     */
    userControllerDeleteById: (id: string, params: RequestParams = {}) =>
      this.request<UserResponseDto, void>({
        path: `/api/v1/users/${id}`,
        method: "DELETE",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags User
     * @name UserControllerReplace
     * @summary Replace a user by id
     * @request PUT:/api/v1/users/{id}
     */
    userControllerReplace: (
      id: string,
      data: UpdateUserDto,
      params: RequestParams = {},
    ) =>
      this.request<UserResponseDto, void>({
        path: `/api/v1/users/${id}`,
        method: "PUT",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Books
     * @name BookControllerCreate
     * @summary Create a book
     * @request POST:/api/v1/books
     */
    bookControllerCreate: (data: CreateBookDto, params: RequestParams = {}) =>
      this.request<BookResponseDto, void>({
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
     * @tags Books
     * @name BookControllerFindAll
     * @summary Get all books and set header x-total-count
     * @request GET:/api/v1/books
     */
    bookControllerFindAll: (
      query?: {
        /**
         * Value to filter books by title, author, ISBN10 or ISBN13
         * @example ""
         */
        value?: string;
        /**
         * Page number for pagination index starts from 1
         * @min 1
         * @example 1
         */
        page?: number;
        /**
         * Number of results per page (max 100)
         * @min 1
         * @max 100
         * @example 10
         */
        limit?: number;
        /**
         * Field to sort by
         * @example "createdAt"
         */
        sort?: "title" | "author" | "createdAt" | "updatedAt";
        /**
         * Sort order
         * @example "desc"
         */
        order?: "asc" | "desc";
      },
      params: RequestParams = {},
    ) =>
      this.request<AllBookResponseDto, void>({
        path: `/api/v1/books`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Books
     * @name BookControllerFindById
     * @summary Get a book by id
     * @request GET:/api/v1/books/{id}
     */
    bookControllerFindById: (id: string, params: RequestParams = {}) =>
      this.request<BookResponseDto, void>({
        path: `/api/v1/books/${id}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Books
     * @name BookControllerReplace
     * @summary Replace a book by id
     * @request PUT:/api/v1/books/{id}
     */
    bookControllerReplace: (
      id: string,
      data: UpdateBookDto,
      params: RequestParams = {},
    ) =>
      this.request<BookResponseDto, void>({
        path: `/api/v1/books/${id}`,
        method: "PUT",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Books
     * @name BookControllerDeleteById
     * @summary Delete a book by id
     * @request DELETE:/api/v1/books/{id}
     */
    bookControllerDeleteById: (id: string, params: RequestParams = {}) =>
      this.request<BookResponseDto, void>({
        path: `/api/v1/books/${id}`,
        method: "DELETE",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Books
     * @name BookControllerPatch
     * @summary Patch a book by id
     * @request PATCH:/api/v1/books/{id}
     */
    bookControllerPatch: (
      id: string,
      data: UpdateBookDto,
      params: RequestParams = {},
    ) =>
      this.request<BookResponseDto, void>({
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
     * @tags Auth
     * @name AuthControllerLogin
     * @summary Login a user
     * @request POST:/api/v1/auth/login
     */
    authControllerLogin: (data: LoginRequestDto, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/api/v1/auth/login`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Auth
     * @name AuthControllerLogout
     * @summary Logout a user
     * @request POST:/api/v1/auth/logout
     */
    authControllerLogout: (params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/api/v1/auth/logout`,
        method: "POST",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Auth
     * @name AuthControllerRegister
     * @summary Register a user
     * @request POST:/api/v1/auth/register
     */
    authControllerRegister: (
      data: RegisterUserDto,
      params: RequestParams = {},
    ) =>
      this.request<LoginResponseDto, void>({
        path: `/api/v1/auth/register`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Auth
     * @name AuthControllerEmailCheck
     * @summary Check if an email exists
     * @request GET:/api/v1/auth/email-check/{email}
     */
    authControllerEmailCheck: (email: string, params: RequestParams = {}) =>
      this.request<EmailCheckResponseDto, any>({
        path: `/api/v1/auth/email-check/${email}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Auth
     * @name AuthControllerGoogle
     * @summary Login with Google only the entry point
     * @request GET:/api/v1/auth/google
     */
    authControllerGoogle: (params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/api/v1/auth/google`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Auth
     * @name AuthControllerGoogleCallback
     * @summary Google OAuth callback redirect to the frontend with the access_token
     * @request GET:/api/v1/auth/google/callback
     */
    authControllerGoogleCallback: (params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/api/v1/auth/google/callback`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Auth
     * @name AuthControllerGithub
     * @summary Login with Github only the entry point
     * @request GET:/api/v1/auth/github
     */
    authControllerGithub: (params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/api/v1/auth/github`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Auth
     * @name AuthControllerGithubCallback
     * @summary Github OAuth callback redirect to the frontend with the access_token
     * @request GET:/api/v1/auth/github/callback
     */
    authControllerGithubCallback: (params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/api/v1/auth/github/callback`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags File
     * @name FileControllerUploadFile
     * @summary Upload a file to cloud
     * @request POST:/api/v1/file/upload
     */
    fileControllerUploadFile: (
      data: {
        /** @format binary */
        file: File;
      },
      params: RequestParams = {},
    ) =>
      this.request<FileUploadResponseDto, void>({
        path: `/api/v1/file/upload`,
        method: "POST",
        body: data,
        type: ContentType.FormData,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags UserBook
     * @name UserBookControllerCreate
     * @summary Track a book for current user
     * @request POST:/api/v1/user-books
     */
    userBookControllerCreate: (
      data: TrackBookRequestDto,
      params: RequestParams = {},
    ) =>
      this.request<UserBookResponseDto, void>({
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
     * @name UserBookControllerFindAll
     * @summary Get all tracked books for a user
     * @request GET:/api/v1/user-books
     */
    userBookControllerFindAll: (
      query?: {
        /** The search field */
        field?: object;
        /** The search value */
        value?: object;
      },
      params: RequestParams = {},
    ) =>
      this.request<UserBooksResponseDto, void>({
        path: `/api/v1/user-books`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags UserBook
     * @name UserBookControllerDelete
     * @summary Untrack a book for current user
     * @request DELETE:/api/v1/user-books/{id}
     */
    userBookControllerDelete: (id: string, params: RequestParams = {}) =>
      this.request<UserBookResponseDto, void>({
        path: `/api/v1/user-books/${id}`,
        method: "DELETE",
        format: "json",
        ...params,
      }),
  };
}
