import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";

const SetupPage = () => {
	return (
		<div className="flex flex-col gap-y-3 items-end p-4">
			<UserButton afterSignOutUrl="/" />
		</div>
	);
};

export default SetupPage;
