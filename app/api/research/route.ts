import { NextResponse } from "next/server";
import { TwitterApi } from "twitter-api-v2";

// Initialize the client outside of the handler
const twitterClient = new TwitterApi(process.env.TWITTER_BEARER_TOKEN || "");
// Tell typescript it's a readonly app
const readOnlyClient = twitterClient.readOnly;

export async function POST(request: Request) {
    try {
        const { username } = await request.json();

        // Remove @ if present
        const cleanUsername = username.replace("@", "");

        // Get user data
        const user = await readOnlyClient.v2.userByUsername(cleanUsername, {
            "user.fields": ["description", "profile_image_url", "public_metrics"],
        });
        console.log(user);

        if (!user.data) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        // Get recent tweets
        const tweets = await readOnlyClient.v2.userTimeline(user.data.id, {
            max_results: 2,
        });
        console.log(tweets);
        return NextResponse.json({
            user: user.data,
            tweets: tweets.data,
        });
    } catch (error) {
        console.error("Twitter API error:", error);
        return NextResponse.json({ error: "Failed to fetch Twitter data" }, { status: 500 });
    }
}
