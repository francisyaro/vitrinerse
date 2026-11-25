"use client";

import { useState } from "react";
import { Calendar, Clock, MessageSquare, Sparkles } from "lucide-react";
import type { PanelTheme, ProgramSession, SessionType } from "@/types/rse";

const SESSION_BADGE: Record<SessionType, { label: string; cls: string }> = {
  ceremonie: { label: "Cérémonie", cls: "bg-slate-100 text-slate-800" },
  conference: { label: "Conférence inaugurale", cls: "bg-emerald-100 text-emerald-900" },
  panel: { label: "Panel", cls: "bg-amber-100 text-amber-900" },
  communication: { label: "Communication", cls: "bg-sky-50 text-sky-900" },
  formation: { label: "Formation", cls: "bg-teal-100 text-teal-900" },
  exposition: { label: "F.C.P.E / Stands", cls: "bg-yellow-100 text-yellow-900" },
  reseautage: { label: "Réseautage", cls: "bg-stone-100 text-stone-700" },
  trophee: { label: "Trophées", cls: "bg-orange-100 text-orange-900" },
};

interface ProgramSectionProps {
  program: ProgramSession[];
  panels?: PanelTheme[];
}

export function ProgramSection({ program, panels }: ProgramSectionProps) {
  const [activeDay, setActiveDay] = useState<1 | 2 | 3>(1);

  const days: Array<{ num: 1 | 2 | 3; label: string; sub: string }> = [
    { num: 1, label: "Jour 1", sub: "Jeudi 3 juin 2027" },
    { num: 2, label: "Jour 2", sub: "Vendredi 4 juin 2027" },
    { num: 3, label: "Jour 3", sub: "Samedi 5 juin 2027" },
  ];

  const daySessions = program.filter((s) => s.dayNumber === activeDay);

  return (
    <div className="space-y-14">
      {/* Program Tabs */}
      <div>
        <div
          role="tablist"
          aria-label="Jours du programme"
          className="inline-flex flex-wrap gap-2 rounded-2xl bg-slate-100 p-1.5"
        >
          {days.map((d) => {
            const active = activeDay === d.num;
            return (
              <button
                key={d.num}
                role="tab"
                type="button"
                aria-selected={active}
                onClick={() => setActiveDay(d.num)}
                className={`rounded-xl px-4 py-2.5 text-left transition-all ${
                  active
                    ? "bg-[#115338] text-white shadow-sm"
                    : "text-slate-700 hover:bg-white/70"
                }`}
              >
                <span className="block text-sm font-bold">{d.label}</span>
                <span
                  className={`block text-xs ${
                    active ? "text-emerald-100" : "text-slate-500"
                  }`}
                >
                  {d.sub}
                </span>
              </button>
            );
          })}
        </div>

        <div className="mt-6 divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white shadow-sm">
          {daySessions.map((session) => {
            const badge = SESSION_BADGE[session.type];
            return (
              <div
                key={session.id}
                className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between sm:px-6"
              >
                <div className="flex items-start gap-4">
                  <div className="flex shrink-0 items-center gap-1.5 rounded-lg bg-slate-50 px-3 py-1.5 font-mono text-xs font-semibold text-slate-700 border border-slate-200">
                    <Clock className="h-3.5 w-3.5 text-[#115338]" />
                    {session.timeRange}
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      {session.actNumber && (
                        <span className="text-xs font-bold uppercase tracking-wider text-[#E8830C]">
                          {session.actNumber}
                        </span>
                      )}
                      <span
                        className={`inline-flex rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${badge.cls}`}
                      >
                        {badge.label}
                      </span>
                    </div>
                    <h4 className="mt-1 font-display text-sm font-semibold text-slate-900 sm:text-base">
                      {session.title}
                    </h4>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 6 Panels Grid */}
      {panels && panels.length > 0 && (
        <div>
          <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#E8830C]">
                <Sparkles className="h-3.5 w-3.5" />
                Termes de Référence officiels
              </span>
              <h3 className="mt-1 font-display text-2xl font-bold text-slate-900">
                Les 6 Panels thématiques — Vitrine RSE 2027
              </h3>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {panels.map((panel) => (
              <article
                key={panel.id}
                className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="inline-flex items-center rounded-lg bg-[#115338] px-2.5 py-1 text-xs font-bold text-white">
                      Panel {panel.panelNumber}
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs font-medium text-slate-500">
                      <Calendar className="h-3.5 w-3.5 text-[#E8830C]" />
                      {panel.scheduleLabel}
                    </span>
                  </div>
                  <h4 className="mt-4 font-display text-base font-bold leading-snug text-slate-900">
                    {panel.title}
                  </h4>
                  <p className="mt-3 flex items-start gap-2 rounded-xl bg-emerald-50/70 p-3 text-xs leading-relaxed text-emerald-950">
                    <MessageSquare className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#115338]" />
                    <span>{panel.mainQuestion}</span>
                  </p>
                </div>

                <ul className="mt-4 space-y-1.5 border-t border-slate-100 pt-3 text-xs text-slate-600">
                  {panel.keyPoints.map((pt) => (
                    <li key={pt} className="flex items-start gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#E8830C]" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
