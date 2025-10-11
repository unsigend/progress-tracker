// import dependencies
import { Link } from "react-router";

// import shadcn/ui components
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// import icons
import { Plus, BookOpen } from "lucide-react";

// import constants
import ROUTES_CONSTANTS from "@/lib/constants/routes";

const QuickActionsCard = () => {
    return (
        <Card className="h-full flex flex-col">
            <CardHeader className="flex-shrink-0">
                <CardTitle className="text-xl font-semibold text-foreground">
                    Quick Actions
                </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex items-center justify-center">
                <div className="flex flex-col gap-4 items-center w-full max-w-xs">
                    {/* Add Recording Button */}
                    <Link
                        to={ROUTES_CONSTANTS.DASHBOARD()
                            .READING()
                            .RECORDINGS_NEW()}
                        className="w-full"
                    >
                        <Button
                            className="w-full h-12 text-base font-medium shadow-lg hover:shadow-xl 
                            transition-all duration-200 hover:scale-[1.02] rounded-lg"
                            size="lg"
                        >
                            <Plus className="mr-2 h-5 w-5" />
                            Add Recording
                        </Button>
                    </Link>

                    {/* Track More Button */}
                    <Link
                        to={ROUTES_CONSTANTS.DASHBOARD().READING().BOOKS_LIST()}
                        className="w-full"
                    >
                        <Button
                            variant="outline"
                            className="w-full h-12 text-base font-medium border-2 
                            hover:bg-muted/50 transition-all duration-200 hover:scale-[1.02] rounded-lg"
                            size="lg"
                        >
                            <BookOpen className="mr-2 h-5 w-5" />
                            Track More Books
                        </Button>
                    </Link>
                </div>
            </CardContent>
        </Card>
    );
};

export default QuickActionsCard;
