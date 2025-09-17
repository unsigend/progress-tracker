/**
 * Divider component
 * @param text - The text to display
 * @returns Divider component
 */
const Divider = ({ text }: { text: string }) => {
    return (
        <div className="relative">
            <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-gray-500">{text}</span>
            </div>
        </div>
    );
};

export default Divider;
