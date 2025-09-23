interface ChartContainerProps {
    title: string;
    primaryMetric: string;
    secondaryMetric: string;
    chart: React.ReactNode;
}

// import components
import BackLink from "@/components/modules/ui/backButton";

// import constants
import ROUTES_CONSTANTS from "@/constants/routes";

/**
 * ChartContainer component
 * @param title - The title of the chart
 * @param primaryMetric - The primary metric of the chart
 * @param secondaryMetric - The secondary metric of the chart
 * @param chart - The chart to render
 * @note this component is only used in the auth pages
 * @returns The ChartContainer component
 */
const ChartContainer = ({
    title,
    primaryMetric,
    secondaryMetric,
    chart,
}: ChartContainerProps) => {
    return (
        <>
            <div className="flex items-center justify-start gap-4 mb-8">
                <BackLink to={ROUTES_CONSTANTS.HOME} />
                <h2 className="text-gray-600 text-xl font-medium">{title}</h2>
            </div>

            <div className="mb-12">
                <div className="text-4xl font-bold text-gray-900 mb-4 leading-none">
                    {primaryMetric}
                </div>
                <div className="text-gray-500 text-base">{secondaryMetric}</div>
            </div>

            {chart}

            <div className="mt-8"></div>
        </>
    );
};

export default ChartContainer;
