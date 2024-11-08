import { UUID } from "crypto";

export interface Device{
    id: UUID,
    description: string,
    address?: string,
    maxEnergyConsumption?: number,
    userId?: UUID
}
