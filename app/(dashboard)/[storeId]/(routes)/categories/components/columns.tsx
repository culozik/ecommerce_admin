"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";

export type CategoryColumn = {
	id: string;
	createdAt: string;
	billboardLabel: string;
	name: string;
};

export const columns: ColumnDef<CategoryColumn>[] = [
	{
		accessorKey: "name",
		header: "Name",
	},
	{
		accessorKey: "billboard",
		header: "Billboard",
		cell: ({ row }) => row.original.billboardLabel,
	},
	{
		accessorKey: "createdAt",
		header: "Date",
	},
	{
		id: "actions",
		cell: ({ row }) => <CellAction data={row.original} />,
	},
];
