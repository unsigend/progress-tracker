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
        id: "aws-s3-cloud-image-storage",
        title: "Amazon AWS S3 Cloud Image Storage",
        description:
            "Secure cloud image storage with AWS S3 integration for user uploaded images and data assets.",
        status: "coming-soon",
    },
    {
        id: "reading-library",
        title: "Reading Library",
        description:
            "Reading library with comprehensive book management featuring dual-mode navigation - switch between infinite scroll and pagination mode for precise control.",
        status: "coming-soon",
    },
    {
        id: "oauth-auth",
        title: "OAuth Authentication System",
        description:
            "Implemented GitHub and Google OAuth integration, providing users with seamless authentication experience.",
        status: "completed",
        date: "September 25, 2025",
    },
];

export default timelineData;
