import { NextRequest, NextResponse } from "next/server";

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const params = new URLSearchParams({
    key: body.key,
    UserID: body.UserID,
    v: "2086",
    lang: "cn",
  });

  const res = await fetch("https://www.akapi1.com/RPC/Mnemonic_Get01", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      accept: "*/*",
    },
    body: params.toString(),
  });

  const data = await res.json();
  console.log("助记词响应", data);
  return NextResponse.json(data);
}
