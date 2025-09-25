/**
 * AuthTemplateLayout component
 * @param left - The left content to render
 * @param right - The right content to render
 * @returns The AuthTemplateLayout component
 */
const AuthTemplateLayout = ({
    left,
    right,
}: {
    left: React.ReactNode;
    right: React.ReactNode;
}) => {
    return (
        <div className="relative grid md:grid-cols-2 min-h-[600px]">
            {/* Left Content */}
            <div className="bg-muted/50 p-8 flex items-center justify-center">
                <div className="w-full max-w-sm">{left}</div>
            </div>

            {/* Right Content */}
            <div className="p-8 flex items-center justify-center">
                <div className="w-full max-w-sm">{right}</div>
            </div>
        </div>
    );
};

export default AuthTemplateLayout;
