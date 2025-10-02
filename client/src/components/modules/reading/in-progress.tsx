// import shadcn/ui components
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const InProgressReading = () => {
    return (
        <Card className="min-h-[200px]">
            <CardHeader>
                <CardTitle className="text-xl font-semibold">
                    In Progress Reading
                </CardTitle>
            </CardHeader>
            <CardContent className="min-h-[150px] flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                    <p className="text-lg">Currently reading</p>
                    <p className="text-sm">
                        Your active books will show up here
                    </p>
                </div>
            </CardContent>
        </Card>
    );
};

export default InProgressReading;
