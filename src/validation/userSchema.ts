import vine from "@vinejs/vine";

const registerSchema = vine.object({
  username: vine
    .string()
    .regex(/^[a-z0-9\-_.]+$/)
    .minLength(3)
    .maxLength(32),
  email: vine.string().email(),
  name: vine.string().minLength(3).maxLength(32),
  password: vine.string().minLength(8).maxLength(32).confirmed(),
});

const loginSchema = vine.object({
  email: vine.string().email(),
  password: vine.string(),
});

export { registerSchema, loginSchema };
