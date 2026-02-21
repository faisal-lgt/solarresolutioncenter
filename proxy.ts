import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { connectToDB } from "@/app/services/db";
import Redirect from "@/app/models/Redirects";

import list from "@/app/data/destinations";
import { isDestinationOnline } from "@/app/utils/destinations";

export async function proxy(request: NextRequest) {
    const { search, searchParams } = new URL(request.url);
    const fbclid = searchParams.get("fbclid");

    await connectToDB();
    const lastRedirect = await Redirect.findOne().sort({ createdAt: -1 });

    const onlineDestination = list.filter(isDestinationOnline);
    const destinations = onlineDestination.filter(destination => {
        if (!lastRedirect) return true;
        return destination.name !== lastRedirect.name;
    });

    const [destination] = destinations.length ? destinations : onlineDestination;
    const { name, url, params = {} } = destination;

    const destinationURL = new URL(url + search);

    Object.entries(params).forEach(([key, value]) => {
        destinationURL.searchParams.set(key, value);
    });

    if ( fbclid ) {
        const creationTime = Date.now();
        const fbc = `fb.1.${creationTime}.${fbclid}`;
        destinationURL.searchParams.set("s4", fbc);
    }

    await Redirect.insertOne({
        name,
        url: request.url,
        redirect: destinationURL.href,
    });

    return NextResponse.redirect(destinationURL);
}

export const config = {
    matcher: [
        "/((?!api|_next/static|_next/image|favicon.ico).*)",
    ],
}
