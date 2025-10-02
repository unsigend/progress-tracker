// import shadcn/ui components
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const CompletedBooks = () => {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-lg font-semibold">
                    Completed Books
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6"></CardContent>
        </Card>
    );
};

export default CompletedBooks;
