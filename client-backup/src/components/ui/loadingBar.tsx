import { ClipLoader } from "react-spinners";

const LoadingBar = ({ message }: { message: string }) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-100">
            <div className="text-center p-12 bg-white rounded-2xl shadow-xl min-w-80 min-h-64">
                <div className="mb-8">
                    <ClipLoader size={60} color="#6b7280" />
                </div>
                <p className="text-gray-700 text-xl font-medium">{message}</p>
            </div>
        </div>
    );
};

export default LoadingBar;
