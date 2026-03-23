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
  // 先打印原始响应排查
console.log("status:", res.status);
console.log("content-type:", res.headers.get("content-type"));

// 判断是否是 JSON 再解析
if (!res.ok) {
  const text = await res.text();
  console.log("错误响应内容:", text);  // ← 看这里，知道后端返回了什么
  return NextResponse.json({ error: text }, { status: res.status });
}

const data = await res.json();
}
