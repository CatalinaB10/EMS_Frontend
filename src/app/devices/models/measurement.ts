import { UUID } from "crypto";

export interface Measurement {
  id: number;
  value: number;
  deviceId: string;
  timestamp: Date;
}
