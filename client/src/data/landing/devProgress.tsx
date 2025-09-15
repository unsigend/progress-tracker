export interface TimelineItem {
    id: string;
    title: string;
    description: string;
    date?: string;
    status: "completed" | "coming-soon";
    icon?: React.ReactNode;
}

export const timelineData: TimelineItem[] = [
    {
        id: "aws-s3-cloud-image-storage",
        title: "Amazon AWS S3 Cloud Image Storage",
        description:
            "Secure cloud image storage with AWS S3 integration for user uploaded images and data assets.",
        status: "coming-soon",
    },
    {
        id: "oauth-auth",
        title: "OAuth Authentication System",
        description:
            "Implemented GitHub and Google OAuth integration, providing users with seamless authentication experience.",
        date: "September 15th, 2025",
        status: "completed",
    },
];
