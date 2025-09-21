import RESOURCES_CONSTANTS from "@/constants/resources";
import { useOne } from "@refinedev/core";

function LandingHomePage() {
    const {
        result,
        query: { isLoading },
    } = useOne({
        resource: RESOURCES_CONSTANTS.BOOKS,
        id: "275eedd1-f210-48b5-acab-e911a03e83e3",
    });
    if (isLoading) {
        return <div>Loading...</div>;
    }
    return <div>Book: {result?.title}</div>;
}

export default LandingHomePage;
