import type { ContactFormType } from "../schemas/contact";

class ContactService {
	async sendMessage({ email }: ContactFormType): Promise<string> {
		try {
			const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

			if (!emailRegex.test(email)) {
				throw new Error("Invalid email format.");
			}

			return await new Promise<string>((resolve) => {
				setTimeout(() => {
					return resolve(email);
				}, 1000);
			});
		} catch (_error) {
			throw new Error("Failed to send contact message.");
		}
	}
}

export const contact = new ContactService();
