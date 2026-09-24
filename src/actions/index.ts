import { Configuration, SendApi, type V1SendRequest } from 'hostinger-mail-api-sdk';
import { defineAction } from "astro:actions";
import { HOSTINGER_MAIL_API_TOKEN, HOSTINGER_USER, HOSTINGER_RESOURCE_ID, HOSTINGER_FROM_EMAIL, HOSTINGER_DISPLAY_NAME } from "astro:env/server";
import { z } from "astro/zod";

// const resend = new Resend(RESEND_API_KEY);

const configuration = new Configuration({
    accessToken: HOSTINGER_MAIL_API_TOKEN,
});

const sender = new SendApi(configuration);



export const server = {
    sendMail: defineAction({
        accept: "form",
        input: z.object({
            name: z.string().min(1, "Name is required"),
            email: z.email("Invalid email"),
            message: z.string().optional(),
        }),
        handler: async (input, context) => {
            try {
                console.log({
                    host: context.request.headers.get("host"),
                    forwardedHost: context.request.headers.get("x-forwarded-host"),
                    origin: context.request.headers.get("origin"),
                    referer: context.request.headers.get("referer"),
                });
                const { name, email, message = "" } = input;

                const request = {} as V1SendRequest;
                request.to = ["steven.maslyk@gmail.com"];
                request.subject = "test subject";
                request.text = message;
                request.displayName = HOSTINGER_DISPLAY_NAME;


                await sender.sendEmail(HOSTINGER_RESOURCE_ID, request);


                /*         await resend.emails.send({
                          from: FROM_EMAIL,
                          to: TO_EMAIL,
                          subject: `New contact message from ${name}`,
                          html: `
                            <h2>New contact message</h2>
                            <p><strong>Name:</strong> ${name}</p>
                            <p><strong>Email:</strong> ${email}</p>
                            <h3>Message:</h3>
                            <p>${message.replace(/\n/g, "<br>")}</p>
                          `,
                        });
                 */
                return { success: true, message: "E-mail sent successfully ✅" };
            } catch (error) {
                return {
                    success: false,
                    message: error instanceof Error ? error.stack : String(error),
                };
            }
        },
    }),
};