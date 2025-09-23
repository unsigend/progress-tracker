// import layout
import AuthLayout from "@/layout/auth/template";

// import components
import ChartContainer from "@/components/modules/ui/chartContainer";
import LineChartComponent from "@/components/modules/ui/LineChart";
import LoginForm from "@/components/modules/auth/loginForm";

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
