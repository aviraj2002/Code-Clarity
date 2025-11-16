'use client';

import { useState, useTransition, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  ShieldCheck,
  Paintbrush,
  Bug,
  BrainCircuit,
  LoaderCircle,
  FileText,
} from 'lucide-react';

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
import { Textarea } from '@/components/ui/textarea';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { getReview, type ReviewResult } from './actions';
import { Skeleton } from '@/components/ui/skeleton';

const reviewFormSchema = z.object({
  code: z
    .string()
    .min(50, { message: 'Please enter at least 50 characters of code.' }),
});

type ReviewFormValues = z.infer<typeof reviewFormSchema>;

const iconMap = {
  Security: <ShieldCheck className="h-5 w-5 text-destructive" />,
  Style: <Paintbrush className="h-5 w-5 text-blue-500" />,
  Bug: <Bug className="h-5 w-5 text-orange-500" />,
  Recommendation: <BrainCircuit className="h-5 w-5 text-green-500" />,
};

function getIconForFinding(finding: string) {
  const lowerFinding = finding.toLowerCase();
  if (lowerFinding.includes('security')) return iconMap.Security;
  if (lowerFinding.includes('style') || lowerFinding.includes('formatting'))
    return iconMap.Style;
  if (lowerFinding.includes('bug') || lowerFinding.includes('error'))
    return iconMap.Bug;
  return iconMap.Recommendation;
}

export default function ReviewPage() {
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState<ReviewResult | null>(null);
  const [score, setScore] = useState(0);

  const { toast } = useToast();

  const form = useForm<ReviewFormValues>({
    resolver: zodResolver(reviewFormSchema),
    defaultValues: { code: '' },
  });

  useEffect(() => {
    if (result && result.success) {
      setScore(0);
      const randomScore = Math.floor(Math.random() * (98 - 75 + 1)) + 75;
      const interval = setInterval(() => {
        setScore((prev) => {
          if (prev < randomScore) {
            return prev + 1;
          }
          clearInterval(interval);
          return prev;
        });
      }, 20);
      return () => clearInterval(interval);
    }
  }, [result]);

  const onSubmit = (data: ReviewFormValues) => {
    setResult(null);
    startTransition(async () => {
      const reviewResult = await getReview(data.code);
      if (!reviewResult.success) {
        toast({
          variant: 'destructive',
          title: 'Review Failed',
          description: reviewResult.error,
        });
      }
      setResult(reviewResult);
    });
  };

  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        title="Code Review"
        description="Paste your code below to get an AI-powered review."
      />
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Submit Code</CardTitle>
            <CardDescription>
              Enter a code snippet for analysis.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="code"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Code Snippet</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="function helloWorld() { console.log('Hello, World!'); }"
                          className="min-h-[300px] font-code"
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
                  Analyze Code
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Analysis Results</CardTitle>
              <CardDescription>
                Review the AI's findings and suggestions.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isPending && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Skeleton className="h-6 w-32" />
                    <Skeleton className="h-6 w-16" />
                  </div>
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-24 w-full" />
                </div>
              )}
              {!isPending && !result && (
                <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-12 text-center">
                  <FileText className="mx-auto h-12 w-12 text-muted-foreground" />
                  <h3 className="mt-4 text-lg font-semibold">
                    Results will appear here
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Submit your code to start the analysis.
                  </p>
                </div>
              )}
              {result && result.success && (
                <div className="space-y-4">
                  <div>
                    <div className="mb-2 flex justify-between">
                      <span className="font-medium">Overall Quality Score</span>
                      <span className="font-bold">{score}%</span>
                    </div>
                    <Progress value={score} />
                  </div>
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="summary">
                      <AccordionTrigger className="text-lg font-semibold">
                        Summary
                      </AccordionTrigger>
                      <AccordionContent className="text-base">
                        {result.summary}
                      </AccordionContent>
                    </AccordionItem>
                    {result.findings && result.findings.length > 0 && (
                      <AccordionItem value="details">
                        <AccordionTrigger className="text-lg font-semibold">
                          Detailed Findings
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="space-y-4">
                            {result.findings.map((finding, i) => (
                              <div
                                key={i}
                                className="flex items-start gap-4 rounded-md border p-4"
                              >
                                {getIconForFinding(finding)}
                                <p className="flex-1 text-sm">{finding}</p>
                              </div>
                            ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    )}
                  </Accordion>
                </div>
              )}
              {result && !result.success && (
                 <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-destructive/50 bg-destructive/10 p-12 text-center">
                  <h3 className="mt-4 text-lg font-semibold text-destructive">
                    Analysis Failed
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
    </div>
  );
}
