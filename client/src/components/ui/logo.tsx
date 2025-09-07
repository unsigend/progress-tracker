import { cn } from "@/lib/utils";

interface LogoProps {
    fontSize?: string;
    className?: string;
}

const Logo = ({ fontSize = "text-2xl", className }: LogoProps) => {
    return (
        <div className={cn("font-bold", fontSize, className)}>
            <span className="text-foreground">Progress</span>
            <span className="text-muted-foreground">tracker</span>
        </div>
    );
};

export default Logo;
