// import layout
import AuthTemplateLayout from "@/features/auth/layouts/template";

// import components
import ChartContainer from "@/features/auth/components/ChartContainer";
import LineChartComponent from "@/components/charts/LineChart";
import LoginForm from "@/features/auth/components/LoginForm";

// import utils
import random from "@/lib/utils/random";

// import types
import type { LoginRequestDto } from "@/lib/api/api";

// import dependencies
import { useState } from "react";

// import hooks
import { useLogin } from "@/hooks/use-auth";

// generate random data
const chartData = Array.from({ length: 8 }, () => ({
    value: random.number(10, 100),
}));

const LoginPage = () => {
    const [loginForm, setLoginForm] = useState<LoginRequestDto>({
        email: "",
        password: "",
    });
    const { mutate: login, isPending } = useLogin();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        login(loginForm);
    };

    return (
        <AuthTemplateLayout
            left={
                <ChartContainer
                    title="Track Your Reading Progress"
                    primaryMetric="+240 min"
                    secondaryMetric="+40% from last week"
                    chart={<LineChartComponent chartData={chartData} />}
                />
            }
            right={
                <LoginForm
                    loginForm={loginForm}
                    setLoginForm={setLoginForm}
                    onSubmit={handleSubmit}
                    isLoading={isPending}
                />
            }
        />
    );
};

export default LoginPage;
