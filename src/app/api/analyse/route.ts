import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { code } = await req.json();

    if (!code) {
      return NextResponse.json(
        { error: "No code provided" },
        { status: 400 }
      );
    }

    // Dummy response — AI ke jagah abhi static output de raha hai
    return NextResponse.json(
      {
        summary: "Code reviewed successfully!",
        suggestions: [
          "Use consistent formatting.",
          "Remove unused variables.",
          "Add error handling.",
        ],
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Server Error" },
      { status: 500 }
    );
  }
}
