"use client";

import {
	Check,
	ChevronsUpDown,
	PlusCircle,
	Store as StoreIcon,
} from "lucide-react";
import { useState } from "react";
import { Store } from "@prisma/client";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	CommandSeparator,
} from "@/components/ui/command";
import { useStoreModal } from "@/hooks/use-store-modal";
import { cn } from "@/lib/utils";

import { TEXT } from "@/constants/components/storeSwitcher/storeSwitcherConstants";

type PopoverTriggerProps = React.ComponentPropsWithoutRef<
	typeof PopoverTrigger
>;

interface StoreSwitcherProps extends PopoverTriggerProps {
	items: Store[];
}

export default function StoreSwitcher({
	className,
	items = [],
}: StoreSwitcherProps) {
	const [open, setOpen] = useState(false);
	const storeModal = useStoreModal();
	const params = useParams();
	const router = useRouter();

	// List of stores
	const formattedItems = items.map((item) => ({
		label: item.name,
		value: item.id,
	}));

	// Select current store
	const currentStore = formattedItems.find(
		(item) => item.value === params.storeId
	);

	// Handle store select
	const onStoreSelect = (store: { value: string; label: string }) => {
		setOpen(false);
		router.push(`/${store.value}`);
	};

	// Open a modal to create a new store
	const handleModalOpen = () => {
		setOpen(false);
		storeModal.onOpen();
	};

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					variant="outline"
					size="sm"
					role="combobox"
					aria-expanded={open}
					aria-label={TEXT.STORE_ICON_LABEL}
					className={cn("w-[200px] justify-between", className)}
				>
					<StoreIcon className="mr-2 h-4 w-4" />
					{currentStore?.label}
					<ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-[200px] p-0">
				<Command>
					<CommandList>
						<CommandInput placeholder={TEXT.INPUT_PLACEHOLDER} />
						<CommandEmpty>{TEXT.NO_STORE}</CommandEmpty>
						<CommandGroup heading={TEXT.LIST_HEADING}>
							{formattedItems.map((store) => (
								<CommandItem
									key={store.value}
									onSelect={() => onStoreSelect(store)}
									className="text-sm"
								>
									<StoreIcon className="mr-2 h-4 w-4" />
									{store.label}
									<Check
										className={cn(
											"ml-auto h-4 w-4",
											currentStore?.value === store?.value
												? "opacity-100"
												: "opacity-0"
										)}
									/>
								</CommandItem>
							))}
						</CommandGroup>
					</CommandList>
					<CommandSeparator />
					<CommandList>
						<CommandGroup>
							<CommandItem onSelect={handleModalOpen}>
								<PlusCircle className="mr-2 h-5 w-5" />
								{TEXT.CREATE_STORE}
							</CommandItem>
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	);
}
