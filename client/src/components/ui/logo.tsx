// import dependencies
import { cn } from "@/lib/utils";

// import components
import { Link } from "react-router";

interface LogoProps {
    fontSize?: string;
    className?: string;
}

/**
 * Logo component
 * @param fontSize - The font size of the logo
 * @param className - The class name of the logo (additionally)
 * @returns Logo component
 */
const Logo = ({ fontSize = "text-2xl", className }: LogoProps) => {
    return (
        <Link to="/">
            <div className={cn("font-bold", fontSize, className)}>
                <span className="text-foreground">Progress</span>
                <span className="text-muted-foreground">tracker</span>
            </div>
        </Link>
    );
};

export default Logo;
