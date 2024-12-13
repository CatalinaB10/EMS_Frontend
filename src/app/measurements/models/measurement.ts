import { UUID } from "crypto";

export interface Measurement {
  timestamp: string;
  value: number;
  deviceId: UUID;
}
