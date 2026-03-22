import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  console.log("登录请求体", body);
  const params = new URLSearchParams({
    account: body.account,
    password: body.password,
    client: "WEB",
    key: "123",
    UserID: "123",
    v: "2084",
    lang: "cn",
  });

  const res = await fetch("https://www.akapi1.com/RPC/Login", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      accept: "*/*",
    },
    body: params.toString(),
  });
  const text = await res.text();
  console.log("登录接口返回原始文本:", text);

  const data = JSON.parse(text);
  return NextResponse.json(data);
}
