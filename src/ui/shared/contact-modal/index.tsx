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

export function ContactModal() {
	const [open, setOpen] = useState(false);

	function onSuccess() {
		setOpen(false);
	}

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button className='find-us__button w-full h-12' type='button'>
					Contactar
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
