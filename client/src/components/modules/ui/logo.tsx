// import dependencies
import { cn } from "@/lib/utils";

// import components
import { Link } from "@refinedev/core";

// import constants
import ROUTES_CONSTANTS from "@/constants/routes";

/**
 * Logo component
 * @param fontSize - The font size of the logo
 * @param className - The class name of the logo (additionally)
 * @returns Logo component
 */
const Logo = ({
    fontSize = "text-2xl",
    className,
}: {
    fontSize?: string;
    className?: string;
}) => {
    return (
        <Link to={ROUTES_CONSTANTS.LANDING().HOME()}>
            <div className={cn("font-bold", fontSize, className)}>
                <span className="text-foreground">Progress</span>
                <span className="text-muted-foreground">tracker</span>
            </div>
        </Link>
    );
};

export default Logo;
