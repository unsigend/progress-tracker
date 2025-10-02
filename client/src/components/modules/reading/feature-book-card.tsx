/**
 * Feature Book Card Component with 3D book effect
 * A visually appealing card to showcase featured books
 */
interface FeatureBookCardProps {
    coverImageUrl: string;
    title?: string;
}

const FeatureBookCard: React.FC<FeatureBookCardProps> = ({
    coverImageUrl,
    title = "Start reading this captivating thriller before it's out.",
}) => {
    return (
        <div className="h-full flex flex-col space-y-3">
            {/* Header Section */}
            <div className="space-y-2 flex-shrink-0">
                <p className="text-xs font-semibold uppercase tracking-wider">
                    Sneak Peek
                </p>
                <h2 className="text-lg lg:text-xl xl:text-2xl font-bold leading-tight">
                    {title}
                </h2>
            </div>

            {/* Main Card */}
            <div
                className="relative overflow-hidden rounded-xl bg-gradient-to-br from-slate-900 via-slate-800 via-gray-800 
            to-slate-700 dark:from-black dark:via-slate-900 dark:via-gray-900 dark:to-slate-800 p-4 sm:p-4 lg:p-6 shadow-xl 
            hover:shadow-2xl hover:scale-[1.01] transition-all duration-300 ease-out flex-1 flex items-center"
            >
                {/* Colorful radial gradient overlays for enhanced fading effects */}
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        background:
                            "radial-gradient(ellipse at 25% 25%, rgba(147, 51, 234, 0.2) 0%, rgba(79, 172, 254, 0.15) 30%, rgba(56, 189, 248, 0.08) 60%, transparent 80%)",
                    }}
                />
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        background:
                            "radial-gradient(ellipse at 75% 75%, rgba(59, 130, 246, 0.15) 0%, rgba(16, 185, 129, 0.1) 40%, rgba(34, 197, 94, 0.05) 70%, transparent 85%)",
                    }}
                />
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        background:
                            "radial-gradient(ellipse at 50% 10%, rgba(255, 255, 255, 0.1) 0%, rgba(147, 197, 253, 0.05) 50%, transparent 75%)",
                    }}
                />

                {/* Book Container */}
                <div className="relative z-10 flex justify-center items-center w-full">
                    <div className="relative max-w-[160px] sm:max-w-[180px] w-full">
                        <div
                            className="relative group cursor-pointer transition-all duration-200 ease-out hover:-translate-y-1"
                            style={{
                                transform: "perspective(1000px) rotateY(-5deg)",
                                transformStyle: "preserve-3d",
                            }}
                        >
                            <img
                                src={coverImageUrl}
                                alt="Featured Book Cover"
                                className="w-full h-auto rounded-lg shadow-2xl shadow-black/40"
                                style={{
                                    boxShadow: `
                                        0 2px 4px rgba(0, 0, 0, 0.1),
                                        0 8px 16px rgba(0, 0, 0, 0.2),
                                        0 16px 32px rgba(0, 0, 0, 0.3),
                                        -8px 0 16px rgba(0, 0, 0, 0.2)
                                    `,
                                }}
                            />
                            <div
                                className="absolute inset-0 rounded-lg bg-gradient-to-r from-transparent 
                            via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FeatureBookCard;
