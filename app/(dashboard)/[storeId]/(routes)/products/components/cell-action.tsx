"use client";

import { useState } from "react";
import axios from "axios";
import { Copy, Edit, MoreHorizontal, Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AlertDialogTrigger } from "@/components/ui/alert-dialog";

import { Button } from "@/components/ui/button";
import { DropdownAlertModal } from "@/components/modals/dropdown-alert-modal";

import { BillboardColumn } from "./columns";

import {
	handleClickCapture,
	handleKeyDown,
	handleModalClose,
	handleModalOpen,
	handleSelect,
} from "@/app/helpers/billboards/functions";

import { TEXT } from "@/constants/components/billboards/constants";

interface CellActionProps {
	data: BillboardColumn;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
	const { CELL_ACTIONS } = TEXT;
	const [loading, setLoading] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const router = useRouter();
	const params = useParams();

	const onCopy = () => {
		navigator.clipboard.writeText(data.id);
		toast.success(CELL_ACTIONS.ON_COPE_SUCCESS);
	};

	const onUpdate = () => {
		router.push(`/${params.storeId}/billboards/${data.id}`);
	};

	const onDelete = async () => {
		try {
			setIsModalOpen(false);
			setLoading(true);

			await axios.delete(`/api/${params.storeId}/billboards/${data.id}`);

			toast.success(CELL_ACTIONS.ON_DELETE_SUCCESS);
			router.refresh();

			setIsMenuOpen(false);
		} catch (err) {
			toast.error(CELL_ACTIONS.ON_DELETE_ERROR);
		} finally {
			setIsModalOpen(false);
			setLoading(false);
		}
	};

	return (
		<DropdownMenu
			open={isMenuOpen}
			onOpenChange={() => setIsMenuOpen(!isMenuOpen)}
		>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" className="h-8 w-8 p-0">
					<span className="sr-only">{CELL_ACTIONS.SR_MENU_NAME}</span>
					<MoreHorizontal className="h-4 w-4" />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent
				align="end"
				onKeyDown={(e) => handleKeyDown(e, isModalOpen, setIsModalOpen)}
				onClickCapture={(e) =>
					handleClickCapture(e, isModalOpen, setIsModalOpen)
				}
			>
				<DropdownMenuLabel>{CELL_ACTIONS.LABEL}</DropdownMenuLabel>
				<DropdownMenuItem onClick={onCopy}>
					<Copy className="mr-2 h-4 w-4" />
					{CELL_ACTIONS.COPY}
				</DropdownMenuItem>
				<DropdownMenuItem onClick={onUpdate}>
					<Edit className="mr-2 h-4 w-4" />
					{CELL_ACTIONS.UPDATE}
				</DropdownMenuItem>
				<DropdownAlertModal
					title={CELL_ACTIONS.MODAL_TITLE}
					description={CELL_ACTIONS.MODAL_DESCRIPTION}
					isOpen={isModalOpen}
					loading={loading}
					onClose={() => handleModalClose(setIsModalOpen)}
					onDelete={onDelete}
				>
					<DropdownMenuItem
						onSelect={(e) => handleSelect(e)}
						onClick={() => handleModalOpen(setIsModalOpen)}
					>
						<AlertDialogTrigger asChild>
							<div className="flex">
								<Trash className="mr-2 h-4 w-4" />
								{CELL_ACTIONS.DELETE}
							</div>
						</AlertDialogTrigger>
					</DropdownMenuItem>
				</DropdownAlertModal>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
