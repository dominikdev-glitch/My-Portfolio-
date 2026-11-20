import React from "react";
import { Activity, Blocks, Code2, ShieldCheck, Terminal } from "lucide-react";

const MermaiPreview = ({ expanded = false }) => (
  <div className="w-full h-full bg-[#0A0D16] flex flex-col justify-between p-4 sm:p-5 select-none text-left">
    <div
      className={`flex items-center justify-between border-b border-white/[0.08] pb-2.5 gap-2 ${
        expanded ? "pr-12" : ""
      }`}
    >
      <div className="flex items-center gap-2 min-w-0">
        <Terminal className="w-3.5 h-3.5 text-slate-400 shrink-0" aria-hidden="true" />
        <span className="font-mono text-[11px] sm:text-[12px] text-slate-200 truncate">
          mermai-node · C++20
        </span>
      </div>
      <span className="font-mono text-[11px] text-slate-400 whitespace-nowrap shrink-0">
        TW-PoS · Mainnet
      </span>
    </div>

    <div
      className={`font-mono ${
        expanded ? "text-[12px] sm:text-[13px] space-y-2" : "text-[11px] space-y-1.5"
      } text-slate-300 my-auto py-2`}
    >
      <div className="flex items-baseline justify-between gap-3">
        <span className="text-slate-500 shrink-0">consensus</span>
        <span className="text-slate-200 truncate">
          TW-PoS · 2/3+ checkpoint finality
        </span>
      </div>
      <div className="flex items-baseline justify-between gap-3">
        <span className="text-slate-500 shrink-0">state_db</span>
        <span className="text-slate-200 truncate">
          SQLite atomic · UTXO + Account
        </span>
      </div>
      <div className="flex items-baseline justify-between gap-3">
        <span className="text-slate-500 shrink-0">security</span>
        <span className="text-slate-200 truncate">
          ECDSA · NIST P-256 · 50% slashing
        </span>
      </div>
      {expanded && (
        <div className="flex items-baseline justify-between gap-3">
          <span className="text-slate-500 shrink-0">runtime</span>
          <span className="text-slate-200 truncate">
            40+ JSON-RPC · MermaiVM · MRM-20
          </span>
        </div>
      )}
    </div>

    <div className="border-t border-white/[0.08] pt-2.5 flex items-center justify-between gap-3 font-mono text-[11px] tabular-nums">
      <div className="flex items-center gap-3 text-slate-400 min-w-0 truncate">
        <span>7,800+ LOC</span>
        <span className="text-white/20" aria-hidden="true">
          ·
        </span>
        <span>79 files</span>
      </div>
      <span className="text-emerald-400 font-medium whitespace-nowrap shrink-0">
        Integration Suite PASS
      </span>
    </div>
  </div>
);

const DvraPreview = ({ expanded = false }) => {
  const chains = [
    { network: "Ethereum (EVM)", standard: "ERC-20", tooling: "Ethers.js" },
    { network: "BNB Smart Chain", standard: "BEP-20", tooling: "Solidity" },
    { network: "Solana · TRON", standard: "SPL / TRC-20", tooling: "RPC Ready" },
  ];

  return (
    <div className="w-full h-full bg-[#0A0D16] flex flex-col justify-between p-4 sm:p-5 select-none text-left">
      <div
        className={`flex items-center justify-between border-b border-white/[0.08] pb-2.5 gap-2 ${
          expanded ? "pr-12" : ""
        }`}
      >
        <div className="flex items-center gap-2 min-w-0">
          <Blocks className="w-3.5 h-3.5 text-slate-400 shrink-0" aria-hidden="true" />
          <span className="font-mono text-[11px] sm:text-[12px] text-slate-200 truncate">
            downloaddvra.onrender.com
          </span>
        </div>
        <span className="font-mono text-[11px] text-slate-400 whitespace-nowrap shrink-0">
          4 Networks
        </span>
      </div>

      <div className="my-auto py-2 divide-y divide-white/[0.06] font-mono tabular-nums">
        {chains.map((item) => (
          <div
            key={item.network}
            className={`flex items-center justify-between gap-2 ${
              expanded ? "py-2 text-[12px]" : "py-1.5 text-[11px]"
            }`}
          >
            <span className="text-slate-200 truncate min-w-0">{item.network}</span>
            <div className="flex items-center gap-3 shrink-0">
              <span className="text-slate-400">{item.standard}</span>
              <span className="text-emerald-400">{item.tooling}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-white/[0.08] pt-2.5 flex items-center justify-between gap-2 font-mono text-[11px] text-slate-400">
        <span className="truncate">Token Creation &amp; Deployment</span>
        <span className="text-slate-200 whitespace-nowrap shrink-0">
          Multi-Chain Web3
        </span>
      </div>
    </div>
  );
};

const NikwakePreview = ({ expanded = false }) => {
  const rows = [
    { host: "api-core.onrender.com/health", interval: "5m", code: "200 OK", ms: "118 ms" },
    { host: "rpc-relay.onrender.com/ping", interval: "15m", code: "200 OK", ms: "194 ms" },
    { host: "worker-sync.app/status", interval: "30m", code: "200 OK", ms: "92 ms" },
  ];

  return (
    <div className="w-full h-full bg-[#0A0D16] flex flex-col justify-between p-4 sm:p-5 select-none text-left">
      <div
        className={`flex items-center justify-between border-b border-white/[0.08] pb-2.5 gap-2 ${
          expanded ? "pr-12" : ""
        }`}
      >
        <div className="flex items-center gap-2 min-w-0">
          <Activity className="w-3.5 h-3.5 text-slate-400 shrink-0" aria-hidden="true" />
          <span className="font-mono text-[11px] sm:text-[12px] text-slate-200 truncate">
            nikbrothers.onrender.com · 30s tick
          </span>
        </div>
        <span className="font-mono text-[11px] text-slate-400 flex items-center gap-1 whitespace-nowrap shrink-0">
          <ShieldCheck className="w-3.5 h-3.5 text-slate-400" aria-hidden="true" />
          SSRF Guard
        </span>
      </div>

      <div className="my-auto py-2 divide-y divide-white/[0.06] font-mono tabular-nums">
        {rows.map((row) => (
          <div
            key={row.host}
            className={`flex items-center justify-between gap-2 ${
              expanded ? "py-2 text-[12px]" : "py-1.5 text-[11px]"
            }`}
          >
            <span className="text-slate-200 truncate min-w-0">{row.host}</span>
            <div className="flex items-center gap-2.5 shrink-0">
              <span className="text-slate-500">{row.interval}</span>
              <span className="text-emerald-400">{row.code}</span>
              <span className="text-slate-400 w-12 text-right">{row.ms}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-white/[0.08] pt-2.5 flex items-center justify-between gap-2 font-mono text-[11px] text-slate-400">
        <span className="truncate">Firebase Auth · Firestore</span>
        <span className="whitespace-nowrap shrink-0">GET Probes</span>
      </div>
    </div>
  );
};

const ShrcodePreview = ({ expanded = false }) => (
  <div className="w-full h-full bg-[#0A0D16] flex flex-col justify-between p-4 sm:p-5 select-none text-left">
    <div
      className={`flex items-center justify-between border-b border-white/[0.08] pb-2.5 gap-2 ${
        expanded ? "pr-12" : ""
      }`}
    >
      <div className="flex items-center gap-2 min-w-0">
        <Code2 className="w-3.5 h-3.5 text-slate-400 shrink-0" aria-hidden="true" />
        <span className="font-mono text-[11px] sm:text-[12px] text-slate-200 truncate">
          shrcode.netlify.app
        </span>
      </div>
      <span className="font-mono text-[11px] text-slate-400 tabular-nums whitespace-nowrap shrink-0">
        Room 849-210
      </span>
    </div>

    <div
      className={`my-auto py-2 font-mono ${
        expanded ? "text-[12px] sm:text-[13px] leading-[1.65]" : "text-[11px] leading-[1.55]"
      } text-slate-300 overflow-hidden`}
    >
      <div className="text-slate-500">src/pages/DirectShare.tsx</div>
      <pre className="mt-1.5 text-slate-200 whitespace-pre-wrap break-words">
{`const payload = await shareSnippet({
  code: "849-210",
  mode: "direct-transfer",
  sync: "realtime",
});`}
      </pre>
    </div>

    <div className="border-t border-white/[0.08] pt-2.5 flex items-center justify-between gap-2 font-mono text-[11px] text-slate-400">
      <span className="truncate">SendCode · ReceiveCode · CodeDetail</span>
      <span className="text-slate-200 whitespace-nowrap shrink-0">TypeScript · React</span>
    </div>
  </div>
);

const ProjectPreview = ({ projectId, expanded = false }) => {
  if (projectId === "mermai-blockchain") {
    return <MermaiPreview expanded={expanded} />;
  }
  if (projectId === "dvra") {
    return <DvraPreview expanded={expanded} />;
  }
  if (projectId === "nikwake") {
    return <NikwakePreview expanded={expanded} />;
  }
  return <ShrcodePreview expanded={expanded} />;
};

export default ProjectPreview;
