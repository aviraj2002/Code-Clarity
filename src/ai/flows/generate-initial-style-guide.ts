'use server';

/**
 * @fileOverview Generates an initial code style guide from a prompt.
 *
 * - generateInitialStyleGuide - A function that handles the generation of the initial style guide.
 * - GenerateInitialStyleGuideInput - The input type for the generateInitialStyleGuide function.
 * - GenerateInitialStyleGuideOutput - The return type for the generateInitialStyleGuide function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateInitialStyleGuideInputSchema = z.object({
  programmingLanguage: z
    .string()
    .describe('The programming language for which to generate a style guide.'),
  projectName: z.string().optional().describe('The name of the project.'),
  additionalInstructions: z
    .string()
    .optional()
    .describe(
      'Any additional instructions or preferences for the style guide.'
    ),
});
export type GenerateInitialStyleGuideInput = z.infer<
  typeof GenerateInitialStyleGuideInputSchema
>;

const GenerateInitialStyleGuideOutputSchema = z.object({
  styleGuide: z
    .string()
    .describe('The generated code style guide in markdown format.'),
});
export type GenerateInitialStyleGuideOutput = z.infer<
  typeof GenerateInitialStyleGuideOutputSchema
>;

export async function generateInitialStyleGuide(
  input: GenerateInitialStyleGuideInput
): Promise<GenerateInitialStyleGuideOutput> {
  return generateInitialStyleGuideFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateInitialStyleGuidePrompt',
  input: {schema: GenerateInitialStyleGuideInputSchema},
  output: {schema: GenerateInitialStyleGuideOutputSchema},
  prompt: `You are an expert in creating code style guides. Generate a code style guide in markdown format for the {{programmingLanguage}} programming language.

  Include sections on:
  - Naming conventions
  - Formatting
  - Comments
  - Error handling
  - Security

  Project Name: {{projectName}}
  Additional Instructions: {{additionalInstructions}}
  `,
});

const generateInitialStyleGuideFlow = ai.defineFlow(
  {
    name: 'generateInitialStyleGuideFlow',
    inputSchema: GenerateInitialStyleGuideInputSchema,
    outputSchema: GenerateInitialStyleGuideOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
