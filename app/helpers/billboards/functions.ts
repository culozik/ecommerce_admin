type SetModalStatus<T> = (isOpen: boolean) => void;

interface HandleStatus {
	(setModalStatus: SetModalStatus<void>): void;
}

interface HandleKeyBoardEvent {
	(
		e: React.KeyboardEvent,
		isModalOpen: boolean,
		setModalStatus: SetModalStatus<void>
	): void;
}
interface HandleMouseEvent {
	(
		e: React.MouseEvent,
		isModalOpen: boolean,
		setModalStatus: SetModalStatus<void>
	): void;
}

interface HandleSelect {
	(e: Event): void;
}

// -- Handle modal state --
const handleModalOpen: HandleStatus = (setModalStatus) => {
	setModalStatus(true);
};
const handleModalClose: HandleStatus = (setModalStatus) => {
	setModalStatus(false);
};

//	-- Handle dropdown menu state --
//  It is necessary for the correct closing of the modal window and drop-down menu when pressing Escape.
const handleKeyDown: HandleKeyBoardEvent = (e, isModalOpen, setModalStatus) => {
	if (e.code === "Escape" && isModalOpen) {
		e.preventDefault();
		setModalStatus(false);
	}
};
//    It is necessary for the correct behavior of closing the modal window
//  when the user clicks outside the context menu of the modal window.
const handleClickCapture: HandleMouseEvent = (
	e,
	isModalOpen,
	setModalStatus
) => {
	if (isModalOpen) {
		e.preventDefault();
		setModalStatus(false);
	}
};

//  It is necessary for the correct behavior when hovering and opening a modal window.
const handleSelect: HandleSelect = (e) => {
	e.preventDefault();
};

export {
	handleModalOpen,
	handleModalClose,
	handleKeyDown,
	handleClickCapture,
	handleSelect,
};
