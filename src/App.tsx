import { useState, ReactNode } from 'react';
import { 
  Network, Router, Wifi, AlertTriangle, CheckCircle, XCircle, 
  ArrowRight, ArrowLeft, BookOpen, RefreshCw, Server, Smartphone, Monitor, 
  Lightbulb, List, Home, Globe, Key, Activity, Radio,
  Cable, Box, Mail, Search, ArrowDown
} from 'lucide-react';

// 型定義
interface Option {
  id: string;
  text: string;
  correct: boolean;
  explanation: string;
}

interface DetailedExplanation {
  title: string;
  content: string;
  visual?: ReactNode;
  points: string[];
}

interface Scenario {
  id: number;
  title: string;
  subtitle: string;
  icon: ReactNode;
  situation: string;
  question: string;
  options: Option[];
  detailedExplanations: DetailedExplanation[];
}

const App = () => {
  // 型引数 <Option | null> を明示して TS2339 (Property does not exist on type 'never') を回避
  const [currentStage, setCurrentStage] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);
  const [showFeedback, setShowFeedback] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [showDetailedExplanation, setShowDetailedExplanation] = useState<boolean>(false);
  const [currentExplanationIndex, setCurrentExplanationIndex] = useState<number>(0);

  // 図解コンポーネント定義

  // 図解1: 回線の種類と接続機器
  const DiagramLines = () => (
    <div className="space-y-6 my-6">
      {/* パターンA: 有線接続（光回線など） */}
      <div className="bg-blue-50 p-4 rounded-xl border border-blue-200 shadow-sm">
        <h4 className="font-bold text-blue-800 mb-4 flex items-center border-b border-blue-200 pb-2">
          <Cable className="w-5 h-5 mr-2" /> パターンA：有線接続（光回線）
        </h4>
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center px-2">
          {/* 事業者側 */}
          <div className="flex flex-col items-center min-w-[80px] group">
            <div className="bg-slate-200 p-3 rounded-full mb-2">
               <Server className="w-6 h-6 text-slate-600" />
            </div>
            <span className="text-xs font-bold text-slate-600">電柱・局舎</span>
          </div>
          
          {/* 接続線：実線 */}
          <div className="flex-1 flex flex-col items-center w-full md:w-auto relative">
            <div className="w-1 md:w-full h-8 md:h-1 bg-blue-600 rounded"></div>
            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-1 text-[10px] text-blue-600 font-bold border border-blue-200 rounded shadow-sm whitespace-nowrap">
              光ケーブル（物理線）
            </span>
          </div>

          {/* 家の機器：ONU */}
          <div className="flex flex-col items-center min-w-[100px] bg-white p-3 rounded-lg shadow-sm border-2 border-slate-200 relative">
            <div className="absolute -top-2 bg-slate-700 text-white text-[9px] px-2 py-0.5 rounded-full font-bold">必須</div>
            <Box className="w-8 h-8 text-slate-700 mb-1" />
            <span className="text-xs font-bold text-slate-800">ONU</span>
            <span className="text-[9px] text-slate-500 leading-tight mt-1">光信号を<br/>デジタルに変換</span>
          </div>

          {/* 接続線：LANケーブル */}
          <div className="flex-1 flex flex-col items-center w-full md:w-auto justify-center">
             <div className="w-1 md:w-full h-6 md:h-1 bg-slate-300"></div>
          </div>

          {/* 家の機器：ルーター */}
          <div className="flex flex-col items-center min-w-[100px] bg-white p-3 rounded-lg shadow-sm border border-slate-200">
             <Router className="w-8 h-8 text-green-600 mb-1" />
             <span className="text-xs font-bold text-slate-800">Wi-Fiルーター</span>
             <span className="text-[9px] text-slate-500 leading-tight mt-1">スマホ等に<br/>電波を飛ばす</span>
          </div>
        </div>
        <p className="text-xs text-blue-700 mt-4 bg-white p-3 rounded border border-blue-100">
          <strong>ポイント：</strong>物理的に線を家の中まで引き込むため工事が必要ですが、通信が安定して高速です。光信号をPCが理解できる信号に変えるための<strong>「ONU（回線終端装置）」</strong>が必ず必要になります。
        </p>
      </div>

      {/* パターンB: 無線接続（モバイル回線） */}
      <div className="bg-green-50 p-4 rounded-xl border border-green-200 shadow-sm">
        <h4 className="font-bold text-green-800 mb-4 flex items-center border-b border-green-200 pb-2">
          <Wifi className="w-5 h-5 mr-2" /> パターンB：無線接続（ホームルーター）
        </h4>
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center px-2">
          {/* 事業者側 */}
          <div className="flex flex-col items-center min-w-[80px]">
            <div className="bg-slate-200 p-3 rounded-full mb-2">
              <Radio className="w-6 h-6 text-slate-600" />
            </div>
            <span className="text-xs font-bold text-slate-600">モバイル基地局</span>
          </div>
          
          {/* 接続線：波線（無線イメージ） */}
          <div className="flex-1 flex flex-col items-center w-full md:w-auto py-2 md:py-0">
            <div className="flex md:flex-row flex-col items-center justify-center gap-1 text-green-500">
              <Wifi className="w-5 h-5 animate-pulse" />
              <Wifi className="w-5 h-5 animate-pulse delay-75" />
              <Wifi className="w-5 h-5 animate-pulse delay-150" />
            </div>
            <span className="text-[10px] text-green-600 font-bold mt-1 bg-white px-1 rounded border border-green-100">電波 (4G/5G)</span>
          </div>

          {/* 家の機器：ホームルーター */}
          <div className="flex flex-col items-center min-w-[120px] bg-white p-3 rounded-lg shadow-sm border-2 border-green-200 relative">
            <div className="absolute -top-2 bg-green-600 text-white text-[9px] px-2 py-0.5 rounded-full font-bold">これ1台でOK</div>
            <Router className="w-10 h-10 text-green-600 mb-1" />
            <span className="text-xs font-bold text-slate-800">ホームルーター</span>
            <span className="text-[9px] text-slate-500 leading-tight mt-1">コンセントに<br/>挿すだけで受信</span>
          </div>
          
          {/* 接続線：Wi-Fi */}
          <div className="flex-1 flex flex-col items-center w-full md:w-auto py-2 md:py-0">
            <Wifi className="w-4 h-4 text-slate-400 rotate-90 md:rotate-0" />
          </div>

          {/* PC/スマホ */}
           <div className="flex flex-col items-center min-w-[80px]">
             <Smartphone className="w-8 h-8 text-slate-600 mb-1" />
             <span className="text-xs text-slate-500">PC/スマホ</span>
           </div>

        </div>
        <p className="text-xs text-green-800 mt-4 bg-white p-3 rounded border border-green-100">
          <strong>ポイント：</strong>工事不要で、機器をコンセントに挿すだけで使えます。ONUは不要です。基地局からの電波を使うため、場所や時間帯によって速度が変わることがあります。
        </p>
      </div>
    </div>
  );

  // 図解2: ISPの役割と提供機能
  const DiagramISP = () => (
    <div className="space-y-6 my-6">
      {/* メインの役割：接続の関所 */}
      <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
        <h4 className="font-bold text-slate-700 mb-4 text-center">ISPの基本役割：インターネットへの接続</h4>
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-col items-center">
            <Home className="w-8 h-8 text-slate-600 mb-1" />
            <span className="text-xs text-slate-500">自宅</span>
          </div>
          <div className="flex-1 flex items-center justify-center relative w-full md:w-auto">
            <div className="h-1 w-full bg-slate-300 absolute"></div>
            <div className="bg-yellow-100 border-2 border-yellow-400 p-2 rounded-lg relative z-10 flex flex-col items-center w-32">
              <Key className="w-6 h-6 text-yellow-600 mb-1" />
              <span className="text-xs font-bold text-yellow-800">ISP (関所)</span>
            </div>
            <ArrowRight className="absolute right-0 -mr-2 text-slate-400 w-4 h-4" />
          </div>
          <div className="flex flex-col items-center">
            <Globe className="w-8 h-8 text-blue-500 mb-1" />
            <span className="text-xs text-slate-500">インターネット</span>
          </div>
        </div>
      </div>

      {/* 詳細機能3つ */}
      <h4 className="font-bold text-slate-700 mt-6 mb-2 flex items-center">
        <Server className="w-5 h-5 mr-2 text-blue-600" />
        ISPが提供する3つの主要サーバ機能
      </h4>
      
      <div className="grid grid-cols-1 gap-4">
        {/* 1. グローバルIPアドレスの割り当て */}
        <div className="bg-white p-4 rounded-lg border-l-4 border-blue-500 shadow-sm flex items-start">
          <div className="bg-blue-50 p-2 rounded-full mr-3 mt-1">
            <Globe className="w-5 h-5 text-blue-600" />
          </div>
          <div className="flex-1">
            <h5 className="font-bold text-slate-800 text-sm mb-1">① グローバルIPアドレスの割り当て</h5>
            <p className="text-xs text-slate-600 mb-2">
              世界中で重複しない「インターネット上の住所」を一時的に貸してくれます。これがないと、リクエストに対する返事（Webページなど）を受け取れません。
            </p>
            {/* ミニ図解 */}
            <div className="bg-blue-50 p-2 rounded border border-blue-100 flex items-center justify-center gap-2">
               <span className="text-[10px] bg-white px-1 border rounded">ISP</span>
               <ArrowRight className="w-3 h-3 text-blue-400" />
               <div className="flex flex-col items-center">
                 <span className="text-[10px] font-mono font-bold text-blue-700 bg-white px-2 py-0.5 rounded border border-blue-200">203.0.113.10</span>
                 <span className="text-[9px] text-blue-500">↑ これを貸与</span>
               </div>
               <ArrowRight className="w-3 h-3 text-blue-400" />
               <span className="text-[10px] bg-white px-1 border rounded">自宅ルータ</span>
            </div>
          </div>
        </div>

        {/* 2. DNSサーバの提供 */}
        <div className="bg-white p-4 rounded-lg border-l-4 border-green-500 shadow-sm flex items-start">
          <div className="bg-green-50 p-2 rounded-full mr-3 mt-1">
            <Search className="w-5 h-5 text-green-600" />
          </div>
          <div className="flex-1">
            <h5 className="font-bold text-slate-800 text-sm mb-1">② DNSサーバの提供</h5>
            <p className="text-xs text-slate-600 mb-2">
              「google.com」などのURLをIPアドレスに変換する「DNSサーバ」を自動的に参照できるようにしてくれます。
            </p>
            {/* ミニ図解 */}
            <div className="bg-green-50 p-2 rounded border border-green-100 flex flex-col gap-1">
               <div className="flex items-center justify-between text-[10px]">
                 <span>PC:「yahoo.co.jpはどこ？」</span>
                 <ArrowRight className="w-3 h-3 text-green-500" />
                 <span className="font-bold bg-white px-1 rounded">ISPのDNSサーバ</span>
               </div>
               <div className="flex items-center justify-between text-[10px]">
                 <span className="font-bold text-green-700">「IP: 182.22.xx.xx です」</span>
                 <ArrowLeft className="w-3 h-3 text-green-500" />
                 <span>(IP判明！)</span>
               </div>
            </div>
          </div>
        </div>

        {/* 3. 電子メール (SMTP/POP/IMAP) */}
        <div className="bg-white p-4 rounded-lg border-l-4 border-orange-500 shadow-sm flex items-start">
          <div className="bg-orange-50 p-2 rounded-full mr-3 mt-1">
            <Mail className="w-5 h-5 text-orange-600" />
          </div>
          <div className="flex-1">
            <h5 className="font-bold text-slate-800 text-sm mb-1">③ 電子メール機能（SMTPサーバ等）</h5>
            <p className="text-xs text-slate-600 mb-2">
              プロバイダ独自のメールアドレス（@provider.ne.jpなど）と、メールを送るためのポスト（SMTPサーバ）を提供します。
            </p>
            {/* ミニ図解 */}
            <div className="bg-orange-50 p-2 rounded border border-orange-100 flex items-center justify-center gap-2">
               <Mail className="w-4 h-4 text-orange-400" />
               <ArrowRight className="w-3 h-3 text-orange-400" />
               <div className="bg-white px-2 py-1 rounded border border-orange-200 text-center">
                 <div className="text-[9px] font-bold text-orange-700">SMTPサーバ</div>
                 <div className="text-[8px] text-slate-400">ISPが管理</div>
               </div>
               <ArrowRight className="w-3 h-3 text-orange-400" />
               <span className="text-[10px]">宛先へ</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // 図解3-1: DHCPの仕組み（配布されるもの）
  const DiagramDHCP = () => (
    <div className="bg-green-50 p-6 rounded-xl border border-green-200 my-6 relative overflow-hidden">
      <div className="flex flex-col md:flex-row items-center justify-around relative z-10 gap-4">
        {/* PC */}
        <div className="flex flex-col items-center justify-center">
          <Monitor className="w-10 h-10 text-slate-600 mb-2" />
          <div className="bg-white p-2 rounded border border-slate-300 shadow-sm text-center w-32">
            <span className="text-xs font-bold block">自分のPC</span>
            <span className="text-[9px] text-slate-500">（まだ何も知らない）</span>
          </div>
        </div>

        {/* やりとり（情報セット） */}
        <div className="flex-1 flex flex-col items-center justify-center">
          <div className="text-[10px] text-slate-500 mb-1">DHCPが教えてくれる「接続4点セット」</div>
          <div className="flex items-center w-full max-w-sm">
            <ArrowLeft className="w-6 h-6 text-green-600 hidden md:block" />
            <div className="bg-white rounded-lg shadow-md border-2 border-green-400 p-3 w-full text-left space-y-2 relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-green-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap">
                これを使いなさい！
              </div>
              <div className="flex justify-between items-center text-xs border-b border-dashed pb-1">
                <span className="text-slate-500">IPアドレス</span>
                <span className="font-mono font-bold text-green-700">192.168.1.5</span>
              </div>
              <div className="flex justify-between items-center text-xs border-b border-dashed pb-1">
                <span className="text-slate-500">サブネットマスク</span>
                <span className="font-mono text-slate-700">255.255.255.0</span>
              </div>
              <div className="flex justify-between items-center text-xs border-b border-dashed pb-1">
                <span className="text-slate-500">デフォルトゲートウェイ</span>
                <span className="font-mono text-slate-700">192.168.1.1</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-500">DNSサーバ</span>
                <span className="font-mono text-slate-700">192.168.1.1</span>
              </div>
            </div>
            <ArrowRight className="w-6 h-6 text-green-600 hidden md:block transform rotate-180 md:rotate-0" />
            <ArrowDown className="w-6 h-6 text-green-600 block md:hidden mt-2" />
          </div>
        </div>

        {/* Router */}
        <div className="flex flex-col items-center justify-center">
          <Router className="w-10 h-10 text-green-600 mb-2" />
          <div className="bg-white p-2 rounded border border-green-300 shadow-sm text-center w-32">
             <span className="text-xs font-bold block text-green-800">ルータ</span>
             <span className="text-[9px] bg-green-100 text-green-800 px-1 rounded font-bold">DHCPサーバ機能</span>
          </div>
        </div>
      </div>
    </div>
  );

  // 図解3-2: ルータの役割（内向きDHCPサーバ、外向きクライアント）
  const DiagramRouterRole = () => (
    <div className="my-6">
      <div className="bg-slate-100 p-4 rounded-xl border border-slate-300 relative">
        <div className="flex flex-col md:flex-row items-center justify-between gap-2">
          
          {/* LAN側 (家の中) */}
          <div className="flex-1 bg-green-50 p-3 rounded-lg border border-green-200 w-full">
            <div className="text-center mb-2 font-bold text-green-800 text-xs">家の中 (LAN)</div>
            <div className="flex justify-center items-center gap-2">
              <div className="flex flex-col items-center">
                <Smartphone className="w-5 h-5 text-slate-600" />
                <span className="text-[9px] mt-1">スマホ</span>
              </div>
              <div className="flex flex-col items-center">
                <Monitor className="w-5 h-5 text-slate-600" />
                <span className="text-[9px] mt-1">PC</span>
              </div>
              <ArrowLeft className="w-4 h-4 text-green-500 animate-pulse" />
              <div className="bg-white px-2 py-1 rounded border border-green-300 text-[9px] text-green-700 font-bold">
                IPください
              </div>
            </div>
          </div>

          {/* ルータ (境界) */}
          <div className="flex flex-col items-center px-2 z-10 relative">
             <div className="bg-slate-800 text-white text-[10px] px-2 py-1 rounded-t-lg w-full text-center">ルータ</div>
             <div className="bg-white border-2 border-slate-600 p-2 rounded-b-lg shadow-lg flex flex-col items-center w-32">
               <Router className="w-8 h-8 text-green-600 mb-1" />
               <div className="w-full h-px bg-slate-200 my-1"></div>
               <div className="flex w-full justify-between text-[8px]">
                 <div className="text-green-700 font-bold text-center w-1/2 border-r border-slate-100">
                   LAN側<br/>DHCPサーバ
                 </div>
                 <div className="text-blue-700 font-bold text-center w-1/2">
                   WAN側<br/>クライアント
                 </div>
               </div>
             </div>
          </div>

          {/* WAN側 (インターネット) */}
          <div className="flex-1 bg-blue-50 p-3 rounded-lg border border-blue-200 w-full">
             <div className="text-center mb-2 font-bold text-blue-800 text-xs">インターネット側 (WAN)</div>
             <div className="flex justify-center items-center gap-2">
               <div className="bg-white px-2 py-1 rounded border border-blue-300 text-[9px] text-blue-700 font-bold text-center">
                 設定 or 自動取得<br/>(PPPoE / IPoE)
               </div>
               <ArrowRight className="w-4 h-4 text-blue-500" />
               <div className="flex flex-col items-center">
                 <Globe className="w-6 h-6 text-blue-500" />
                 <span className="text-[9px] mt-1">ISP/Net</span>
               </div>
             </div>
          </div>

        </div>

        {/* 説明テキスト */}
        <div className="mt-4 bg-white p-3 rounded border border-slate-200 text-xs text-slate-600 leading-relaxed">
          <p className="mb-2">
            <strong>ルータは「2つの顔」を持っています。</strong>
          </p>
          <ul className="list-disc list-inside space-y-1">
            <li>
              <span className="text-green-700 font-bold">家の中に対して：</span> 
              DHCPサーバとして、スマホやPCに「プライベートIPアドレス」や「DNS情報」を配ります。
            </li>
            <li>
              <span className="text-blue-700 font-bold">外の世界に対して：</span>
              ISPから「グローバルIPアドレス」や「DNS情報」を受け取るクライアントとして振る舞います（またはID/Passを設定します）。
            </li>
          </ul>
        </div>
      </div>
    </div>
  );

  // 図解4: トラブルシューティングのピラミッド
  const DiagramTrouble = () => (
    <div className="my-6 flex justify-center">
      <div className="w-full max-w-sm flex flex-col-reverse space-y-1 space-y-reverse">
        {/* Layer 1: Physical */}
        <div className="bg-slate-700 text-white p-4 rounded-lg flex items-center shadow-lg transform translate-x-0 transition hover:scale-105 cursor-pointer">
          <div className="bg-slate-600 p-2 rounded-full mr-3"><ArrowRight className="w-5 h-5 text-yellow-400" /></div>
          <div>
            <div className="font-bold text-sm">Step 1: 物理層 (Physical)</div>
            <div className="text-xs text-slate-300">ケーブル、電源、ランプ点灯</div>
          </div>
        </div>
        
        {/* Layer 2: Network */}
        <div className="bg-blue-600 text-white p-4 rounded-lg flex items-center shadow-md w-[95%] mx-auto opacity-90 hover:opacity-100 transition">
          <div className="bg-blue-500 p-2 rounded-full mr-3"><Activity className="w-5 h-5" /></div>
          <div>
            <div className="font-bold text-sm">Step 2: ネットワーク層</div>
            <div className="text-xs text-blue-100">IPアドレス(ipconfig)、疎通(ping)</div>
          </div>
        </div>

        {/* Layer 3: App */}
        <div className="bg-sky-400 text-white p-4 rounded-lg flex items-center shadow-sm w-[90%] mx-auto opacity-80 hover:opacity-100 transition">
          <div className="bg-sky-300 p-2 rounded-full mr-3"><Globe className="w-5 h-5" /></div>
          <div>
            <div className="font-bold text-sm">Step 3: アプリ層</div>
            <div className="text-xs text-sky-100">ブラウザ設定、サイト側の障害</div>
          </div>
        </div>
      </div>
    </div>
  );

  // 図解5: DNSエラーのケース
  const DiagramDNSError = () => (
    <div className="bg-orange-50 p-6 rounded-xl border border-orange-200 my-6">
      <h5 className="text-center font-bold text-orange-800 mb-8 text-sm">症状：ping 8.8.8.8 は成功するが、Webが見れない</h5>
      
      <div className="relative h-48 w-full max-w-sm mx-auto">
        
        {/* 線を描画するためのSVGレイヤー */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 300 200">
          {/* PC to DNS (Failed) - 座標はレイアウトに合わせて調整 */}
          <line x1="60" y1="150" x2="150" y2="50" stroke="#fca5a5" strokeWidth="2" strokeDasharray="5,5" />
          {/* PC to Web (Success) */}
          <line x1="60" y1="150" x2="240" y2="150" stroke="#86efac" strokeWidth="3" />
        </svg>

        {/* 1. 上段中央: DNSサーバ */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 flex flex-col items-center z-10">
           <div className="bg-slate-100 p-2 rounded-lg border-2 border-slate-300 flex flex-col items-center">
             <Search className="w-6 h-6 text-slate-400" />
             <span className="text-[10px] font-bold text-slate-500">DNSサーバ</span>
           </div>
           {/* バツ印 */}
           <div className="absolute -bottom-2 bg-white rounded-full p-1 border border-red-100 shadow-sm">
             <XCircle className="w-5 h-5 text-red-500" />
           </div>
           {/* ラベル */}
           <span className="absolute top-1/2 -left-16 text-[9px] text-red-500 font-bold bg-white px-1 border border-red-100 rounded">
             名前解決NG
           </span>
        </div>

        {/* 2. 左下: PC */}
        <div className="absolute bottom-4 left-4 flex flex-col items-center z-10">
          <Monitor className="w-10 h-10 text-slate-700 mb-2" />
          <span className="text-xs font-bold bg-white px-2 py-0.5 rounded border border-slate-200 shadow-sm">自分のPC</span>
        </div>

        {/* 3. 右下: Web/Ping先 */}
        <div className="absolute bottom-4 right-4 flex flex-col items-center z-10">
          <Globe className="w-10 h-10 text-blue-500 mb-2" />
          <span className="text-xs font-bold bg-white px-2 py-0.5 rounded border border-blue-200 shadow-sm">Web/Ping先</span>
          <span className="text-[9px] text-slate-500">(8.8.8.8)</span>
        </div>
        
        {/* Ping OKの表示 */}
        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 bg-white px-2 py-1 rounded border border-green-400 text-[9px] font-bold text-green-700 flex items-center shadow-sm z-20">
           <CheckCircle className="w-3 h-3 mr-1" />
           ping 8.8.8.8 OK
        </div>

      </div>

      <div className="mt-4 bg-white p-3 rounded border border-orange-100 text-xs text-orange-800">
        <span className="font-bold">診断：</span>「住所（IP）」なら届くのに、「名前（URL）」だと届かない。<br/>
        → <strong>DNSサーバ（名前解決）のトラブル</strong>が疑われます！
      </div>
    </div>
  );

  // シナリオデータ
  const scenarios: Scenario[] = [
    {
      id: 1,
      title: "ステージ1：導入・契約編",
      subtitle: "インターネットが開通しない！？",
      icon: <Network className="w-8 h-8 text-blue-500" />,
      situation: "新居に引っ越してきたキミ。壁には「光コンセント」がある。「これならすぐに動画が見られる！」と思ってPCを繋いだけど、ネットに繋がらない…。どうやら契約が必要みたいだ。",
      question: "インターネットを利用可能にするためには、どこに連絡して契約が必要？",
      options: [
        { id: 'A', text: "回線事業者（NTTなど）だけ", correct: false, explanation: "惜しい！ 回線事業者は「物理的な道路」を作る人たちだ。道路があっても「通行手形」がないとネットの世界には入れないよ。" },
        { id: 'B', text: "プロバイダ（ISP）だけ", correct: false, explanation: "残念！ プロバイダは「通行手形」をくれるけど、そもそも家まで続く「道路（回線）」がないと通れないよね。" },
        { id: 'C', text: "回線事業者とプロバイダの両方", correct: true, explanation: "正解！ 物理的な「回線（道路）」と、接続サービスを行う「プロバイダ（通行手形）」の両方が必要なんだ。最近はセット契約（光コラボ）も多いよ。" }
      ],
      detailedExplanations: [
        {
          title: "深掘り1：回線事業者（キャリア）とは？",
          content: "まずは「物理的な道」が必要です。自分に合った回線の種類を選びましょう。主に「物理線を引き込むタイプ」と「電波で繋ぐタイプ」があります。",
          visual: <DiagramLines />,
          points: [
            "光回線：現在最も主流。電柱から光ファイバーを部屋まで引き込む工事が必要。高速で安定。",
            "モバイル回線：工事不要。基地局の電波を使う。専用の機器（ホームルーター）を置くだけ。",
            "ONU（光回線終端装置）：光ファイバーの光信号を、PCが分かるデジタル信号に変換する必須機器。"
          ]
        },
        {
          title: "深掘り2：ISP（プロバイダ）とは？",
          content: "ISP (Internet Service Provider) は、回線という「道」を使って、インターネットの世界に入るための「関所」です。単に接続許可を出すだけでなく、以下の3つの重要な機能を提供しています。",
          visual: <DiagramISP />,
          points: [
            "必須のパートナー：ISPと契約しないと、Webサイト閲覧もメールもできません。",
            "グローバルIPアドレス：インターネット上で通信するために必須の「住所」を貸し出します。",
            "DNSとメール：住所変換サーバ（DNS）や、電子メール送受信サーバ（SMTPなど）もISPが用意してくれます。"
          ]
        }
      ]
    },
    {
      id: 2,
      title: "ステージ2：接続編",
      subtitle: "ケーブルを挿すだけでなぜ繋がる？",
      icon: <Router className="w-8 h-8 text-green-500" />,
      situation: "無事に契約完了！ ルータが届いたのでケーブルを繋いだ。授業では「IPアドレスの設定が必要」と習った気がするけど、何も設定せずにYahoo!が見れたぞ？",
      question: "面倒なIPアドレス設定を自動でやってくれている、ルータの中の機能（プロトコル）はどれ？",
      options: [
        { id: 'A', text: "DNS (Domain Name System)", correct: false, explanation: "不正解。DNSは「www.google.com」のような名前をIPアドレスに変換する「住所録」のような仕組みだ。" },
        { id: 'B', text: "DHCP (Dynamic Host Configuration Protocol)", correct: true, explanation: "正解！ DHCPサーバが、接続された機器に自動でIPアドレスを貸し出してくれるんだ。これのおかげで、スマホもPCも設定なしで繋がるんだよ。" },
        { id: 'C', text: "PCの工場出荷時設定", correct: false, explanation: "違うよ。IPアドレスはネットワーク環境ごとに変わるものだから、工場で決めることはできないんだ。" }
      ],
      detailedExplanations: [
        {
          title: "深掘り1：DHCPが配る「接続4点セット」",
          content: "DHCPは単にIPアドレスを配るだけではありません。PCがインターネットをするために必要な「4点セット」をまとめて設定してくれます。",
          visual: <DiagramDHCP />,
          points: [
            "プライベートIPアドレス：家の中で使えるPCの住所（例：192.168.1.5）。",
            "サブネットマスク：どこまでが同じネットワークかを示す範囲（例：255.255.255.0）。",
            "デフォルトゲートウェイ：インターネットへの出口となるルータの住所（例：192.168.1.1）。",
            "DNSサーバ情報：URLをIPに変換するサーバの住所。"
          ]
        },
        {
          title: "深掘り2：ルータは「仲介役」",
          content: "では、DHCPサーバである「ホームルータ」自身はどうやって設定されているのでしょうか？ 実はルータは、家庭内とインターネットの間に立つ「仲介役」なのです。",
          visual: <DiagramRouterRole />,
          points: [
            "家の中（LAN）へ：ルータは「親分（サーバ）」として、スマホたちにプライベートIPアドレスを配ります。",
            "家の外（WAN）へ：ルータは「子分（クライアント）」として、ISPからグローバルIPアドレスやDNS情報をもらいます。",
            "情報のバケツリレー：ルータがISPからDNS情報をもらい、それをスマホたちに「DNSはこれを使ってね」と伝えることで、通信が成立します。"
          ]
        }
      ]
    },
    {
      id: 3,
      title: "ステージ3：トラブル編",
      subtitle: "突然繋がらなくなった！",
      icon: <AlertTriangle className="w-8 h-8 text-orange-500" />,
      situation: "夜、動画を見ていたら突然「接続が切れました」と表示された！ スマホのWi-Fiも繋がらない。パニックになりそうだけど、まずは原因の切り分けだ。",
      question: "原因を特定（切り分け）するための手順として、【最も効率的で適切な順番】はどれ？",
      options: [
        { id: 'A', text: "1. PCの初期化 → 2. ping確認 → 3. 電源確認", correct: false, explanation: "ブブー！ いきなり初期化（OS再インストール）は「最終手段」だよ。時間がかかるしデータも消えるかも。まずは簡単なところから疑おう。" },
        { id: 'B', text: "1. ping確認 → 2. 電源確認 → 3. PCの初期化", correct: false, explanation: "惜しい！ コマンドを打つ前に、もっと基本的なことがあるよ。もしコンセントが抜けているだけだったら、コマンドを打つ時間ももったいないよね。" },
        { id: 'C', text: "1. 電源・配線確認 → 2. ping確認 → 3. 外部障害の確認", correct: true, explanation: "大正解！ まずは「物理的な確認（電源・ケーブル）」、次に「通信確認（ping）」、最後に「自分では直せない場所（プロバイダ障害など）」を疑う。これがエンジニアの鉄則だ！" }
      ],
      detailedExplanations: [
        {
          title: "深掘り1：トラブルシューティングの鉄則",
          content: "ネットワークトラブルは「下位レイヤー（物理層）」から順に積み上げて疑うのが基本です。",
          visual: <DiagramTrouble />,
          points: [
            "土台が大事（物理層）：ケーブルが抜けていないか、断線していないか、ルータの電源が入っているか。",
            "中継確認（ネットワーク層）：IPアドレスが正しく取得できているか、Pingが通るか。",
            "アプリ確認（アプリケーション層）：ブラウザの設定はおかしくないか、特定のサイトだけ落ちていないか。"
          ]
        },
        {
          title: "深掘り2：pingは通るのにWebが見れない？",
          content: "「ping 8.8.8.8 は成功するのに、google.com が開けない」という奇妙な状況。これは「名前解決」だけが失敗している証拠です。",
          visual: <DiagramDNSError />,
          points: [
            "IPアドレス（住所）直打ちはOK：インターネット自体は繋がっています。",
            "URL（名前）がダメ：DNSサーバが応答していないか、PCのDNS設定が間違っています。",
            "対策：PCのDNS設定を「自動取得」にし直すか、GoogleのパブリックDNS（8.8.8.8など）を手動で設定してみましょう。"
          ]
        }
      ]
    }
  ];

  // 型アノテーションを追加して TS7006 (Implicit Any) を回避
  const handleOptionClick = (option: Option) => {
    if (showFeedback) return;
    setSelectedOption(option);
    setIsCorrect(option.correct);
    setShowFeedback(true);
  };

  const handleToDetailedExplanation = () => {
    setShowDetailedExplanation(true);
    setCurrentExplanationIndex(0);
  };

  const handleNextExplanationOrStage = () => {
    const currentScenario = scenarios[currentStage - 1];
    if (currentExplanationIndex < currentScenario.detailedExplanations.length - 1) {
      setCurrentExplanationIndex(prev => prev + 1);
      window.scrollTo(0, 0);
    } else {
      setShowDetailedExplanation(false);
      setSelectedOption(null);
      setShowFeedback(false);
      setIsCorrect(false);
      setCurrentStage(prev => prev + 1);
      setCurrentExplanationIndex(0);
    }
  };

  const handleReset = () => {
    setCurrentStage(0);
    setSelectedOption(null);
    setShowFeedback(false);
    setIsCorrect(false);
    setShowDetailedExplanation(false);
    setCurrentExplanationIndex(0);
  };

  // タイトル画面
  if (currentStage === 0) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4 font-sans text-slate-800">
        <div className="max-w-2xl w-full bg-white rounded-xl shadow-xl overflow-hidden border-t-8 border-blue-500">
          <div className="p-8 text-center space-y-6">
            <div className="flex justify-center mb-4">
              <div className="bg-blue-100 p-4 rounded-full">
                <Monitor className="w-16 h-16 text-blue-600" />
              </div>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-800">
              【情報I 実践演習】
              <br />
              一人暮らしのネットサバイバル
            </h1>
            <p className="text-lg text-slate-600 leading-relaxed">
              これから一人暮らしを始める君へ。<br />
              インターネットの契約から接続、トラブル解決まで、<br />
              シミュレーション形式で体験してみよう！
            </p>
            <div className="bg-slate-50 p-6 rounded-lg text-left border border-slate-200">
              <h3 className="font-bold text-slate-700 mb-2 flex items-center">
                <BookOpen className="w-5 h-5 mr-2" />
                学習目標
              </h3>
              <ul className="list-disc list-inside text-slate-600 space-y-1">
                <li>ISPと回線事業者の違いを理解する</li>
                <li>DHCPの役割を知る</li>
                <li>ネットワークトラブルの切り分け手順を学ぶ</li>
              </ul>
            </div>
            <button
              onClick={() => setCurrentStage(1)}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-lg shadow-lg transform transition hover:scale-105 flex items-center justify-center text-xl"
            >
              スタート！ <ArrowRight className="ml-2 w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ゲームクリア画面
  if (currentStage > scenarios.length) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4 font-sans text-slate-800">
        <div className="max-w-2xl w-full bg-white rounded-xl shadow-xl overflow-hidden border-t-8 border-green-500">
          <div className="p-8 text-center space-y-6">
            <div className="flex justify-center mb-4">
              <div className="bg-green-100 p-4 rounded-full">
                <CheckCircle className="w-16 h-16 text-green-600" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-slate-800">演習完了！</h1>
            <p className="text-xl text-slate-700">おめでとう！ これで君もネットサバイバル初心者卒業だ。</p>
            
            <div className="bg-green-50 p-6 rounded-lg text-left border border-green-200 space-y-4">
              <p className="font-bold text-green-800 text-lg">今回の学習成果</p>
              <div className="space-y-3">
                <div className="flex items-start">
                  <span className="bg-green-200 text-green-800 text-xs font-bold px-2 py-1 rounded mt-1 mr-2">契約</span>
                  <p className="text-slate-700">ISPと回線の役割分担を理解した。</p>
                </div>
                <div className="flex items-start">
                  <span className="bg-green-200 text-green-800 text-xs font-bold px-2 py-1 rounded mt-1 mr-2">接続</span>
                  <p className="text-slate-700">DHCPによる自動設定の仕組みを学んだ。</p>
                </div>
                <div className="flex items-start">
                  <span className="bg-green-200 text-green-800 text-xs font-bold px-2 py-1 rounded mt-1 mr-2">解決</span>
                  <p className="text-slate-700">物理層からのトラブル切り分け手法を身につけた。</p>
                </div>
              </div>
            </div>

            <button
              onClick={handleReset}
              className="mt-6 bg-slate-600 hover:bg-slate-700 text-white font-bold py-3 px-6 rounded-lg shadow transition flex items-center justify-center mx-auto"
            >
              <RefreshCw className="mr-2 w-5 h-5" /> もう一度復習する
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ゲーム本編
  const currentScenario = scenarios[currentStage - 1];
  const currentExplanation = currentScenario.detailedExplanations[currentExplanationIndex];

  return (
    <div className="min-h-screen bg-slate-100 py-8 px-4 font-sans text-slate-800 flex justify-center">
      <div className="max-w-3xl w-full space-y-6">
        
        {/* ヘッダー */}
        <div className="bg-white p-4 rounded-lg shadow-sm flex items-center justify-between">
          <div className="font-bold text-slate-600">情報I 演習</div>
          <div className="flex space-x-2">
            {[1, 2, 3].map((num) => (
              <div
                key={num}
                className={`w-3 h-3 rounded-full ${
                  num === currentStage ? 'bg-blue-600 scale-125' : 
                  num < currentStage ? 'bg-blue-400' : 'bg-slate-200'
                }`}
              />
            ))}
          </div>
          <div className="text-sm text-slate-500">Stage {currentStage}/3</div>
        </div>

        {/* 詳細解説画面 */}
        {showDetailedExplanation ? (
          <div className="bg-white rounded-xl shadow-lg overflow-hidden border-t-4 border-yellow-400 animate-fade-in">
             <div className="bg-yellow-50 p-6 border-b border-yellow-100 flex items-center">
              <div className="bg-white p-3 rounded-full shadow-sm mr-4">
                <Lightbulb className="w-8 h-8 text-yellow-500" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-yellow-600 uppercase tracking-wide">重要ポイント解説</h2>
                {currentScenario.detailedExplanations.length > 1 && (
                  <span className="text-xs text-yellow-700 font-bold bg-yellow-200 px-2 py-0.5 rounded ml-2">
                    {currentExplanationIndex + 1} / {currentScenario.detailedExplanations.length}
                  </span>
                )}
                <h3 className="text-xl font-bold text-slate-800">{currentExplanation.title}</h3>
              </div>
            </div>
            
            <div className="p-6 md:p-8 space-y-6">
              <p className="text-lg text-slate-700 leading-relaxed">
                {currentExplanation.content}
              </p>
              
              {/* ここに図解を表示 */}
              {currentExplanation.visual}

              <div className="bg-slate-50 rounded-lg p-6 border border-slate-200">
                <h4 className="font-bold text-slate-700 mb-4 flex items-center">
                  <List className="w-5 h-5 mr-2 text-slate-500" />
                  覚えておこう！
                </h4>
                <ul className="space-y-3">
                  {currentExplanation.points.map((point, index) => (
                    <li key={index} className="flex items-start text-slate-700">
                      <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={handleNextExplanationOrStage}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-lg shadow-lg transform transition hover:scale-105 flex items-center justify-center text-xl mt-4"
              >
                {currentExplanationIndex < currentScenario.detailedExplanations.length - 1 
                  ? "次へ進む" 
                  : "次のステージへ"
                } 
                <ArrowRight className="ml-2 w-6 h-6" />
              </button>
            </div>
          </div>
        ) : (
          /* 通常の問題画面 */
          <div className="bg-white rounded-xl shadow-lg overflow-hidden border-t-4 border-blue-500">
            {/* ステージタイトル */}
            <div className="bg-slate-50 p-6 border-b border-slate-100 flex items-center">
              <div className="bg-white p-3 rounded-full shadow-sm mr-4">
                {currentScenario.icon}
              </div>
              <div>
                <h2 className="text-sm font-bold text-blue-600 uppercase tracking-wide">{currentScenario.title}</h2>
                <h3 className="text-xl font-bold text-slate-800">{currentScenario.subtitle}</h3>
              </div>
            </div>

            <div className="p-6 md:p-8 space-y-8">
              {/* 状況説明 */}
              <div className="space-y-4">
                <div className="flex items-center text-slate-800 font-bold text-lg">
                  <span className="w-1 h-6 bg-blue-500 mr-3 rounded-full"></span>
                  状況
                </div>
                <div className="bg-blue-50 p-5 rounded-lg text-slate-700 leading-relaxed border border-blue-100">
                  {currentScenario.situation}
                </div>
              </div>

              {/* 問題 */}
              <div className="space-y-4">
                <div className="flex items-center text-slate-800 font-bold text-lg">
                  <span className="w-1 h-6 bg-orange-500 mr-3 rounded-full"></span>
                  先生からの問いかけ
                </div>
                <p className="font-medium text-lg text-slate-800">
                  {currentScenario.question}
                </p>
                
                {/* 選択肢 */}
                <div className="grid gap-3 pt-2">
                  {currentScenario.options.map((option) => (
                    <button
                      key={option.id}
                      onClick={() => handleOptionClick(option)}
                      disabled={showFeedback}
                      // TS18047対策: selectedOption?.id を使用して安全にアクセス
                      className={`
                        w-full text-left p-4 rounded-lg border-2 transition-all duration-200 flex items-center
                        ${showFeedback && option.id === selectedOption?.id
                          ? option.correct
                            ? 'border-green-500 bg-green-50 ring-2 ring-green-200'
                            : 'border-red-500 bg-red-50 ring-2 ring-red-200'
                          : showFeedback
                            ? 'border-slate-100 bg-slate-50 opacity-60'
                            : 'border-slate-200 hover:border-blue-400 hover:bg-blue-50'
                        }
                      `}
                    >
                      <div className={`
                        w-8 h-8 rounded-full flex items-center justify-center font-bold mr-4 flex-shrink-0
                        ${showFeedback && option.id === selectedOption?.id
                          ? option.correct ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
                          : 'bg-slate-200 text-slate-600'
                        }
                      `}>
                        {option.id}
                      </div>
                      <span className="font-medium text-slate-700">{option.text}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* フィードバック（解説）エリア */}
              {showFeedback && (
                <div className={`
                  rounded-lg p-6 animate-fade-in
                  ${isCorrect ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}
                `}>
                  <div className="flex items-start mb-3">
                    {isCorrect ? (
                      <CheckCircle className="w-6 h-6 text-green-600 mr-2 flex-shrink-0" />
                    ) : (
                      <XCircle className="w-6 h-6 text-red-600 mr-2 flex-shrink-0" />
                    )}
                    <h4 className={`text-lg font-bold ${isCorrect ? 'text-green-800' : 'text-red-800'}`}>
                      {isCorrect ? '正解！' : '残念…'}
                    </h4>
                  </div>
                  
                  <p className="text-slate-700 mb-4 leading-relaxed">
                    {selectedOption ? selectedOption.explanation : ''}
                  </p>

                  {isCorrect ? (
                    <button
                      onClick={handleToDetailedExplanation}
                      className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg shadow transition flex items-center ml-auto"
                    >
                      解説を読む <ArrowRight className="ml-2 w-4 h-4" />
                    </button>
                  ) : (
                     <button
                      onClick={() => {
                        setShowFeedback(false);
                        setSelectedOption(null);
                      }}
                      className="text-slate-500 hover:text-slate-700 font-medium underline text-sm ml-8"
                    >
                      もう一度考える
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;