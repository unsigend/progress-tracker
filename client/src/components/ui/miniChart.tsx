const MiniBarChart = ({ data }: { data: number[] }) => (
    <div className="flex items-end gap-1 h-8">
        {data.map((value, index) => (
            <div
                key={index}
                className="bg-black rounded-sm w-1.5 hover:bg-gray-700 transition-colors"
                style={{ height: `${value}%` }}
            />
        ))}
    </div>
);

const MiniLineChart = () => (
    <div className="h-8 w-full">
        <svg className="w-full h-full" viewBox="0 0 60 20">
            <polyline
                fill="none"
                stroke="#000"
                strokeWidth="1.5"
                points="0,15 10,10 20,12 30,8 40,6 50,4 60,2"
            />
            <circle cx="60" cy="2" r="2" fill="#000" />
        </svg>
    </div>
);

const MiniPieChart = ({ percentage }: { percentage: number }) => (
    <div className="w-8 h-8">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
            <circle
                cx="18"
                cy="18"
                r="16"
                fill="none"
                stroke="#e5e7eb"
                strokeWidth="3"
            />
            <circle
                cx="18"
                cy="18"
                r="16"
                fill="none"
                stroke="#000"
                strokeWidth="3"
                strokeDasharray={`${percentage} ${100 - percentage}`}
                strokeLinecap="round"
            />
        </svg>
    </div>
);

export { MiniBarChart, MiniLineChart, MiniPieChart };
