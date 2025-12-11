import { useState } from "react";
import { cn } from "@/lib/utils/shadcn";

interface Props {
	children?: React.ReactNode;
	links?: { name: string; href: string }[];
}

export function Navigation({ links = [], children }: Props) {
	const [open, setOpen] = useState(false);

	return (
		<>
			<button
				type='button'
				className='flex items-center justify-center lg:hidden w-10 h-10 p-0'
				onClick={() => setOpen((v) => !v)}
				data-open={open ? "true" : "false"}
				aria-expanded={open}
				aria-label={open ? "Cerrar navegación" : "Abrir navegación"}
			>
				<div className='relative w-6 h-6'>
					<span
						className='absolute top-0 left-0 inline-block bg-black h-[3px] w-6 rounded-sm transition-all duration-300 ease-in-out'
						style={{
							transform: open ? "rotate(45deg) translate(7px, 7px)" : "none",
						}}
					/>
					<span
						className='absolute top-2 left-0 inline-block bg-black h-[3px] w-6 rounded-sm transition-all duration-300 ease-in-out'
						style={{
							opacity: open ? 0 : 1,
						}}
					/>
					<span
						className='absolute top-4 left-0 inline-block bg-black h-[3px] w-6 rounded-sm transition-all duration-300 ease-in-out'
						style={{
							transform: open ? "rotate(-45deg) translate(5px, -5px)" : "none",
						}}
					/>
				</div>
			</button>

			<nav
				aria-hidden={!open}
				className={cn(
					"lg:hidden fixed inset-0 grid place-content-center bg-white transition-all duration-300",
					"opacity-0 pointer-events-none translate-y-2 -z-10",
					open && "opacity-100 pointer-events-auto translate-y-0",
				)}
			>
				<ul className='flex flex-col items-center gap-6 text-[#374151]'>
					{links.map((link) => (
						<li key={link.name}>
							<a
								href={link.href}
								onClick={() => setOpen(false)}
								className='py-0.75 px-1.5'
							>
								{link.name}
							</a>
						</li>
					))}
					<li className='inline-block lg:hidden'>{children}</li>
				</ul>
			</nav>

			<nav className='hidden flex-1 lg:grid place-content-center text-[#374151]'>
				<ul className='flex flex-row items-center gap-6'>
					{links.map((link) => (
						<li key={link.name}>
							<a href={link.href} className='py-0.75 px-1.5'>
								{link.name}
							</a>
						</li>
					))}
				</ul>
			</nav>
			<div className='hidden lg:block'>{children}</div>
		</>
	);
}
