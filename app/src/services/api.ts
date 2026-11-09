import type { BusinessRegistration, Review } from '../types';
import { SAMPLE_REVIEWS } from '../data/catalog';

// Boundary to the future backend. Every call is async so pages don't change when the mock
// is replaced by real HTTP requests. Nothing here leaves the browser yet.

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function getReviews(_stopId: string): Promise<Review[]> {
  await delay(150);
  return SAMPLE_REVIEWS;
}

export async function askOwner(stopId: string, question: string): Promise<void> {
  await delay(400);
  console.info('[mock api] askOwner', { stopId, question });
}

export async function registerBusiness(registration: BusinessRegistration): Promise<{ id: string }> {
  await delay(600);
  console.info('[mock api] registerBusiness', registration);
  return { id: `biz_${Date.now()}` };
}
