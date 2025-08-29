import { AlertCircle, RefreshCw } from "lucide-react";

interface ErrorMessageProps {
    message: string;
    onRetry?: () => void;
}

const ErrorMessage = ({ message, onRetry }: ErrorMessageProps) => {
    return (
        <div className="flex items-center justify-center p-6">
            <div className="text-center max-w-md">
                <div className="flex justify-center mb-3">
                    <AlertCircle className="w-12 h-12 text-red-500" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Something went wrong
                </h3>
                <p className="text-gray-600 mb-4">{message}</p>
                {onRetry && (
                    <button
                        onClick={onRetry}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors"
                    >
                        <RefreshCw className="w-4 h-4" />
                        Try Again
                    </button>
                )}
            </div>
        </div>
    );
};

export default ErrorMessage;
