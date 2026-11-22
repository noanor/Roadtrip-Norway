import type { BusinessRegistration, Review } from '../types';
import { REVIEWS } from '../data/reviews';

// Boundary to the future backend. Every call is async so pages don't change when the mock
// is replaced by real HTTP requests. Nothing here leaves the browser yet.

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function getReviews(stopId: string): Promise<Review[]> {
  await delay(150);
  return REVIEWS[stopId] ?? [];
}

export async function askOwner(stopId: string, question: string): Promise<void> {
  await delay(400);
  console.info('[mock api] askOwner', { stopId, question });
}

/** How long the mock owner takes to answer. */
export const OWNER_ANSWER_DELAY_MS = 4000;

/**
 * Waits for the owner's answer. Mock: a friendly reply after a few seconds. With a backend this becomes a
 * push notification or a poll for new messages.
 */
export async function waitForOwnerAnswer(stopId: string, stopName: string, question: string): Promise<string> {
  await delay(OWNER_ANSWER_DELAY_MS);
  console.info('[mock api] owner answered', { stopId, question });
  return `Hei, og takk for spørsmålet! Ring oss gjerne før dere kommer, så sjekker vi det for dere. Hilsen ${stopName}`;
}

export async function registerBusiness(registration: BusinessRegistration): Promise<{ id: string }> {
  await delay(600);
  console.info('[mock api] registerBusiness', registration);
  return { id: `biz_${Date.now()}` };
}
