export interface Membership {
    id: number;
    name: string;
    price: number;
    duration_month: number;
    description: string;
    benefits: feature[];
    monthly_payment_status: boolean;
    isActive: boolean;
    createdAt?: Date;
    updatedAt?: Date;

}

interface feature {
    feature: string;
    included: boolean;
}