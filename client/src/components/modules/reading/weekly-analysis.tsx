// import shadcn/ui components
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import components
import BarChartComponent from "@/components/modules/ui/chart/BarChart";

const WeeklyAnalysis = () => {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-lg font-semibold">
                    Weekly Analysis
                </CardTitle>

                <div className="grid grid-cols-3 gap-4 pt-4 border-t">
                    <div className="space-y-1 text-center">
                        <div className="text-xs text-muted-foreground">
                            Total Pages
                        </div>
                        <div className="text-2xl font-bold">100</div>
                    </div>
                    <div className="space-y-1 text-center">
                        <div className="text-xs text-muted-foreground">
                            Daily Avg
                        </div>
                        <div className="text-2xl font-bold">10</div>
                    </div>
                    <div className="space-y-1 text-center">
                        <div className="text-xs text-muted-foreground">
                            Best Day
                        </div>
                        <div className="text-xl font-bold truncate">Monday</div>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="space-y-6">
                <BarChartComponent
                    chartData={[
                        { key: "Mon", value: 25 },
                        { key: "Tue", value: 42 },
                        { key: "Wed", value: 18 },
                        { key: "Thu", value: 55 },
                        { key: "Fri", value: 34 },
                        { key: "Sat", value: 0 },
                        { key: "Sun", value: 0 },
                    ]}
                    color={undefined}
                    label="Pages"
                />
            </CardContent>
        </Card>
    );
};

export default WeeklyAnalysis;
