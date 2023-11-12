import vine from "@vinejs/vine";

const registerSchema = vine.object({
  username: vine
    .string()
    // .regex(/^[a-zA-Z0-9\-_.]+$/)
    .minLength(3)
    .maxLength(32),
  email: vine.string().email(),
  name: vine.string().minLength(3).maxLength(32),
  password: vine.string().minLength(8).maxLength(32).confirmed(),
});

export default registerSchema;
