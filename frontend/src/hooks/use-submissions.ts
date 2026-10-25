'use client';

import { useCallback, useEffect, useState } from 'react';
import { api, isApiConfigured, type AuthUser, type Submission } from '@/lib/api-client';
import { makeId, readDemoSubmissions, resetDemoSubmissions, writeDemoSubmissions } from '@/lib/demo-data';

type NewSubmission = { projectName: string; githubUrl: string; liveDemoUrl?: string; description: string };

/**
 * Loads and mutates submissions.
 * - Demo sessions (or no API URL) use a small localStorage store, so a recruiter can submit as a
 *   student, switch to the mentor demo, review it, and see the result come back.
 * - Otherwise everything goes through the Express API.
 */
export function useSubmissions(user: AuthUser, isMentor: boolean) {
  const demo = Boolean(user.demo) || !isApiConfigured;
  const userId = user.id;
  const [items, setItems] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        let data: Submission[];
        if (demo) {
          await new Promise((resolve) => setTimeout(resolve, 350)); // let the skeleton show briefly
          const all = readDemoSubmissions();
          data = isMentor ? all : all.filter((item) => item.studentId === userId);
        } else {
          const response = isMentor ? await api.adminSubmissions('') : await api.mySubmissions();
          data = Array.isArray(response) ? response : response.items;
        }
        if (active) setItems(data);
      } catch (requestError) {
        if (active) setError(requestError instanceof Error ? requestError.message : 'Unable to load submissions.');
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => { active = false; };
  }, [demo, isMentor, userId]);

  const create = useCallback(async (input: NewSubmission) => {
    if (!demo) {
      const created = await api.createSubmission(input);
      setItems((current) => [created, ...current]);
      return created;
    }
    const created: Submission = {
      id: makeId(),
      ...input,
      liveDemoUrl: input.liveDemoUrl || undefined,
      status: 'pending',
      createdAt: new Date().toISOString(),
      studentId: userId,
      studentName: user.name,
      studentEmail: user.email,
    };
    writeDemoSubmissions([created, ...readDemoSubmissions()]);
    setItems((current) => [created, ...current]);
    return created;
  }, [demo, user.email, user.name, userId]);

  const review = useCallback(async (id: string, status: 'approved' | 'rejected', feedback: string) => {
    let updated: Submission | undefined;
    if (!demo) {
      updated = await api.review(id, { status, feedback });
    } else {
      const all = readDemoSubmissions().map((item) =>
        item.id === id
          ? { ...item, status, feedback: feedback.trim() || undefined, reviewerName: user.name, reviewedAt: new Date().toISOString() }
          : item
      );
      writeDemoSubmissions(all);
      updated = all.find((item) => item.id === id);
    }
    if (updated) {
      const next = updated;
      setItems((current) => current.map((item) => (item.id === id ? { ...item, ...next } : item)));
    }
    return updated;
  }, [demo, user.name]);

  const resetDemo = useCallback(() => {
    const seed = resetDemoSubmissions();
    setItems(isMentor ? seed : seed.filter((item) => item.studentId === userId));
  }, [isMentor, userId]);

  return { items, loading, error, demo, create, review, resetDemo };
}
