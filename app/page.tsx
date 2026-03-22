'use client'
import { useState, useRef, useCallback, useEffect } from 'react'

/* ── tiny md5 ── */
function md5(str: string): string {
  function safeAdd(x: number, y: number) { const lsw=(x&0xFFFF)+(y&0xFFFF); return (((x>>16)+(y>>16)+(lsw>>16))<<16)|(lsw&0xFFFF) }
  function bitRotL(num: number, cnt: number) { return (num<<cnt)|(num>>>(32-cnt)) }
  function md5cmn(q:number,a:number,b:number,x:number,s:number,t:number){return safeAdd(bitRotL(safeAdd(safeAdd(a,q),safeAdd(x,t)),s),b)}
  function ff(a:number,b:number,c:number,d:number,x:number,s:number,t:number){return md5cmn((b&c)|((~b)&d),a,b,x,s,t)}
  function gg(a:number,b:number,c:number,d:number,x:number,s:number,t:number){return md5cmn((b&d)|(c&(~d)),a,b,x,s,t)}
  function hh(a:number,b:number,c:number,d:number,x:number,s:number,t:number){return md5cmn(b^c^d,a,b,x,s,t)}
  function ii(a:number,b:number,c:number,d:number,x:number,s:number,t:number){return md5cmn(c^(b|(~d)),a,b,x,s,t)}
  function md5blks(s:string){const b:number[]=[]; for(let i=0;i<s.length*32;i+=8)b[i>>5]|=(s.charCodeAt(i/8)&0xFF)<<(i%32); b[s.length*8>>5]|=0x80<<(s.length*8%32); b[(((s.length*8+64)>>>9)<<4)+14]=s.length*8; return b}
  const x=md5blks(str);let a=1732584193,b=-271733879,c=-1732584194,d=271733878
  for(let i=0;i<x.length;i+=16){const[oa,ob,oc,od]=[a,b,c,d]
  a=ff(a,b,c,d,x[i],7,-680876936);d=ff(d,a,b,c,x[i+1],12,-389564586);c=ff(c,d,a,b,x[i+2],17,606105819);b=ff(b,c,d,a,x[i+3],22,-1044525330)
  a=ff(a,b,c,d,x[i+4],7,-176418897);d=ff(d,a,b,c,x[i+5],12,1200080426);c=ff(c,d,a,b,x[i+6],17,-1473231341);b=ff(b,c,d,a,x[i+7],22,-45705983)
  a=ff(a,b,c,d,x[i+8],7,1770035416);d=ff(d,a,b,c,x[i+9],12,-1958414417);c=ff(c,d,a,b,x[i+10],17,-42063);b=ff(b,c,d,a,x[i+11],22,-1990404162)
  a=ff(a,b,c,d,x[i+12],7,1804603682);d=ff(d,a,b,c,x[i+13],12,-40341101);c=ff(c,d,a,b,x[i+14],17,-1502002290);b=ff(b,c,d,a,x[i+15],22,1236535329)
  a=gg(a,b,c,d,x[i+1],5,-165796510);d=gg(d,a,b,c,x[i+6],9,-1069501632);c=gg(c,d,a,b,x[i+11],14,643717713);b=gg(b,c,d,a,x[i],20,-373897302)
  a=gg(a,b,c,d,x[i+5],5,-701558691);d=gg(d,a,b,c,x[i+10],9,38016083);c=gg(c,d,a,b,x[i+15],14,-660478335);b=gg(b,c,d,a,x[i+4],20,-405537848)
  a=gg(a,b,c,d,x[i+9],5,568446438);d=gg(d,a,b,c,x[i+14],9,-1019803690);c=gg(c,d,a,b,x[i+3],14,-187363961);b=gg(b,c,d,a,x[i+8],20,1163531501)
  a=gg(a,b,c,d,x[i+13],5,-1444681467);d=gg(d,a,b,c,x[i+2],9,-51403784);c=gg(c,d,a,b,x[i+7],14,1735328473);b=gg(b,c,d,a,x[i+12],20,-1926607734)
  a=hh(a,b,c,d,x[i+5],4,-378558);d=hh(d,a,b,c,x[i+8],11,-2022574463);c=hh(c,d,a,b,x[i+11],16,1839030562);b=hh(b,c,d,a,x[i+14],23,-35309556)
  a=hh(a,b,c,d,x[i+1],4,-1530992060);d=hh(d,a,b,c,x[i+4],11,1272893353);c=hh(c,d,a,b,x[i+7],16,-155497632);b=hh(b,c,d,a,x[i+10],23,-1094730640)
  a=hh(a,b,c,d,x[i+13],4,681279174);d=hh(d,a,b,c,x[i],11,-358537222);c=hh(c,d,a,b,x[i+3],16,-722521979);b=hh(b,c,d,a,x[i+6],23,76029189)
  a=hh(a,b,c,d,x[i+9],4,-640364487);d=hh(d,a,b,c,x[i+12],11,-421815835);c=hh(c,d,a,b,x[i+15],16,530742520);b=hh(b,c,d,a,x[i+2],23,-995338651)
  a=ii(a,b,c,d,x[i],6,-198630844);d=ii(d,a,b,c,x[i+7],10,1126891415);c=ii(c,d,a,b,x[i+14],15,-1416354905);b=ii(b,c,d,a,x[i+5],21,-57434055)
  a=ii(a,b,c,d,x[i+12],6,1700485571);d=ii(d,a,b,c,x[i+3],10,-1894986606);c=ii(c,d,a,b,x[i+10],15,-1051523);b=ii(b,c,d,a,x[i+1],21,-2054922799)
  a=ii(a,b,c,d,x[i+8],6,1873313359);d=ii(d,a,b,c,x[i+15],10,-30611744);c=ii(c,d,a,b,x[i+6],15,-1560198380);b=ii(b,c,d,a,x[i+13],21,1309151649)
  a=ii(a,b,c,d,x[i+4],6,-145523070);d=ii(d,a,b,c,x[i+11],10,-1120210379);c=ii(c,d,a,b,x[i+2],15,718787259);b=ii(b,c,d,a,x[i+9],21,-343485551)
  a=safeAdd(a,oa);b=safeAdd(b,ob);c=safeAdd(c,oc);d=safeAdd(d,od)}
  function rh(n:number){return ('0'+((n>>>0).toString(16))).slice(-8).match(/../g)!.reverse().join('')}
  return [a,b,c,d].map(rh).join('')
}

type LogLine = { time: string; msg: string; type: 'info'|'success'|'error'|'warn' }
type Session = { key: string; uid: string; account: string }

function Card({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`relative bg-[#111520] border border-[#1e2540] rounded-2xl p-7 mb-4 overflow-hidden
      before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:h-px
      before:bg-gradient-to-r before:from-transparent before:via-emerald-400/30 before:to-transparent ${className}`}>
      {children}
    </div>
  )
}

function CardTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2 text-[11px] font-bold tracking-[2px] uppercase text-slate-500 mb-5">
      <span className="w-[3px] h-[14px] bg-gradient-to-b from-sky-400 to-emerald-400 rounded-sm inline-block" />
      {children}
    </div>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mb-4">
      <label className="block text-[12px] font-medium text-slate-400 mb-2 tracking-wide">{label}</label>
      {children}
    </div>
  )
}

const inputCls = `w-full bg-[#171c2e] border border-[#1e2540] rounded-xl px-4 py-3 text-[#e8ecf4] text-sm
  outline-none transition-all placeholder:text-slate-600
  focus:border-sky-500 focus:ring-2 focus:ring-sky-500/10`

export default function Home() {
  const [session, setSession] = useState<Session | null>(null)
  const [loginLoading, setLoginLoading] = useState(false)
  const [account, setAccount] = useState('')
  const [password, setPassword] = useState('')

  const [sellAmount, setSellAmount] = useState('')
  const [sellPassword, setSellPassword] = useState('')
  const [sonId, setSonId] = useState('')
  const [mnemonicId, setMnemonicId] = useState('')
  const [mnemonicStr, setMnemonicStr] = useState('')
  const [gCode, setGCode] = useState('')
  const [intervalSec, setIntervalSec] = useState('5')
  const [maxCount, setMaxCount] = useState('0')

  const [statQty, setStatQty] = useState('0')
  const [statPrice, setStatPrice] = useState('—')
  const [statTotal, setStatTotal] = useState('0.00')

  const [running, setRunning] = useState(false)
  const [execCount, setExecCount] = useState(0)
  const [countdown, setCountdown] = useState(0)
  const [statusMsg, setStatusMsg] = useState('未启动')
  const countdownRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const runningRef = useRef(false)
  const execCountRef = useRef(0)

  const [logs, setLogs] = useState<LogLine[]>([{ time: nowStr(), msg: '系统初始化完成，等待操作...', type: 'info' }])
  const logWrapRef = useRef<HTMLDivElement>(null)
  const [toast, setToast] = useState<{ msg: string; type: string } | null>(null)
  const BASE32_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
 
/**
 * 解码 Base32 字符串为 Uint8Array
 */
function base32Decode(input: string): Uint8Array {
  // 清理输入：转大写，去除空格和 =
  const str = input.toUpperCase().replace(/\s/g, "").replace(/=/g, "");
 
  const bytes: number[] = [];
  let buffer = 0;
  let bitsLeft = 0;
 
  for (const char of str) {
    const val = BASE32_CHARS.indexOf(char);
    if (val === -1) {
      throw new Error(`无效的 Base32 字符: ${char}`);
    }
    buffer = (buffer << 5) | val;
    bitsLeft += 5;
    if (bitsLeft >= 8) {
      bitsLeft -= 8;
      bytes.push((buffer >> bitsLeft) & 0xff);
    }
  }
 
  return new Uint8Array(bytes);
}
 
/**
 * HMAC-SHA1 实现（纯 TypeScript，无需外部依赖）
 */
function hmacSha1(key: Uint8Array, data: Uint8Array): Uint8Array {
  const BLOCK_SIZE = 64;
 
  // 如果 key 超过块大小，需要先哈希（这里简化处理，Google Authenticator 密钥不会超过）
  let normalizedKey = key;
  if (key.length > BLOCK_SIZE) {
    normalizedKey = sha1(key);
  }
 
  // 填充 key 到块大小
  const paddedKey = new Uint8Array(BLOCK_SIZE);
  paddedKey.set(normalizedKey);
 
  const ipad = new Uint8Array(BLOCK_SIZE).map((_, i) => paddedKey[i] ^ 0x36);
  const opad = new Uint8Array(BLOCK_SIZE).map((_, i) => paddedKey[i] ^ 0x5c);
 
  const innerData = new Uint8Array(ipad.length + data.length);
  innerData.set(ipad);
  innerData.set(data, ipad.length);
 
  const innerHash = sha1(innerData);
 
  const outerData = new Uint8Array(opad.length + innerHash.length);
  outerData.set(opad);
  outerData.set(innerHash, opad.length);
 
  return sha1(outerData);
}
 
/**
 * SHA-1 实现
 */
function sha1(data: Uint8Array): Uint8Array {
  // 初始哈希值
  let h0 = 0x67452301;
  let h1 = 0xefcdab89;
  let h2 = 0x98badcfe;
  let h3 = 0x10325476;
  let h4 = 0xc3d2e1f0;
 
  // 预处理：添加填充
  const msgLen = data.length;
  const bitLen = msgLen * 8;
 
  // 计算填充后的长度（需要是 64 字节的倍数）
  const paddedLen = Math.ceil((msgLen + 9) / 64) * 64;
  const padded = new Uint8Array(paddedLen);
  padded.set(data);
  padded[msgLen] = 0x80;
 
  // 在末尾写入原始长度（大端序，64位）
  const view = new DataView(padded.buffer);
  view.setUint32(paddedLen - 4, bitLen & 0xffffffff, false);
  view.setUint32(paddedLen - 8, Math.floor(bitLen / 0x100000000), false);
 
  // 处理每个 512 位（64 字节）块
  for (let offset = 0; offset < paddedLen; offset += 64) {
    const w = new Uint32Array(80);
    for (let i = 0; i < 16; i++) {
      w[i] = view.getUint32(offset + i * 4, false);
    }
    for (let i = 16; i < 80; i++) {
      w[i] = leftRotate(w[i - 3] ^ w[i - 8] ^ w[i - 14] ^ w[i - 16], 1);
    }
 
    let a = h0, b = h1, c = h2, d = h3, e = h4;
 
    for (let i = 0; i < 80; i++) {
      let f: number, k: number;
      if (i < 20) {
        f = (b & c) | (~b & d);
        k = 0x5a827999;
      } else if (i < 40) {
        f = b ^ c ^ d;
        k = 0x6ed9eba1;
      } else if (i < 60) {
        f = (b & c) | (b & d) | (c & d);
        k = 0x8f1bbcdc;
      } else {
        f = b ^ c ^ d;
        k = 0xca62c1d6;
      }
 
      const temp = (leftRotate(a, 5) + f + e + k + w[i]) >>> 0;
      e = d;
      d = c;
      c = leftRotate(b, 30);
      b = a;
      a = temp;
    }
 
    h0 = (h0 + a) >>> 0;
    h1 = (h1 + b) >>> 0;
    h2 = (h2 + c) >>> 0;
    h3 = (h3 + d) >>> 0;
    h4 = (h4 + e) >>> 0;
  }
 
  // 输出结果
  const result = new Uint8Array(20);
  const resultView = new DataView(result.buffer);
  resultView.setUint32(0, h0, false);
  resultView.setUint32(4, h1, false);
  resultView.setUint32(8, h2, false);
  resultView.setUint32(12, h3, false);
  resultView.setUint32(16, h4, false);
  return result;
}
 
function leftRotate(n: number, s: number): number {
  return ((n << s) | (n >>> (32 - s))) >>> 0;
}
 
/**
 * 将数字转为 8 字节大端序
 */
function intToBytes(num: number): Uint8Array {
  const bytes = new Uint8Array(8);
  for (let i = 7; i >= 0; i--) {
    bytes[i] = num & 0xff;
    num = Math.floor(num / 256);
  }
  return bytes;
}
 
/**
 * 生成 TOTP 验证码
 * @param base32Secret - Google Authenticator 的 Base32 密钥
 * @param options - 可选配置
 * @returns 6位验证码字符串
 */
 function generateTOTP(
  base32Secret: string,
  options: {
    digits?: number;      // 验证码位数，默认 6
    period?: number;      // 时间步长（秒），默认 30
    timestamp?: number;   // 自定义时间戳（毫秒），默认当前时间
  } = {}
): string {
  const { digits = 6, period = 30, timestamp = Date.now() } = options;
 
  // 1. 解码 Base32 密钥
  const keyBytes = base32Decode(base32Secret);
 
  // 2. 计算时间步（counter）
  const counter = Math.floor(timestamp / 1000 / period);
 
  // 3. 计算 HMAC-SHA1
  const counterBytes = intToBytes(counter);
  const hmac = hmacSha1(keyBytes, counterBytes);
 
  // 4. 动态截断（Dynamic Truncation）
  const offset = hmac[19] & 0x0f;
  const code =
    ((hmac[offset] & 0x7f) << 24) |
    ((hmac[offset + 1] & 0xff) << 16) |
    ((hmac[offset + 2] & 0xff) << 8) |
    (hmac[offset + 3] & 0xff);
 
  // 5. 取模并补零
  const otp = code % Math.pow(10, digits);
  return otp.toString().padStart(digits, "0");
}
 
/**
 * 获取当前验证码及剩余有效时间
 */
 function getTOTPWithExpiry(
  base32Secret: string,
  period: number = 30
): { code: string; remainingSeconds: number; expiresAt: Date } {
  const now = Date.now();
  const code = generateTOTP(base32Secret, { period });
  const remainingSeconds = period - Math.floor((now / 1000) % period);
  const expiresAt = new Date(now + remainingSeconds * 1000);
  return { code, remainingSeconds, expiresAt };
}

  function nowStr() { return new Date().toTimeString().slice(0, 8) }

  function addLog(msg: string, type: LogLine['type'] = 'info') {
    setLogs(prev => [...prev, { time: nowStr(), msg, type }])
  }

  function showToast(msg: string, type = 'success') {
    setToast({ msg, type })
    setTimeout(() => setToast(null), 2800)
  }

  useEffect(() => {
    if (logWrapRef.current) logWrapRef.current.scrollTop = logWrapRef.current.scrollHeight
  }, [logs])

  async function doLogin() {
    if (!account || !password) { showToast('请输入账号和密码', 'error'); return }
    setLoginLoading(true)
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ account, password }),
      })
  const data = await res.json();
  console.log('登录返回数据', data);

// 判断是否成功
if (data.Key && data.UserData?.Id) {
  const s: Session = {
    key: data.Key,
    uid: String(data.UserData.Id),
    account,
  };
  setSession(s);
  showToast('登录成功');
  addLog(`登录成功，UID: ${data.UserData.Id}`, 'success');
  fetchMnemonic(s);
} else {
  const msg = data.msg || data.message || '登录失败';
  showToast(msg, 'error');
  addLog('登录失败: ' + msg, 'error');
}
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e)
      showToast('网络错误: ' + msg, 'error')
      addLog('登录异常: ' + msg, 'error')
    } finally {
      setLoginLoading(false)
    }
  }

  async function fetchMnemonic(s: Session) {
    try {
      const res = await fetch('/api/mnemonic', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key: s.key, UserID: s.uid }),
      })
      const data = await res.json()
      if (data.mnemonicid1 !== undefined) setMnemonicId(String(data.mnemonicid1))
      if (data.balance !== undefined) setStatQty(data.balance)
      if (data.price !== undefined) {
        setStatPrice(data.price)
        setStatTotal((parseFloat(data.balance || 0) * parseFloat(data.price || 0)).toFixed(2))
      }
      addLog('助记词信息已加载', 'info')
    } catch { addLog('获取助记词失败', 'warn') }
  }

  const doSellOnce = useCallback(async (s: Session, mId: string, mStr: string, gc: string, amt: string, sp: string, si: string): Promise<boolean> => {
    if (!amt) { showToast('请输入卖出数量', 'error'); return false }
    if (!mId) { showToast('请输入助记词编号', 'error'); return false }
    if (!mStr) { showToast('请输入助记词内容', 'error'); return false }
    if (!gc) { showToast('请输入谷歌验证码', 'error'); return false }


    const mnemonickey = md5(mStr)
    addLog(`发起卖出 数量:${amt} 编号:${mId} gCode:${gc}`, 'info')
    var totp = generateTOTP(gc)
    try {
      const res = await fetch('/api/sell', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: amt, password: sp, sonId: si,
          mnemonicid1: mId, mnemonickey, mnemonicstr1: mStr,
          gCode: totp, key: s.key, UserID: s.uid,
        }),
      })
      const data = await res.json()
      const ok = data.code === 0 || data.success === true || data.msg === 'ok' || data.status === 'success'
      if (ok) {
        execCountRef.current += 1
        setExecCount(execCountRef.current)
        addLog('卖出成功！' + JSON.stringify(data), 'success')
        showToast('卖出成功 ✓')
        return true
      } else {
        const errMsg = data.msg || data.message || JSON.stringify(data)
        addLog('卖出失败: ' + errMsg, 'error')
        showToast('卖出失败: ' + errMsg, 'error')
        return false
      }
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e)
      addLog('卖出异常: ' + msg, 'error')
      return false
    }
  }, [])

  function startAuto() {
    if (!session) return
    const secs = parseInt(intervalSec) || 5
    const max = parseInt(maxCount) || 0
    runningRef.current = true
    execCountRef.current = 0
    setRunning(true)
    setExecCount(0)
    setStatusMsg(`每 ${secs} 秒自动卖出`)
    addLog(`自动卖出已启动，间隔 ${secs} 秒${max > 0 ? `，最多 ${max} 次` : '，无限次'}`, 'info')

    const sess = session
    // capture current field values
    const mId = mnemonicId, mStr = mnemonicStr, gc = gCode
    const amt = sellAmount, sp = sellPassword, si = sonId

    const tick = async () => {
      if (!runningRef.current) return
      if (max > 0 && execCountRef.current >= max) {
        stopAuto()
        addLog('已完成设定次数，自动停止', 'warn')
        return
      }
      await doSellOnce(sess, mId, mStr, gc, amt, sp, si)
      if (!runningRef.current) return
      let rem = secs
      setCountdown(rem)
      countdownRef.current = setInterval(() => {
        rem--
        setCountdown(rem)
        if (rem <= 0) {
          clearInterval(countdownRef.current!)
          if (runningRef.current) tick()
        }
      }, 1000)
    }
    tick()
  }

  function stopAuto() {
    runningRef.current = false
    setRunning(false)
    clearInterval(countdownRef.current!)
    setCountdown(0)
    setStatusMsg('已停止')
    addLog('自动卖出已停止', 'warn')
  }

  function doLogout() {
    stopAuto()
    setSession(null)
    setExecCount(0)
    addLog('已退出登录', 'warn')
  }

  const secs = parseInt(intervalSec) || 5
  const dash = 113
  const offset = running && secs > 0 ? dash - dash * (countdown / secs) : dash

  const logColors: Record<LogLine['type'], string> = {
    info: 'text-sky-400', success: 'text-emerald-400', error: 'text-rose-400', warn: 'text-orange-400',
  }

  return (
    <div className="min-h-screen bg-[#0a0d14] text-[#e8ecf4] relative overflow-x-hidden">
      <div className="fixed top-[-40%] left-[-20%] w-[80%] h-[80%] bg-[radial-gradient(ellipse,rgba(0,168,255,0.05)_0%,transparent_70%)] pointer-events-none z-0" />
      <div className="fixed bottom-[-30%] right-[-10%] w-[60%] h-[60%] bg-[radial-gradient(ellipse,rgba(0,229,176,0.05)_0%,transparent_70%)] pointer-events-none z-0" />

      <div className="relative z-10 max-w-lg mx-auto px-5 py-10 pb-20">
        {/* header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-3 mb-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-sky-400 to-emerald-400 flex items-center justify-center font-bold text-sm text-black font-mono">AK</div>
            <h1 className="font-mono text-2xl font-bold bg-gradient-to-r from-sky-400 to-emerald-400 bg-clip-text text-transparent">AUTO SELL</h1>
          </div>
          <p className="text-xs text-slate-500 tracking-wide">自动卖出系统 · AK Token</p>
        </div>

        {/* LOGIN */}
        {!session && (
          <Card>
            <CardTitle>账户登录</CardTitle>
            <Field label="账号">
              <input className={inputCls} value={account} onChange={e => setAccount(e.target.value)}
                placeholder="输入账号" autoComplete="off"
                onKeyDown={e => e.key === 'Enter' && doLogin()} />
            </Field>
            <Field label="密码">
              <input className={inputCls} type="password" value={password} onChange={e => setPassword(e.target.value)}
                placeholder="输入密码"
                onKeyDown={e => e.key === 'Enter' && doLogin()} />
            </Field>
            <button onClick={doLogin} disabled={loginLoading}
              className="w-full py-3.5 rounded-xl font-bold text-sm text-black
                bg-gradient-to-r from-sky-400 to-emerald-400
                hover:-translate-y-0.5 hover:shadow-[0_0_20px_rgba(0,229,176,0.3)]
                active:translate-y-0 transition-all disabled:opacity-40 disabled:cursor-not-allowed">
              {loginLoading ? '登录中...' : '登 录'}
            </button>
          </Card>
        )}

        {/* MAIN */}
        {session && (
          <>
            {/* user badge */}
            <div className="flex items-center gap-3 px-4 py-3 rounded-xl mb-4
              bg-gradient-to-r from-sky-400/10 to-emerald-400/10 border border-emerald-400/20">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-sky-400 to-emerald-400
                flex items-center justify-center font-bold text-sm text-black shrink-0">
                {session.account.charAt(0).toUpperCase()}
              </div>
              <div>
                <div className="font-medium text-sm">{session.account}</div>
                <div className="font-mono text-[11px] text-slate-500">UID: {session.uid}</div>
              </div>
              <button onClick={doLogout}
                className="ml-auto text-xs border border-[#1e2540] text-slate-500 px-3 py-1 rounded-lg
                  hover:border-rose-500 hover:text-rose-400 transition-colors">退出</button>
            </div>

            {/* stats */}
            {/* <div className="grid grid-cols-3 gap-px bg-[#1e2540] rounded-xl overflow-hidden mb-4">
              {([['AK 数量', statQty], ['实时价格', statPrice], ['约价值', statTotal]] as [string,string][]).map(([label, val]) => (
                <div key={label} className="bg-[#171c2e] py-4 text-center">
                  <div className="font-mono text-lg font-bold text-emerald-400 leading-none mb-1">{val}</div>
                  <div className="text-[11px] text-slate-500">{label}</div>
                </div>
              ))}
            </div> */}

            {/* sell params */}
            <Card>
              <CardTitle>卖出参数</CardTitle>
              <div className="grid grid-cols-2 gap-3">
                <Field label="卖出数量">
                  <input className={inputCls} type="number" value={sellAmount} onChange={e => setSellAmount(e.target.value)} placeholder="输入数量" min="1" />
                </Field>
                {/* <Field label="交易密码">
                  <input className={inputCls} type="password" value={sellPassword} onChange={e => setSellPassword(e.target.value)} placeholder="交易密码" />
                </Field> */}
              </div>
              {/* <Field label="子账户 ID（sonId，可为空）">
                <input className={inputCls} value={sonId} onChange={e => setSonId(e.target.value)} placeholder="留空则为主账户" />
              </Field> */}
            </Card>

            {/* security */}
            <Card>
              <CardTitle>安全验证</CardTitle>
              <div className="grid grid-cols-2 gap-3">
                <Field label="助记词编号">
                  <input className={inputCls} type="number" value={mnemonicId} onChange={e => setMnemonicId(e.target.value)} placeholder="如：3" min="1" />
                </Field>
                <Field label="助记词内容">
                  <input className={inputCls} value={mnemonicStr} onChange={e => setMnemonicStr(e.target.value)} placeholder="对应助记词" />
                </Field>
              </div>
             <Field label="谷歌验证器密钥">
  <input className={inputCls} value={gCode} onChange={e => setGCode(e.target.value)} 
    placeholder="Base32 密钥，如 JBSWY3DP..." />
</Field>
            </Card>

            {/* auto settings */}
            <Card>
              <CardTitle>自动执行设置</CardTitle>
              <div className="grid grid-cols-2 gap-3 mb-1">
                <Field label="执行间隔（秒）">
                  <input className={inputCls} type="number" value={intervalSec} onChange={e => setIntervalSec(e.target.value)} min="1" max="60" />
                </Field>
                <Field label="执行次数（0=无限）">
                  <input className={inputCls} type="number" value={maxCount} onChange={e => setMaxCount(e.target.value)} min="0" />
                </Field>
              </div>
              <p className="text-[11px] text-slate-500 text-right mb-4">建议间隔 ≥ 3 秒，避免频繁请求</p>

              {/* status row */}
              <div className="flex items-center gap-3 px-4 py-3 bg-[#171c2e] border border-[#1e2540] rounded-xl mb-4">
                <div className={`w-2 h-2 rounded-full shrink-0 transition-colors
                  ${running ? 'bg-emerald-400 shadow-[0_0_8px_#00e5b0] animate-pulse' : 'bg-slate-600'}`} />
                <span className="text-sm text-slate-400 flex-1">{statusMsg}</span>
                {running && (
                  <div className="relative w-11 h-11 shrink-0">
                    <svg viewBox="0 0 44 44" width="44" height="44" className="-rotate-90">
                      <circle cx="22" cy="22" r="18" fill="none" stroke="#1e2540" strokeWidth="3" />
                      <circle cx="22" cy="22" r="18" fill="none" stroke="#00e5b0" strokeWidth="3"
                        strokeDasharray={dash} strokeDashoffset={offset}
                        strokeLinecap="round" style={{ transition: 'stroke-dashoffset 0.3s linear' }} />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center font-mono text-[11px] font-bold text-emerald-400">
                      {countdown}
                    </div>
                  </div>
                )}
                {execCount > 0 && (
                  <span className="font-mono text-xs text-emerald-400 shrink-0">✓ {execCount} 次</span>
                )}
              </div>

              <div className="grid grid-cols-2 gap-3">
                {!running ? (
                  <button onClick={startAuto}
                    className="py-3.5 rounded-xl font-bold text-sm text-black
                      bg-gradient-to-r from-sky-400 to-emerald-400
                      hover:-translate-y-0.5 hover:shadow-[0_0_20px_rgba(0,229,176,0.3)] transition-all">
                    ▶ 开始自动卖出
                  </button>
                ) : (
                  <button onClick={stopAuto}
                    className="py-3.5 rounded-xl font-bold text-sm text-white
                      bg-gradient-to-r from-red-600 to-rose-500
                      hover:-translate-y-0.5 hover:shadow-[0_0_20px_rgba(255,61,113,0.3)] transition-all">
                    ■ 停止
                  </button>
                )}
                <button onClick={() => session && doSellOnce(session, mnemonicId, mnemonicStr, gCode, sellAmount, sellPassword, sonId)}
                  disabled={running}
                  className="py-3.5 rounded-xl text-sm border border-[#1e2540] text-slate-400
                    hover:border-sky-500 hover:text-sky-400 transition-colors
                    disabled:opacity-30 disabled:cursor-not-allowed">
                  单次卖出
                </button>
              </div>
            </Card>

            {/* log */}
            <Card>
              <CardTitle>执行日志</CardTitle>
              <div ref={logWrapRef}
                className="bg-[#171c2e] border border-[#1e2540] rounded-xl h-44 overflow-y-auto p-3 font-mono text-[11px] leading-7">
                {logs.map((l, i) => (
                  <div key={i} className={logColors[l.type]}>[{l.time}] {l.msg}</div>
                ))}
              </div>
              <button onClick={() => setLogs([])}
                className="mt-3 text-xs border border-[#1e2540] text-slate-500 px-3 py-2 rounded-lg
                  hover:border-slate-500 hover:text-slate-300 transition-colors">
                清空日志
              </button>
            </Card>
          </>
        )}
      </div>

      {/* toast */}
      {toast && (
        <div className={`fixed top-6 left-1/2 -translate-x-1/2 px-5 py-3 rounded-xl text-sm z-50
          bg-[#111520] border shadow-xl whitespace-nowrap
          ${toast.type === 'error' ? 'border-rose-500/40 text-rose-400' : 'border-emerald-400/40 text-emerald-400'}`}>
          {toast.msg}
        </div>
      )}
    </div>
  )
}
