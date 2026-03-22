import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const params = new URLSearchParams({
    amount: "",
    password: body.password ?? "",
    sonId: body.sonId ?? "",
    mnemonicid1: body.mnemonicid1,
    mnemonickey: body.mnemonickey,
    mnemonicstr1: body.mnemonicstr1,
    gCode: body.gCode,
    count: body.amount,
    key: body.key,
    UserID: body.UserID,
    v: "2088",
    lang: "cn",
  });
  console.log("出售请求参数", Object.fromEntries(params.entries()));

  const res = await fetch("https://www.akapi1.com/RPC/ACE_Sell", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      accept: "*/*",
    },
    body: params.toString(),
  });

  const data = await res.json();
  console.log("出售响应", data);
  return NextResponse.json(data);
}
