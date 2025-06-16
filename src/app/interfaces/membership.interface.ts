export interface Membership {
    id: number;
    name: string;
    price: number;
    description: string;
    benefits: feature[];
    isActive: boolean;
    createdAt?: Date;
    updatedAt?: Date;

}

interface feature {
    feature: string;
    included: boolean;
}