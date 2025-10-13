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
        id: "reading-progress-tracking",
        title: "Reading Progress Tracking",
        description:
            "Track daily and monthly reading progress with pages and minutes read. Monitor completed and in-progress books with detailed page-based analytics.",
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
