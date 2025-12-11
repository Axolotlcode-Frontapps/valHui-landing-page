import { useForm } from "@tanstack/react-form";

import {
	Field,
	FieldError,
	FieldGroup,
	FieldLabel,
	FieldLegend,
	FieldSet,
} from "../field";
import { Input } from "../input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../select";
import { Checkbox } from "../checkbox";
import { Textarea } from "../textarea";
import { RadioGroup, RadioGroupItem } from "../radio-group";
import { Button } from "../button";
import { Spinner } from "../spinner";
import { contactSchema, type ContactFormType } from "@/lib/schemas/contact";
import {
	interestAreasOptions,
	methodContactOptions,
} from "@/lib/utils/constants";
import { contact } from "@/lib/services/contact";
import { toast } from "sonner";

interface ContactFormProps {
	onSuccess?: () => void;
}

export function ContactForm({ onSuccess }: ContactFormProps) {
	const form = useForm({
		defaultValues: {
			name: "",
			email: "",
			phone: "",
			bussiness: null as string | null,
			bussinessType: null as ContactFormType["bussinessType"] | null,
			interestAreas: [] as string[],
			requeriments: "",
			description: "",
			methodContact: null as ContactFormType["methodContact"] | null,
			wantVisit: false,
			agreeTerms: false,
		},
		validators: {
			onMount: contactSchema.contactFormSchema,
			onChange: contactSchema.contactFormSchema,
		},
		onSubmit: async ({ value }) => {
			console.log(value);
			await contact.sendMessage(value as ContactFormType);
			toast.success("Datos enviados correctamente");
			form.reset();
			onSuccess?.();
		},
	});

	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				e.stopPropagation();
				form.handleSubmit();
			}}
			className='flex flex-col gap-6 max-h-[90vh] overflow-y-auto'
		>
			<div className='flex flex-col md:flex-row gap-6 items-start justify-center'>
				<form.Field
					name='name'
					children={(field) => {
						const isInvalid =
							field.state.meta.isTouched && !field.state.meta.isValid;

						return (
							<Field data-invalid={isInvalid}>
								<FieldLabel htmlFor={field.name} className='font-bold text-sm'>
									Nombre completo: <span className='text-[#D4183D]'>*</span>
								</FieldLabel>
								<Input
									id={field.name}
									name={field.name}
									value={field.state.value}
									onBlur={field.handleBlur}
									onChange={(e) => field.handleChange(e.target.value)}
									aria-invalid={isInvalid}
								/>
								{isInvalid && <FieldError errors={field.state.meta.errors} />}
							</Field>
						);
					}}
				/>
				<form.Field
					name='email'
					children={(field) => {
						const isInvalid =
							field.state.meta.isTouched && !field.state.meta.isValid;

						return (
							<Field data-invalid={isInvalid}>
								<FieldLabel htmlFor={field.name} className='font-bold text-sm'>
									Correo electrónico: <span className='text-[#D4183D]'>*</span>
								</FieldLabel>
								<Input
									id={field.name}
									name={field.name}
									value={field.state.value}
									onBlur={field.handleBlur}
									onChange={(e) => field.handleChange(e.target.value)}
									type='email'
									aria-invalid={isInvalid}
									autoComplete='off'
								/>
								{isInvalid && <FieldError errors={field.state.meta.errors} />}
							</Field>
						);
					}}
				/>
			</div>
			<div className='flex flex-col md:flex-row gap-6 items-start justify-center'>
				<form.Field
					name='phone'
					children={(field) => {
						const isInvalid =
							field.state.meta.isTouched && !field.state.meta.isValid;

						return (
							<Field data-invalid={isInvalid}>
								<FieldLabel htmlFor={field.name} className='font-bold text-sm'>
									Teléfono: <span className='text-[#D4183D]'>*</span>
								</FieldLabel>
								<Input
									id={field.name}
									name={field.name}
									value={field.state.value}
									onBlur={field.handleBlur}
									onChange={(e) => field.handleChange(e.target.value)}
									aria-invalid={isInvalid}
									placeholder='+1 (555) 123-4567'
								/>
								{isInvalid && <FieldError errors={field.state.meta.errors} />}
							</Field>
						);
					}}
				/>
				<form.Field
					name='bussiness'
					children={(field) => {
						const isInvalid =
							field.state.meta.isTouched && !field.state.meta.isValid;

						return (
							<Field data-invalid={isInvalid}>
								<FieldLabel htmlFor={field.name} className='font-bold text-sm'>
									Compañía/nombre de la marca:
								</FieldLabel>
								<Input
									id={field.name}
									name={field.name}
									value={field.state.value ?? ""}
									onBlur={field.handleBlur}
									onChange={(e) => field.handleChange(e.target.value)}
									aria-invalid={isInvalid}
								/>
								{isInvalid && <FieldError errors={field.state.meta.errors} />}
							</Field>
						);
					}}
				/>
			</div>
			<form.Field
				name='bussinessType'
				children={(field) => {
					const isInvalid =
						field.state.meta.isTouched && !field.state.meta.isValid;

					return (
						<Field data-invalid={isInvalid}>
							<FieldLabel htmlFor={field.name} className='font-bold text-sm'>
								Compañía/nombre de la marca:
							</FieldLabel>
							<Select
								name={field.name}
								value={field.state.value ?? ""}
								onValueChange={field.handleChange}
							>
								<SelectTrigger
									aria-invalid={isInvalid}
									className='min-w-[120px]'
								>
									<SelectValue placeholder='Tipo de negocio' />
								</SelectTrigger>
								<SelectContent position='item-aligned'>
									<SelectItem value='venta_minorista'>
										Venta minorista
									</SelectItem>
									<SelectItem value='venta_mayorista'>
										Venta mayorista
									</SelectItem>
									<SelectItem value='fabricante'>Fabricante</SelectItem>
									<SelectItem value='distribuidor'>Distribuidor</SelectItem>
									<SelectItem value='otro'>Otro</SelectItem>
								</SelectContent>
							</Select>
							{isInvalid && <FieldError errors={field.state.meta.errors} />}
						</Field>
					);
				}}
			/>
			<form.Field
				name='interestAreas'
				mode='array'
				children={(field) => {
					const isInvalid =
						field.state.meta.isTouched && !field.state.meta.isValid;

					return (
						<FieldSet>
							<FieldLegend
								variant='label'
								className='font-bold text-sm mb-3 inline-block'
							>
								Areá de interes
							</FieldLegend>
							<FieldGroup
								data-slot='interest-areas'
								className='flex flex-col gap-3'
							>
								{interestAreasOptions.map((area) => (
									<Field
										key={area.value}
										orientation='horizontal'
										data-invalid={isInvalid}
									>
										<Checkbox
											id={area.value}
											name={field.name}
											aria-invalid={isInvalid}
											checked={field.state.value.includes(area.value)}
											onCheckedChange={(checked) => {
												if (checked) {
													field.pushValue(area.value);
												} else {
													const index = field.state.value.indexOf(area.value);
													if (index > -1) {
														field.removeValue(index);
													}
												}
											}}
										/>
										<FieldLabel
											className='font-bold text-sm'
											htmlFor={area.value}
										>
											{area.label}
										</FieldLabel>
									</Field>
								))}
							</FieldGroup>
							{isInvalid && <FieldError errors={field.state.meta.errors} />}
						</FieldSet>
					);
				}}
			/>
			<form.Field
				name='requeriments'
				children={(field) => {
					const isInvalid =
						field.state.meta.isTouched && !field.state.meta.isValid;

					return (
						<Field data-invalid={isInvalid}>
							<FieldLabel htmlFor={field.name} className='font-bold text-sm'>
								Requisitos de tamaño o espacio preferidos
							</FieldLabel>
							<Input
								id={field.name}
								name={field.name}
								value={field.state.value}
								onBlur={field.handleBlur}
								onChange={(e) => field.handleChange(e.target.value)}
								aria-invalid={isInvalid}
								autoComplete='off'
								placeholder='Por ejemplo, 1000 pies cuadrados, ubicación en esquina'
							/>
							{isInvalid && <FieldError errors={field.state.meta.errors} />}
						</Field>
					);
				}}
			/>
			<form.Field
				name='description'
				children={(field) => {
					const isInvalid =
						field.state.meta.isTouched && !field.state.meta.isValid;

					return (
						<Field data-invalid={isInvalid}>
							<FieldLabel htmlFor={field.name} className='font-bold text-sm'>
								Describe tu proyecto
							</FieldLabel>
							<Textarea
								id={field.name}
								name={field.name}
								value={field.state.value}
								onBlur={field.handleBlur}
								onChange={(e) => field.handleChange(e.target.value)}
								aria-invalid={isInvalid}
								autoComplete='off'
								placeholder='Cuéntanos sobre tu negocio y lo que buscas...'
								rows={4}
							/>
							{isInvalid && <FieldError errors={field.state.meta.errors} />}
						</Field>
					);
				}}
			/>
			<form.Field
				name='methodContact'
				children={(field) => {
					const isInvalid =
						field.state.meta.isTouched && !field.state.meta.isValid;

					return (
						<FieldSet>
							<FieldLegend
								variant='label'
								className='font-bold text-sm mb-3 inline-block'
							>
								Método de contacto preferido
							</FieldLegend>

							<RadioGroup
								name={field.name}
								value={field.state.value}
								onValueChange={field.handleChange}
								className='flex items-center justify-start gap-6'
							>
								{methodContactOptions.map((method) => (
									<Field
										orientation='horizontal'
										key={method.value}
										data-invalid={isInvalid}
										className='w-fit flex'
									>
										<RadioGroupItem
											value={method.value}
											id={method.value}
											aria-invalid={isInvalid}
											className='h-4 w-4'
										/>
										<FieldLabel htmlFor={method.value} className='text-sm'>
											{method.label}
										</FieldLabel>
									</Field>
								))}
							</RadioGroup>
							{isInvalid && <FieldError errors={field.state.meta.errors} />}
						</FieldSet>
					);
				}}
			/>
			<form.Field
				name='wantVisit'
				children={(field) => {
					const isInvalid =
						field.state.meta.isTouched && !field.state.meta.isValid;

					return (
						<FieldGroup className='gap-1'>
							<Field orientation='horizontal' data-invalid={isInvalid}>
								<Checkbox
									id='wantVisit'
									name={field.name}
									aria-invalid={isInvalid}
									checked={field.state.value}
									onCheckedChange={(checked) => field.handleChange(!!checked)}
								/>
								<FieldLabel className='font-bold text-sm' htmlFor='wantVisit'>
									Quiero programar una visita al centro comercial
								</FieldLabel>
							</Field>
							{isInvalid && <FieldError errors={field.state.meta.errors} />}
						</FieldGroup>
					);
				}}
			/>
			<form.Field
				name='agreeTerms'
				children={(field) => {
					const isInvalid =
						field.state.meta.isTouched && !field.state.meta.isValid;

					return (
						<FieldGroup className='gap-1'>
							<Field orientation='horizontal' data-invalid={isInvalid}>
								<Checkbox
									id='agreeTerms'
									name={field.name}
									aria-invalid={isInvalid}
									checked={field.state.value}
									onCheckedChange={(checked) => field.handleChange(!!checked)}
								/>
								<FieldLabel className='font-bold text-sm' htmlFor='agreeTerms'>
									Acepto ser contactado por ValHui y acepto la política de
									privacidad.
									<span className='text-[#D4183D]'>*</span>
								</FieldLabel>
							</Field>
							{isInvalid && <FieldError errors={field.state.meta.errors} />}
						</FieldGroup>
					);
				}}
			/>

			<form.Subscribe
				selector={(state) => [state.isSubmitting, state.canSubmit]}
			>
				{([isSubmitting, canSubmit]) => (
					<Button
						type='submit'
						className='h-12'
						disabled={!canSubmit || isSubmitting}
					>
						{isSubmitting ? <Spinner /> : null}
						{isSubmitting ? " Enviando..." : "Enviar mensaje"}
					</Button>
				)}
			</form.Subscribe>
		</form>
	);
}
