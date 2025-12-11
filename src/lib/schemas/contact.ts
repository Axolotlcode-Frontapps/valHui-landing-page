import { z } from "zod";
import {
	bussinessTypeOptions,
	methodContactOptionsValues,
} from "../utils/constants";

const MX_PHONE_REGEX =
	/^(?:\+?52\s?(?:1\s?)?)?(?:\(?\d{2}\)?[\s-]?\d{4}[\s-]?\d{4}|\(?\d{3}\)?[\s-]?\d{3}[\s-]?\d{4})$/;

class ContactSchema {
	contactFormSchema = z.object({
		name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
		email: z.email("El correo electrónico no es válido"),
		phone: z
			.string()
			.regex(
				MX_PHONE_REGEX,
				"El teléfono debe ser de México (10 dígitos, opcional +52 y separadores)",
			),
		bussiness: z.string().nullable(),
		bussinessType: z.enum(bussinessTypeOptions).nullable(),
		interestAreas: z.array(z.string()),
		requeriments: z
			.string()
			.max(500, "Los requisitos deben tener como máximo 500 caracteres"),
		description: z
			.string()
			.max(1000, "La descripción debe tener como máximo 1000 caracteres"),
		methodContact: z.enum(methodContactOptionsValues).nullable(),
		wantVisit: z.boolean(),
		agreeTerms: z.boolean().refine((val) => val === true, {
			message: "Debes aceptar los términos y condiciones",
		}),
	});
}

export const contactSchema = new ContactSchema();

export type ContactFormType = z.infer<typeof contactSchema.contactFormSchema>;
