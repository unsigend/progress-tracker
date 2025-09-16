import { LoginForm } from "@/components/features/auth";
import AuthLayout from "@/layout/auth/authLayout";
import ChartContainer from "@/components/ui/chartContainer";
import LineChartComponent from "@/components/ui/LineChart";
import { crypto } from "@/utils";

const chartData = Array.from({ length: 8 }, () => ({
    value: crypto.generateRandomNumber(10, 100),
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
