// import components
import LoginForm from "@/components/auth/loginForm";
import AuthTemplateLayout from "@/layout/auth/template";
import ChartContainer from "@/components/ui/chartContainer";
import LineChartComponent from "@/components/ui/LineChart";

// import utils
import random from "@/utils/random";

const chartData = Array.from({ length: 8 }, () => ({
    value: random.number(10, 100),
}));

const leftContent = (
    <ChartContainer
        title="Track Your Reading Progress"
        primaryMetric="+240 min"
        secondaryMetric="+40% from last week"
        chart={<LineChartComponent chartData={chartData} />}
    />
);

const LoginPage = () => {
    return <AuthTemplateLayout left={leftContent} right={<LoginForm />} />;
};

export default LoginPage;
