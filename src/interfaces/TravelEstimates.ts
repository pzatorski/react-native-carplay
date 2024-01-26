export type DistanceUnits = 'meters' | 'miles' | 'kilometers' | 'yards' | 'feet';

export interface TravelEstimates {
  /**
   * Distance remaining, setting it to a negative number will put the timeRemaining in the maneuver
   */
  distanceRemaining: number;
  /**
   * Time remaining in seconds
   */
  timeRemaining: number;
  /**
   * unit of measurement for the
   * distance, defaults to kilometer
   */
  distanceUnits?: DistanceUnits;
}
