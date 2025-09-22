import { Menu, X } from "lucide-react";

/**
 * HamburgerButton component
 * @param isOpen - boolean to check if the button is open
 *  if set to true it will display the X icon
 *  if set to false it will display the Menu icon
 * @param onClick - function to handle the click event
 * @returns HamburgerButton component
 */
const HamburgerButton = ({
    isOpen,
    onClick,
}: {
    isOpen: boolean;
    onClick: () => void;
}) => {
    return isOpen ? (
        <X className="size-6" onClick={onClick} />
    ) : (
        <Menu className="size-6" onClick={onClick} />
    );
};

export default HamburgerButton;
