// import dependencies
import { useRef, useState } from "react";

// import shadcn/ui components
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";

// import icons
import { Upload, File, X, Image as ImageIcon, Loader2 } from "lucide-react";

// import toast
import { toast } from "sonner";

// import api
import ApiClient from "@/api/apiClient";

// import types
import type { FileUploadResponseDto } from "@/api/api";
import type { AxiosResponse } from "axios";

interface FileUploadProps {
    text?: string;
    icon?: React.ReactNode;
    acceptedFileTypes?: string;
    maxFileSizeMB?: number;
    onUploadSuccess?: (fileUrl: string) => void;
}

/**
 * FileUpload component
 *
 * @param text - The text to display on the button
 * @param icon - The icon to display on the button
 * @param acceptedFileTypes - The accepted file types
 * @param maxFileSizeMB - The maximum file size in MB
 * @param onUploadSuccess - The function to call when the file is uploaded successfully
 * @returns FileUpload component
 */
const FileUpload = ({
    text = "Upload File",
    icon = <Upload className="w-4 h-4" />,
    acceptedFileTypes = "image/*",
    maxFileSizeMB = 10,
    onUploadSuccess,
}: FileUploadProps) => {
    const [file, setFile] = useState<File | null>(null);
    const [isDragOver, setIsDragOver] = useState(false);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            setFile(selectedFile);
        }
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(false);
        const droppedFile = e.dataTransfer.files[0];
        if (droppedFile) {
            setFile(droppedFile);
        }
    };

    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };

    const handleRemoveFile = () => {
        setFile(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const handleUpload = async () => {
        if (file) {
            try {
                setIsLoading(true);
                const response: AxiosResponse<FileUploadResponseDto> =
                    await ApiClient.api.fileControllerUploadFile({ file });
                setIsDialogOpen(false);
                setFile(null);
                onUploadSuccess?.(response.data.file_url);
            } catch {
                // Show error toast
                toast.error("Failed to upload file. Please try again.");
            } finally {
                setIsLoading(false);
            }
        }
    };

    const formatFileSize = (bytes: number) => {
        if (bytes === 0) return "0 Bytes";
        const k = 1024;
        const sizes = ["Bytes", "KB", "MB", "GB"];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
    };

    return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                    {icon}
                    {text}
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Upload File</DialogTitle>
                    <DialogDescription>
                        Choose a file to upload. Maximum file size:{" "}
                        {maxFileSizeMB}MB
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4">
                    {/* Upload Area */}
                    <Card
                        className={`border-2 border-dashed transition-colors cursor-pointer hover:bg-muted/50 ${
                            isDragOver
                                ? "border-primary bg-primary/5"
                                : "border-muted-foreground/25"
                        }`}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        onClick={handleUploadClick}
                    >
                        <CardContent className="flex flex-col items-center justify-center p-8 text-center">
                            <div className="rounded-full bg-muted p-3 mb-4">
                                <Upload className="w-6 h-6 text-muted-foreground" />
                            </div>
                            <div className="space-y-2">
                                <p className="text-sm font-medium">
                                    {isDragOver
                                        ? "Drop file here"
                                        : "Click to upload or drag and drop"}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                    {acceptedFileTypes === "image/*"
                                        ? "PNG, JPG, GIF up to"
                                        : "Any file up to"}{" "}
                                    {maxFileSizeMB}MB
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Hidden File Input */}
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept={acceptedFileTypes}
                        onChange={handleFileChange}
                        className="hidden"
                    />

                    {/* Selected File Preview */}
                    {file && (
                        <Card className="border">
                            <CardContent className="p-4">
                                <div className="flex items-center gap-3">
                                    <div className="rounded-lg bg-muted p-2">
                                        {acceptedFileTypes === "image/*" ? (
                                            <ImageIcon className="w-5 h-5 text-muted-foreground" />
                                        ) : (
                                            <File className="w-5 h-5 text-muted-foreground" />
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium truncate">
                                            {file.name}
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                            {formatFileSize(file.size)}
                                        </p>
                                    </div>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={handleRemoveFile}
                                        className="h-8 w-8 p-0"
                                    >
                                        <X className="w-4 h-4" />
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {/* Action Buttons */}
                    <div className="flex justify-end gap-2">
                        <Button
                            variant="outline"
                            onClick={() => setIsDialogOpen(false)}
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={handleUpload}
                            disabled={!file || isLoading}
                            className="flex items-center gap-2"
                        >
                            {isLoading ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                                <Upload className="w-4 h-4" />
                            )}
                            {isLoading ? "Uploading..." : "Upload"}
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default FileUpload;
