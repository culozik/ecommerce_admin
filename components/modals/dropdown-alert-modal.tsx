"use client";

import {
	AlertDialog,
	AlertDialogHeader,
	AlertDialogFooter,
	AlertDialogContent,
	AlertDialogTitle,
	AlertDialogDescription,
} from "@/components/ui/alert-dialog";

import { Button } from "@/components/ui/button";

interface DropdownModalProps {
	title: string;
	description: string;
	isOpen: boolean;
	loading: boolean;
	onClose: () => void;
	onDelete: () => void;
	children?: React.ReactNode;
}

//	-- Alert for dropdown menus --
export const DropdownAlertModal: React.FC<DropdownModalProps> = ({
	title,
	description,
	isOpen,
	loading,
	onClose,
	onDelete,
	children,
}) => {
	//	Children should accept "AlertDialogTrigger" element.
	return (
		<AlertDialog open={isOpen}>
			{children}
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>{title}</AlertDialogTitle>
					<AlertDialogDescription>{description}</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<Button disabled={loading} variant="outline" onClick={onClose}>
						Cancel
					</Button>
					<Button disabled={loading} variant="destructive" onClick={onDelete}>
						Continue
					</Button>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
};
