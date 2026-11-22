// Shared domain types. Shapes here are what a future backend API should return.

/** [latitude, longitude] */
export type LatLng = [number, number];

export type InterestId =
  | 'aktiv'
  | 'fasil'
  | 'natur'
  | 'historie'
  | 'mat'
  | 'overnatting'
  | 'bade'
  | 'familie';

export type ArtKind =
  | 'cabin'
  | 'church'
  | 'glass'
  | 'mine'
  | 'museum'
  | 'mount'
  | 'falls'
  | 'lake'
  | 'wharf'
  | 'glassworks'
  | 'sculpt'
  | 'harbor';

export type Vehicle = 'Bil' | 'MC' | 'Bobil' | 'Campingvogn';

export interface Stop {
  id: string;
  name: string;
  place: string;
  type: string;
  interest: InterestId;
  /** Illustration used until real photos exist. */
  art: ArtKind;
  /** Short travel hint, e.g. "1 t 10 min fra Oslo". */
  travelHint: string;
  rating: number;
  reviewCount: number;
  openingHours: string;
  distanceFromRoute: string;
  price: string;
  description: string;
  /** Paid placement (the «Fremhevet stopp» plan). Always shown to travellers as «Annonse». */
  sponsored?: boolean;
  /** Serves food you can sit down for (lunch, café). */
  serving?: boolean;
  /** Vehicles the stop does not suit, e.g. a narrow road or no parking for a motorhome. */
  notFor?: Vehicle[];
  location: LatLng;
}

export interface DayPlan {
  day: number;
  /** Where the day starts and where the night is spent. */
  from: string;
  to: string;
  toLocation: LatLng;
  /** Fallback numbers, used until the routing service has answered. */
  km: number;
  minutes: number;
  stops: string[];
  suggestions: string[];
}

export interface RouteTemplate {
  id: string;
  from: string;
  to: string;
  fromLocation: LatLng;
  toLocation: LatLng;
  /** Made by the app along the road (see domain/autoRoute.ts), not a hand-picked trip. */
  auto?: boolean;
  days: DayPlan[];
}

/** An owner's answer to a question the traveller asked on a stop's page. */
export interface AppNotification {
  id: string;
  stopId: string;
  question: string;
  answer: string;
  /** ISO time the answer arrived. */
  at: string;
  read: boolean;
}

/** Prototype sign-in: kept on this device only, until a real backend exists. */
export interface Profile {
  name: string;
  email: string;
}

export interface Review {
  author: string;
  initials: string;
  rating: number;
  text: string;
}

export interface ExploreRoute {
  title: string;
  subtitle: string;
  art: ArtKind;
  from: string;
  to: string;
  days: number;
}

export type BusinessPlanId = 'synlig' | 'fremhevet' | 'partner';

export interface BusinessPlan {
  id: BusinessPlanId;
  title: string;
  description: string;
  price: string;
  tag?: string;
}

export interface BusinessRegistration {
  name: string;
  type: string;
  place: string;
  plan: BusinessPlanId;
}
