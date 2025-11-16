'use server';

import { summarizeCodeReview } from '@/ai/flows/summarize-code-review-findings';

export type ReviewResult =
  | { success: true; summary: string; findings: string[] }
  | { success: false; error: string };

export async function getReview(code: string): Promise<ReviewResult> {
  if (!code) {
    return { success: false, error: 'Code cannot be empty.' };
  }

  // Prepending context to guide the AI flow, as we cannot modify the flow itself.
  const promptForReview = `
    Please act as an expert code reviewer. Analyze the following code snippet for potential issues.
    Categorize your findings into "Security", "Bug", "Style", or "Recommendation".
    Provide a concise summary and then a list of detailed findings.

    Code to review:
    \`\`\`
    ${code}
    \`\`\`
  `;

  try {
    const response = await summarizeCodeReview({
      codeReviewFindings: promptForReview,
    });
    
    // The AI flow only returns a summary string. We'll parse it.
    const parts = response.summary.split(/\n-|\n\*/).map(s => s.trim()).filter(Boolean);
    const summary = parts[0] || "The AI provided a response, but it couldn't be parsed into a summary.";
    const findings = parts.slice(1);

    return {
      success: true,
      summary,
      findings,
    };
  } catch (error) {
    console.error('Code review failed:', error);
    return {
      success: false,
      error: 'An unexpected error occurred during the code review.',
    };
  }
}
