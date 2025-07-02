export interface MembershipPlan {
  id: number;
  name: string;
  price: number;
  description?: string;
  benefits?: { feature: string; included: boolean }[];
}