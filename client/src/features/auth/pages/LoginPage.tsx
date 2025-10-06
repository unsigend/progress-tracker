// import layout
import AuthLayout from "@/components/layout/auth/template";

// import components
import ChartContainer from "@/components/charts/ChartContainer";
import LineChartComponent from "@/components/charts/LineChart";
import LoginForm from "../components/loginForm";

// import utils
import random from "@/utils/random";

// generate random data
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
