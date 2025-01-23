import { z } from "zod";

/**
 * Enum for influencer categories
 */
export const CategoryEnum = {
    Nutrition: "Nutrition",
    Fitness: "Fitness",
    Medicine: "Medicine",
    "Mental Health": "Mental Health",
    Neuroscience: "Neuroscience",
} as const;

/**
 * Enum for trend directions
 */
export const TrendEnum = {
    up: "up",
    down: "down",
} as const;

/**
 * Zod schema for expertise areas
 */
export const ExpertiseSchema = z.array(z.string());

/**
 * Zod schema for influencer data validation
 */
export const InfluencerSchema = z.object({
    // Basic Info
    id: z.string().uuid(),
    name: z.string().min(1),
    handler: z.string().min(1),
    image: z.string().url(),
    category: z.enum(["Nutrition", "Fitness", "Medicine", "Mental Health", "Neuroscience"]),
    bio: z.string(),

    // Stats
    rank: z.number().int().positive(),
    trustScore: z.number().min(0).max(100),
    followers: z.number().int().positive(),
    verifiedClaims: z.number().int().nonnegative(),
    trend: z.enum(["up", "down"]),

    // Financial & Products
    yearlyRevenue: z.number().positive().optional(),
    productCount: z.number().int().nonnegative(),

    // Areas of Expertise
    expertise: ExpertiseSchema,

    // Metadata
    lastUpdated: z.date(),
    createdAt: z.date(),
});

/**
 * TypeScript type derived from the Zod schema
 */
export type Influencer = z.infer<typeof InfluencerSchema>;

/**
 * Type for category values
 */
export type Category = keyof typeof CategoryEnum;

/**
 * Type for trend values
 */
export type Trend = keyof typeof TrendEnum;

/**
 * Type for expertise areas
 */
export type Expertise = z.infer<typeof ExpertiseSchema>;

/**
 * Type for sort options
 */
export type SortOption = "rank" | "followers" | "score";
