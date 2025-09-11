const _apiConfig = {
    baseURL: "http://localhost:3000",
    apiVersion: "/api/v1",
    bookAPIRoot: "/books",
    userAPIRoot: "/user",
};

const globalConfig = {
    author: "Yixiang Qiu",
    github: "https://github.com/unsigend/progress-tracker",
    email: "qiuyixiang2003@gmail.com",
    privacyPolicy:
        "https://github.com/unsigend/progress-tracker/blob/main/LICENSE",
    termsOfService:
        "https://github.com/unsigend/progress-tracker/blob/main/LICENSE",
    apiConfig: {
        bookAPIRoot: `${_apiConfig.baseURL}${_apiConfig.apiVersion}${_apiConfig.bookAPIRoot}`,
        userAPIRoot: `${_apiConfig.baseURL}${_apiConfig.apiVersion}${_apiConfig.userAPIRoot}`,
    },
};

export default globalConfig;
