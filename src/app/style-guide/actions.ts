'use server';

import {
  generateInitialStyleGuide as generateGuide,
  GenerateInitialStyleGuideInput,
} from '@/ai/flows/generate-initial-style-guide';

type GuideResult =
  | { success: true; guide: string }
  | { success: false; error: string };

export async function generateStyleGuide(
  input: GenerateInitialStyleGuideInput
): Promise<GuideResult> {
  if (!input.programmingLanguage) {
    return { success: false, error: 'Programming language cannot be empty.' };
  }

  try {
    const response = await generateGuide(input);
    return {
      success: true,
      guide: response.styleGuide,
    };
  } catch (error) {
    console.error('Style guide generation failed:', error);
    return {
      success: false,
      error: 'An unexpected error occurred while generating the style guide.',
    };
  }
}
