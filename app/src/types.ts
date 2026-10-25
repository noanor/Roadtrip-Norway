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
  recommended?: boolean;
  location: LatLng;
}

export interface DayPlan {
  day: number;
  title: string;
  km: number;
  driveTime: string;
  stops: string[];
  suggestions: string[];
}

export interface RouteTemplate {
  id: string;
  from: string;
  to: string;
  days: DayPlan[];
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
