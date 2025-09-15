import LoginForm from "@/components/auth/loginForm";
import AuthLayout from "@/layout/auth/authLayout";
import ChartContainer from "@/components/auth/chartContainer";
import LineChartComponent from "@/components/ui/LineChart";
import random from "@/util/random";

const chartData = Array.from({ length: 8 }, () => ({
    value: random.generateRandomNumber(10, 100),
}));

const LoginPage = () => {
    const leftContent = (
        <ChartContainer
            title="Track Your Reading Progress"
            primaryMetric="+240 min"
            secondaryMetric="+40% from last week"
            chart={<LineChartComponent chartData={chartData} />}
        />
    );

    return (
        <AuthLayout leftContent={leftContent}>
            <LoginForm />
        </AuthLayout>
    );
};

export default LoginPage;
