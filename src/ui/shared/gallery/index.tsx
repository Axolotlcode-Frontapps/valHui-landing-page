import { useState } from "react";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "../dialog";
import { Button } from "../button";
import { ScrollArea, ScrollBar } from "../scroll-area";

import LocalOne from "@/assets/images/locales/local-1.jpg";
import LocalTwo from "@/assets/images/locales/local-2.jpg";
import LocalThree from "@/assets/images/locales/local-3.jpg";
import LocalFour from "@/assets/images/locales/local-4.jpg";
import LocalFive from "@/assets/images/locales/local-5.jpg";
import LocalSix from "@/assets/images/locales/local-6.jpg";

import ConsultorioOne from "@/assets/images/consultorios/consultorio-1.jpg";
import ConsultorioTwo from "@/assets/images/consultorios/consultorio-2.jpg";
import ConsultorioThree from "@/assets/images/consultorios/consultorio-3.jpg";
import ConsultorioFour from "@/assets/images/consultorios/consultorio-4.jpg";
import ConsultorioFive from "@/assets/images/consultorios/consultorio-5.jpg";
import ConsultorioSix from "@/assets/images/consultorios/consultorio-6.jpg";

import OficinaOne from "@/assets/images/oficinas/oficina-1.jpg";
import OficinaTwo from "@/assets/images/oficinas/oficina-2.jpg";
import OficinaThree from "@/assets/images/oficinas/oficina-3.jpg";
import OficinaFour from "@/assets/images/oficinas/oficina-4.jpg";
import OficinaFive from "@/assets/images/oficinas/oficina-5.jpg";
import OficinaSix from "@/assets/images/oficinas/oficina-6.jpg";
import { cn } from "@/lib/utils/shadcn";

interface Props {
	title: GalleryImage;
	image?: string;
}

const galleryData = {
	"Local comercial": [
		{ src: LocalOne.src, alt: "Local comercial 1" },
		{ src: LocalTwo.src, alt: "Local comercial 2" },
		{ src: LocalThree.src, alt: "Local comercial 3" },
		{ src: LocalFour.src, alt: "Local comercial 4" },
		{ src: LocalFive.src, alt: "Local comercial 5" },
		{ src: LocalSix.src, alt: "Local comercial 6" },
	],
	Consultorio: [
		{ src: ConsultorioOne.src, alt: "Consultorio 1" },
		{ src: ConsultorioTwo.src, alt: "Consultorio 2" },
		{ src: ConsultorioThree.src, alt: "Consultorio 3" },
		{ src: ConsultorioFour.src, alt: "Consultorio 4" },
		{ src: ConsultorioFive.src, alt: "Consultorio 5" },
		{ src: ConsultorioSix.src, alt: "Consultorio 6" },
	],
	Oficina: [
		{ src: OficinaOne.src, alt: "Oficina 1" },
		{ src: OficinaTwo.src, alt: "Oficina 2" },
		{ src: OficinaThree.src, alt: "Oficina 3" },
		{ src: OficinaFour.src, alt: "Oficina 4" },
		{ src: OficinaFive.src, alt: "Oficina 5" },
		{ src: OficinaSix.src, alt: "Oficina 6" },
	],
} as const;

type GalleryKey = keyof typeof galleryData;

export function Gallery({ title = "Local comercial", image }: Props) {
	const [open, setOpen] = useState(false);
	const [currentGallery, setCurrentGallery] = useState<GalleryKey>(
		title as GalleryKey,
	);

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				{image && (
					<img
						src={image}
						alt={title}
						className='absolute object-cover object-center w-full h-full rounded-[5px] cursor-pointer'
					/>
				)}
			</DialogTrigger>
			<DialogContent className='bg-[#FFFFFF4D] text-[#FFFFFFB2] p-0 backdrop-blur-lg min-w-[95vw] xl:min-w-[1200px] h-[80vh] flex flex-col sm:flex-row gap-0'>
				<aside className='w-full sm:max-w-[252px] bg-[#FFFFFF40] p-4'>
					<DialogTitle className='text-4xl lg:text-[40px] font-bold mb-2'>
						Galería
					</DialogTitle>

					<ScrollArea className='w-full h-full'>
						<div className='w-full flex sm:flex-col gap-4'>
							{(Object.keys(galleryData) as GalleryKey[]).map((title) => (
								<Button
									key={`gallery-${title}`}
									onClick={() => setCurrentGallery(title)}
									variant='secondary'
									className={cn(
										"w-auto justify-start bg-[#7979794D] text-white hover:bg-[#797979CC]",
										currentGallery === title && "bg-[#797979CC]",
									)}
								>
									{title}
								</Button>
							))}
						</div>
						<ScrollBar orientation='horizontal' />
					</ScrollArea>
				</aside>
				<main className='w-full p-4 overflow-hidden flex flex-col'>
					<span className='text-4xl lg:text-[40px] font-semibold inline-block mb-2'>
						{currentGallery}
					</span>
					<ScrollArea className='h-[70vh] lg:h-full overflow-y-auto'>
						<div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6'>
							{galleryData?.[currentGallery]?.map(({ src, alt }) => (
								<div className='w-full relative' key={alt}>
									<img
										src={src}
										alt={alt}
										className='min-h-[230px] rounded-lg'
									/>
									<span className='absolute bottom-2 text-white'>
										{currentGallery}
									</span>
								</div>
							))}
						</div>
					</ScrollArea>
				</main>
			</DialogContent>
		</Dialog>
	);
}
