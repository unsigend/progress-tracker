// import shadcn/ui components
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const CompletedBooks = () => {
    return (
        <Card className="min-h-[200px]">
            <CardHeader>
                <CardTitle className="text-xl font-semibold">
                    Completed Books
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 min-h-[150px] flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                    <p className="text-lg">Your completed reading journey</p>
                    <p className="text-sm">
                        Books will appear here once you finish them
                    </p>
                </div>
            </CardContent>
        </Card>
    );
};

export default CompletedBooks;
