import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { letters } from "~/server/db/schema";
import { Anthropic } from "@anthropic-ai/sdk";
import { db } from "~/server/db";

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });


export const santaRouter = createTRPCRouter({
    sendLetter: publicProcedure.input(z.object({
        childLetterText: z.string().min(10),
    })).mutation(async ({ input }) => {
        const childLetter = input.childLetterText;
        const timestamp = new Date().toISOString();

        const systemPrompt = `You are Santa Claus responding to a child's letter. Keep the response cheerful, warm, and encouraging, but not too long (max 3 sentences). The date and time is now ${timestamp}.`

        const userPrompt = `${childLetter}`

        try {
            const response = await anthropic.messages.create({
                model: "claude-3-5-sonnet-latest",
                max_tokens: 1024,
                temperature: 0.7,
                system: systemPrompt,
                messages: [{ role: "user", content: userPrompt }],
        });

        if (!response.content?.[0] || !('text' in response.content[0])) {
            throw new Error("Invalid response from AI");
        }

        const santaResponse = response.content[0].text;
        console.log(santaResponse);
        await db.insert(letters).values({
                childLetterText: childLetter,
                santaResponseText: santaResponse,
            });
            return { success: true, santaResponse: santaResponse };
        
        } catch (error) {
            console.error("Error sending letter:", error);
            throw new Error("Failed to send letter");
        }
        
    }),
    
});
