import type { ReactNode } from "react";

interface ContentCardProps {
    children: ReactNode;
}

const ContentCard = ({ children }: ContentCardProps) => {
    return (
        <div className="bg-white rounded-2xl border-0 p-8 shadow-sm ring-1 ring-black/5">
            {children}
        </div>
    );
};

export default ContentCard;
