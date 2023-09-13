"use client";

import { useState } from "react";
import { Store } from "@prisma/client";
import { useParams, useRouter } from "next/navigation";

import { PopoverTrigger } from "@/components/ui/popover";
import { useStoreModal } from "@/hooks/use-store-modal";

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

	const formattedItems = items.map((item) => ({
		label: item.name,
		value: item.id,
	}));

	const currentStore = formattedItems.find(
		(item) => item.value === params.storeId
	);

	const onStoreSelect = (store: { value: string; label: string }) => {
		setOpen(false);
		router.push(`/${store.value}`);
	};

	return <div>Store Switcher</div>;
}
