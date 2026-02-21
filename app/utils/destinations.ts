import {TDestination} from "@/app/types/TDestination";

export const isDestinationOnline = (destination: TDestination) => {
    if (!destination) return false;

    const [start, end] = destination.hours ?? [];
    if (!start || !end) return true;

    const hour = new Date().getHours();

    return hour >= start && hour < end;
};