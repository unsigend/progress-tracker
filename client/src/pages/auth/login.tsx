import { LoginForm } from "@/components/features/auth";
import AuthLayout from "@/layout/auth/template";
import ChartContainer from "@/components/ui/chartContainer";
import LineChartComponent from "@/components/ui/LineChart";
import { random } from "@/utils";

const chartData = Array.from({ length: 8 }, () => ({
    value: random.number(10, 100),
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

    return <AuthLayout left={leftContent} right={<LoginForm />} />;
};

export default LoginPage;
