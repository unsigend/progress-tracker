// import dependencies
import type { ReactNode } from "react";

/**
 * TimelineItem interface
 * @property id - The id of the timeline item
 * @property title - The title of the timeline item
 * @property description - The description of the timeline item
 * @property date - The date of the timeline item
 * @property status - The status of the timeline item
 * @property icon - The icon of the timeline item
 */
export interface TimelineItem {
    id: string;
    title: string;
    description: string;
    date?: string;
    status: "completed" | "coming-soon";
    icon?: ReactNode;
}

/**
 * timelineData - The data for the timeline
 * @returns The timeline data
 */
const timelineData: TimelineItem[] = [
    {
        id: "role-based-access-control",
        title: "Role-based Access Control (RBAC)",
        description:
            "Implement comprehensive RBAC system to protect sensitive endpoints and resources. \
            Includes integrated admin panel for user management, system monitoring, and administrative controls.",
        status: "coming-soon",
    },
    {
        id: "deployment-e2e-testing",
        title: "Deployment",
        description:
            "Deploy the application across multiple platforms into production and apply end-to-end testing.",
        status: "completed",
        date: "October 15, 2025",
    },
    {
        id: "email-notifications",
        title: "Email Notification System",
        description:
            "Secure email-based authentication with verification codes for password reset, account verification, \
            and important notifications with real-time delivery.",
        status: "completed",
        date: "October 14, 2025",
    },
    {
        id: "image-compression",
        title: "Image Compression",
        description:
            "Automatically compress and optimize images to reduce file size and improve loading speed with minimal quality loss.",
        status: "completed",
        date: "October 13, 2025",
    },
    {
        id: "reading-progress-tracking",
        title: "Reading Progress Tracking",
        description:
            "Track daily and monthly reading progress with pages and minutes read. Monitor completed and in-progress books \
            with detailed page-based analytics.",
        status: "completed",
        date: "October 10, 2025",
    },
    {
        id: "aws-s3-cloud-image-storage",
        title: "Amazon AWS S3 Cloud Image Storage",
        description:
            "Secure cloud storage with AWS S3 integration for user-uploaded images and data assets.",
        status: "completed",
        date: "September 29, 2025",
    },
    {
        id: "books-library",
        title: "Books Library",
        description:
            "Comprehensive book catalog with advanced search, pagination, and persistent search history.",
        status: "completed",
        date: "September 28, 2025",
    },
    {
        id: "oauth-auth",
        title: "OAuth Authentication System",
        description:
            "Seamless authentication with GitHub and Google OAuth integration for quick and secure user access.",
        status: "completed",
        date: "September 25, 2025",
    },
];

export default timelineData;
