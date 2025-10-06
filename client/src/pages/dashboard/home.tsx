// import components
import FileUploadButton from "@/components/common/FileUpload";
import { toast } from "sonner";

/**
 * Dashboard Home Page
 */
const DashboardHomePage = () => {
    const handleFileUploadSuccess = (fileUrl: string) => {
        console.log(fileUrl);
        toast.success("File uploaded successfully!");
    };
    return (
        <div>
            <FileUploadButton onUploadSuccess={handleFileUploadSuccess} />
        </div>
    );
};

export default DashboardHomePage;
