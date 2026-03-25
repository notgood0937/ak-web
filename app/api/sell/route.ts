import { NextRequest, NextResponse } from "next/server";

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const isSubAccountSell = Boolean(body.sonId);
  const endpoint = isSubAccountSell ? "ACE_Sell_Son" : "ACE_Sell";
  const version = isSubAccountSell ? "2077" : "2088";
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
    v: version,
    lang: "cn",
  });
  console.log("出售请求接口", endpoint);
  console.log("出售请求参数", Object.fromEntries(params.entries()));
  try {
    const res = await fetch(`https://www.akapi1.com/RPC/${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        accept: "*/*",
      },
      signal: AbortSignal.timeout(4_000), // ← 4秒超时，5秒间隔内必须结束
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
    console.log("出售响应数据", data);
    return NextResponse.json(data);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "服务器错误" }, { status: 500 }); // ← return
  }
}
