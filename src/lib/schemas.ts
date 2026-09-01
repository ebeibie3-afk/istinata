import { z } from 'zod';

export const RegionStatsSchema = z.object({
  deficitMillions: z.number().nonnegative().optional(),
  unauthorizedContracts: z.number().nonnegative().optional(),
  signalsCount: z.number().nonnegative().optional(),
  auditsCount: z.number().nonnegative().optional(),
  trendYears: z.array(z.string()).optional(),
  trendDeficit: z.array(z.number()).optional(),
});

export type ValidatedRegionStats = z.infer<typeof RegionStatsSchema>;

export const GeoFeatureSchema = z.object({
  type: z.literal('Feature'),
  properties: z.record(z.string(), z.any()),
  geometry: z.object({
    type: z.string(),
    coordinates: z.any(),
  }),
});

export const GeoFeatureCollectionSchema = z.object({
  type: z.literal('FeatureCollection'),
  features: z.array(GeoFeatureSchema),
});

export function validateGeoData(data: unknown) {
  const result = GeoFeatureCollectionSchema.safeParse(data);
  if (!result.success) {
    console.warn('[Zod Validation Warning] Invalid GeoJSON structure:', result.error);
    return null;
  }
  return result.data;
}

export function validateRegionStats(data: unknown): ValidatedRegionStats {
  const result = RegionStatsSchema.safeParse(data);
  if (!result.success) {
    console.warn('[Zod Validation Warning] Invalid Region Stats:', result.error);
    return {
      deficitMillions: 0,
      unauthorizedContracts: 0,
      signalsCount: 0,
      auditsCount: 0,
    };
  }
  return result.data;
}
