// import shadcn/ui components
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";

/**
 * Generic delete confirmation dialog component
 * @param open - Whether the dialog is open
 * @param onOpenChange - Callback when the dialog open state changes
 * @param title - Title of the dialog
 * @param description - Description text for the dialog
 * @param onConfirm - Callback when user confirms the deletion
 * @param confirmText - Text for the confirm button (default: "Delete")
 * @param cancelText - Text for the cancel button (default: "Cancel")
 */
const DeleteDialog = ({
    open,
    onOpenChange,
    title,
    description,
    onConfirm,
    confirmText = "Delete",
    cancelText = "Cancel",
}: {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    title: string;
    description: string;
    onConfirm: () => void;
    confirmText?: string;
    cancelText?: string;
}) => {
    /**
     * Handle the confirm action
     */
    const handleConfirm = () => {
        onConfirm();
        onOpenChange(false);
    };

    /**
     * Handle the cancel action
     */
    const handleCancel = () => {
        onOpenChange(false);
    };

    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{title}</AlertDialogTitle>
                    <AlertDialogDescription>
                        {description}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={handleCancel}>
                        {cancelText}
                    </AlertDialogCancel>
                    <AlertDialogAction
                        onClick={handleConfirm}
                        className="bg-red-600 hover:bg-red-700 focus:ring-red-600"
                    >
                        {confirmText}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default DeleteDialog;
