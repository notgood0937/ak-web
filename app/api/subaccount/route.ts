import { NextRequest, NextResponse } from "next/server";

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { key, UserID } = body;

    if (!key || !UserID) {
      return NextResponse.json({ error: "Missing key or UserID" }, { status: 400 });
    }

    let allSubAccounts: any[] = [];
    let page = 1;
    let hasMore = true;
    const pageSize = 15; // 根据用户反馈，后端似乎固定返回15

    while (hasMore && page <= 5) { // 最多获取10页，避免无限循环
      const params = new URLSearchParams({
        p: String(page),
        size: "15",
        key: key,
        UserID: UserID,
        v: "2087",
        lang: "cn",
      });

      console.log(`获取子账户第 ${page} 页请求参数`, Object.fromEntries(params.entries()));

      const res = await fetch("https://www.akapi1.com/RPC/My_Subaccount", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          accept: "*/*",
        },
        body: params.toString(),
      });

      if (!res.ok) {
        const text = await res.text();
        console.log(`获取子账户第 ${page} 页错误响应:`, text);
        break; // 出错则停止获取更多
      }

      const data = await res.json();
      const list = data.Data?.List || [];
      allSubAccounts = [...allSubAccounts, ...list];

      // 如果返回的列表数量小于 pageSize，说明没有更多页了
      // 或者如果列表为空，也停止
      if (list.length < pageSize || list.length === 0) {
        hasMore = false;
      } else {
        page++;
      }
    }

    console.log(`共获取到 ${allSubAccounts.length} 个子账户`);

    // 构造一个与原接口结构类似的返回对象
    return NextResponse.json({
      Error: false,
      Data: {
        List: allSubAccounts,
        PageSize: allSubAccounts.length,
        Count: allSubAccounts.length
      }
    });

  } catch (e) {
    console.error("获取子账户异常:", e);
    return NextResponse.json({ error: "服务器错误" }, { status: 500 });
  }
}
