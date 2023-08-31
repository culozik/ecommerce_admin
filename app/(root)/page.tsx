import { Button } from "@/components/ui/button";

export default function Home() {
	return (
		<div className="flex flex-col gap-y-3 items-center p-4">
			<p className="block ">Hello Admin Dashboard</p>
			<Button>Click Me</Button>
		</div>
	);
}
