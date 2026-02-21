import { TDestination } from "@/app/types/TDestination";

export const list: TDestination[] = [
    {
        name: "emd",
        url: "https://track.edmleadnetwork.com",
        params: {
            c: "6650",
            pixelId: "1359467079289793",
        }
    },
    {
        name: "stonegate",
        url: "https://quiz.stonegateclaimcenter.com/stonegate-solar-relief",
        params: {
            oid: "18",
            affid: "39",

            c: "6650",
            pixelId: "1359467079289793",
        },
        hours: [7, 18]
    },
];

export default list;
