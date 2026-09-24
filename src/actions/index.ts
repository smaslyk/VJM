import { Configuration, SendApi, type V1SendRequest } from 'hostinger-mail-api-sdk';
import { defineAction } from "astro:actions";
import { HOSTINGER_MAIL_API_TOKEN, HOSTINGER_USER, HOSTINGER_RESOURCE_ID, HOSTINGER_FROM_EMAIL, HOSTINGER_DISPLAY_NAME } from "astro:env/server";
import { z } from "astro/zod";

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