'use server';
/**
 * @fileOverview Summarizes code review findings to provide a quick understanding of key issues.
 *
 * - summarizeCodeReview - A function that summarizes code review findings.
 * - SummarizeCodeReviewInput - The input type for the summarizeCodeReview function.
 * - SummarizeCodeReviewOutput - The return type for the summarizeCodeReview function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeCodeReviewInputSchema = z.object({
  codeReviewFindings: z.string().describe('The code review findings to summarize.'),
});
export type SummarizeCodeReviewInput = z.infer<typeof SummarizeCodeReviewInputSchema>;

const SummarizeCodeReviewOutputSchema = z.object({
  summary: z.string().describe('A summary of the code review findings.'),
});
export type SummarizeCodeReviewOutput = z.infer<typeof SummarizeCodeReviewOutputSchema>;

export async function summarizeCodeReview(input: SummarizeCodeReviewInput): Promise<SummarizeCodeReviewOutput> {
  return summarizeCodeReviewFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeCodeReviewPrompt',
  input: {schema: SummarizeCodeReviewInputSchema},
  output: {schema: SummarizeCodeReviewOutputSchema},
  prompt: `You are a code review summarization expert.

  Please summarize the following code review findings, highlighting the key issues and potential areas of improvement.

  Code Review Findings:
  {{codeReviewFindings}}
  `,
});

const summarizeCodeReviewFlow = ai.defineFlow(
  {
    name: 'summarizeCodeReviewFlow',
    inputSchema: SummarizeCodeReviewInputSchema,
    outputSchema: SummarizeCodeReviewOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
