/**
 * Step indicator component
 * @param currentStep - The current step
 * @param totalSteps - The total number of steps
 * @returns Step indicator component
 */
const StepIndicator = ({
    currentStep,
    totalSteps,
}: {
    currentStep: number;
    totalSteps: number;
}) => {
    return (
        <div className="flex items-center justify-center space-x-2 mb-8">
            {Array.from({ length: totalSteps }, (_, index) => (
                <div key={index + 1} className="flex items-center">
                    <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 ${
                            index + 1 === currentStep
                                ? "bg-gray-900 text-white"
                                : index + 1 < currentStep
                                ? "bg-gray-700 text-white"
                                : "bg-gray-200 text-gray-500"
                        }`}
                    >
                        {index + 1 < currentStep ? "✓" : index + 1}
                    </div>
                    {index + 1 < totalSteps && (
                        <div
                            className={`w-12 h-0.5 mx-2 transition-all duration-300 ${
                                index + 1 < currentStep
                                    ? "bg-gray-700"
                                    : "bg-gray-200"
                            }`}
                        />
                    )}
                </div>
            ))}
        </div>
    );
};

export default StepIndicator;
