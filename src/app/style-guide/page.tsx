'use client';

import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { LoaderCircle, FileText } from 'lucide-react';

import { PageHeader } from '@/components/page-header';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { generateStyleGuide } from './actions';
import { Skeleton } from '@/components/ui/skeleton';

const styleGuideFormSchema = z.object({
  language: z
    .string()
    .min(1, { message: 'Please enter a programming language.' }),
  projectName: z.string().optional(),
  instructions: z.string().optional(),
});

type StyleGuideFormValues = z.infer<typeof styleGuideFormSchema>;

type GuideResult =
  | { success: true; guide: string }
  | { success: false; error: string };

export default function StyleGuidePage() {
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState<GuideResult | null>(null);
  const { toast } = useToast();

  const form = useForm<StyleGuideFormValues>({
    resolver: zodResolver(styleGuideFormSchema),
    defaultValues: { language: '', projectName: '', instructions: '' },
  });

  const onSubmit = (data: StyleGuideFormValues) => {
    setResult(null);
    startTransition(async () => {
      const guideResult = await generateStyleGuide({
        programmingLanguage: data.language,
        projectName: data.projectName,
        additionalInstructions: data.instructions,
      });

      if (!guideResult.success) {
        toast({
          variant: 'destructive',
          title: 'Generation Failed',
          description: guideResult.error,
        });
      }
      setResult(guideResult);
    });
  };

  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        title="Style Guide Generator"
        description="Create a consistent code style guide for your project using AI."
      />
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Configuration</CardTitle>
            <CardDescription>
              Provide details to generate your style guide.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="language"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Programming Language</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., TypeScript, Python" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="projectName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Project Name (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., CodeClarity" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="instructions"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Additional Instructions (Optional)</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="e.g., Use 2 spaces for indentation, camelCase for variables."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" disabled={isPending}>
                  {isPending && (
                    <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Generate Guide
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Generated Style Guide</CardTitle>
            <CardDescription>
              Your AI-generated guide in Markdown format.
            </CardDescription>
          </CardHeader>
          <CardContent className="min-h-[400px]">
            {isPending && (
              <div className="space-y-2">
                <Skeleton className="h-4 w-4/5" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-4/5" />
                <Skeleton className="h-4 w-full" />
              </div>
            )}
            {!isPending && !result && (
              <div className="flex h-full flex-col items-center justify-center rounded-lg border-2 border-dashed p-12 text-center">
                <FileText className="mx-auto h-12 w-12 text-muted-foreground" />
                <h3 className="mt-4 text-lg font-semibold">
                  Your guide will appear here
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Fill out the form to generate a new style guide.
                </p>
              </div>
            )}
            {result && result.success && (
              <div className="prose prose-sm dark:prose-invert max-w-none rounded-md border bg-muted/50 p-4">
                <pre className="whitespace-pre-wrap bg-transparent p-0 font-body text-sm">{result.guide}</pre>
              </div>
            )}
             {result && !result.success && (
                 <div className="flex h-full flex-col items-center justify-center rounded-lg border-2 border-dashed border-destructive/50 bg-destructive/10 p-12 text-center">
                  <h3 className="mt-4 text-lg font-semibold text-destructive">
                    Generation Failed
                  </h3>
                  <p className="mt-1 text-sm text-destructive/80">
                    {result.error}
                  </p>
                </div>
              )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
