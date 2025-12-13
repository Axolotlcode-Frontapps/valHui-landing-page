import { useState } from "react";
import { Button } from "../button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "../dialog";
import { ContactForm } from "./form";

interface Props {
	label: string;
	className?: string;
}

export function ContactModal({ label = "Contactar", className }: Props) {
	const [open, setOpen] = useState(false);

	function onSuccess() {
		setOpen(false);
	}

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button className={`h-12 ${className}`} type='button'>
					{label}
				</Button>
			</DialogTrigger>
			<DialogContent className='min-w-[90vw] md:min-w-3xl'>
				<DialogHeader>
					<DialogTitle>Contáctanos</DialogTitle>
				</DialogHeader>
				<ContactForm onSuccess={onSuccess} />
			</DialogContent>
		</Dialog>
	);
}
