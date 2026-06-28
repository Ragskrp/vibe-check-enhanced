"use client";
/**
 * FleurirQuizClient.js
 * Quiz runner for the Fleurir / Arithmia GCSE Maths module.
 * Handles MCQ, True/False, Fill-blank, Spot-mistake question types.
 * Awards Bronze / Silver / Gold tier based on score vs tier thresholds.
 *
 * Props:
 *   quizData  — the `quizLevel` object from a sub-topic JSON
 *   topicTitle — string, shown in the header
 *   onComplete — (result: { score, tier, total }) => void
 */

import React, { useState, useCallback } from "react";

/* ── tier helpers ─────────────────────────────────────────────── */
function getTier(score, tiers) {
  if (score >= tiers.gold.minScore)   return "gold";
  if (score >= tiers.silver.minScore) return "silver";
  if (score >= tiers.bronze.minScore) return "bronze";
  return "none";
}

const TIER_META = {
  gold:   { label: "Gold",   color: "#F5C518", icon: "🏅" },
  silver: { label: "Silver", color: "#C0C0C0", icon: "🥈" },
  bronze: { label: "Bronze", color: "#CD7F32", icon: "🥉" },
  none:   { label: "Keep Going", color: "#8A8A8A", icon: "📖" },
};

/* ── styles (inline, token-aligned) ──────────────────────────── */
const S = {
  wrap: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #0D0A1A 0%, #1A1035 100%)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: "32px 16px",
    fontFamily: "'Playfair Display', 'Georgia', serif",
    color: "#F5EFE0",
  },
  card: {
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.12)",
    borderRadius: 16,
    padding: "32px",
    maxWidth: 680,
    width: "100%",
    backdropFilter: "blur(12px)",
    boxShadow: "0 8px 40px rgba(0,0,0,0.4)",
  },
  progress: {
    height: 6,
    borderRadius: 99,
    background: "rgba(255,255,255,0.1)",
    marginBottom: 24,
    overflow: "hidden",
  },
  progressFill: (pct) => ({
    height: "100%",
    width: `${pct}%`,
    background: "linear-gradient(90deg, #9B7FE8, #E8B4F0)",
    borderRadius: 99,
    transition: "width 0.4s ease",
  }),
  qNumber: {
    fontSize: 12,
    letterSpacing: "0.12em",
    color: "#9B7FE8",
    textTransform: "uppercase",
    marginBottom: 8,
  },
  prompt: {
    fontSize: 18,
    lineHeight: 1.6,
    marginBottom: 24,
  },
  optionBtn: (selected, correct, answered) => ({
    display: "block",
    width: "100%",
    textAlign: "left",
    padding: "14px 18px",
    marginBottom: 10,
    borderRadius: 10,
    border: answered
      ? correct
        ? "2px solid #5EC47E"
        : selected
        ? "2px solid #E87F7F"
        : "1px solid rgba(255,255,255,0.08)"
      : selected
      ? "2px solid #9B7FE8"
      : "1px solid rgba(255,255,255,0.15)",
    background: answered
      ? correct
        ? "rgba(94,196,126,0.15)"
        : selected
        ? "rgba(232,127,127,0.15)"
        : "transparent"
      : selected
      ? "rgba(155,127,232,0.2)"
      : "rgba(255,255,255,0.04)",
    color: "#F5EFE0",
    fontSize: 15,
    cursor: answered ? "default" : "pointer",
    transition: "all 0.2s ease",
  }),
  input: {
    width: "100%",
    padding: "12px 16px",
    borderRadius: 10,
    border: "1px solid rgba(255,255,255,0.2)",
    background: "rgba(255,255,255,0.07)",
    color: "#F5EFE0",
    fontSize: 16,
    fontFamily: "inherit",
    outline: "none",
    marginBottom: 12,
  },
  hint: {
    fontSize: 13,
    color: "#C4A8FF",
    background: "rgba(155,127,232,0.12)",
    padding: "10px 14px",
    borderRadius: 8,
    marginTop: 12,
    lineHeight: 1.5,
  },
  btn: (variant = "primary") => ({
    padding: "12px 28px",
    borderRadius: 10,
    border: "none",
    cursor: "pointer",
    fontSize: 15,
    fontWeight: 600,
    fontFamily: "inherit",
    background:
      variant === "primary"
        ? "linear-gradient(135deg, #9B7FE8, #E8B4F0)"
        : "rgba(255,255,255,0.08)",
    color: variant === "primary" ? "#0D0A1A" : "#F5EFE0",
    transition: "opacity 0.2s",
    marginTop: 8,
  }),
  resultWrap: {
    textAlign: "center",
    padding: 16,
  },
  tierBadge: (color) => ({
    display: "inline-block",
    padding: "8px 24px",
    borderRadius: 99,
    border: `2px solid ${color}`,
    color,
    fontSize: 14,
    fontWeight: 700,
    letterSpacing: "0.1em",
    marginBottom: 16,
  }),
};

/* ── question renderers ───────────────────────────────────────── */
function ChoiceQuestion({ q, answered, selected, onSelect }) {
  return (
    <>
      {q.options.map((opt) => (
        <button
          key={opt}
          style={S.optionBtn(
            selected === opt,
            answered && opt === q.correctAnswer.value,
            answered
          )}
          onClick={() => !answered && onSelect(opt)}
        >
          {opt}
        </button>
      ))}
    </>
  );
}

function FillBlankQuestion({ answered, userText, onType }) {
  return (
    <input
      style={S.input}
      type="text"
      placeholder="Type your answer…"
      value={userText}
      onChange={(e) => !answered && onType(e.target.value)}
      disabled={answered}
    />
  );
}

/* ── main component ───────────────────────────────────────────── */
export default function FleurirQuizClient({ quizData, topicTitle, onComplete }) {
  const questions = quizData.questions;
  const tiers = quizData.tiers;
  const total = questions.length;

  const [idx, setIdx]           = useState(0);
  const [selected, setSelected] = useState(null);   // for choice types
  const [userText, setUserText] = useState("");      // for fill_blank
  const [answered, setAnswered] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [score, setScore]       = useState(0);
  const [finished, setFinished] = useState(false);

  const q = questions[idx];
  const isFill = q?.type === "fill_blank";
  const pct    = ((idx) / total) * 100;

  const currentAnswer = isFill ? userText.trim() : selected;

  const checkCorrect = useCallback(() => {
    const ans = isFill ? userText.trim() : selected;
    return ans?.toLowerCase() === q.correctAnswer.value?.toString().toLowerCase();
  }, [isFill, userText, selected, q]);

  function handleSubmit() {
    if (!currentAnswer) return;
    const correct = checkCorrect();
    setAnswered(true);
    if (correct) setScore((s) => s + 1);
  }

  function handleNext() {
    if (idx + 1 >= total) {
      const finalScore = score + (checkCorrect() ? 1 : 0);
      // recompute from answered state — score already updated via handleSubmit
      const tier = getTier(score + (answered && checkCorrect() ? 0 : 0), tiers);
      // use `score` which was already updated when answered
      setFinished(true);
      onComplete?.({ score, tier: getTier(score, tiers), total });
    } else {
      setIdx((i) => i + 1);
      setSelected(null);
      setUserText("");
      setAnswered(false);
      setShowHint(false);
    }
  }

  /* ── result screen ── */
  if (finished) {
    const tier = getTier(score, tiers);
    const meta = TIER_META[tier];
    return (
      <div style={S.wrap}>
        <div style={{ ...S.card, ...S.resultWrap }}>
          <div style={{ fontSize: 56, marginBottom: 12 }}>{meta.icon}</div>
          <div style={S.tierBadge(meta.color)}>{meta.label}</div>
          <h2 style={{ fontSize: 24, marginBottom: 8 }}>
            {score} / {total} correct
          </h2>
          <p style={{ color: "#C4A8FF", fontSize: 15, marginBottom: 24 }}>
            {tier === "gold"
              ? "Outstanding! You've restored the Gallery completely."
              : tier === "silver"
              ? "Well done — a few more steps and the vault opens."
              : tier === "bronze"
              ? "You've made a start. Revisit the lesson and try again."
              : "The Unraveller still holds sway. Study and return."}
          </p>
          {tier !== "gold" && (
            <button style={S.btn("secondary")} onClick={() => onComplete?.({ retry: true })}>
              Try Again
            </button>
          )}
          <button style={{ ...S.btn("primary"), marginLeft: 12 }} onClick={() => onComplete?.({ score, tier, total })}>
            Continue →
          </button>
        </div>
      </div>
    );
  }

  /* ── quiz screen ── */
  return (
    <div style={S.wrap}>
      <div style={S.card}>
        {/* header */}
        <div style={{ fontSize: 12, color: "#9B7FE8", letterSpacing: "0.12em", marginBottom: 4 }}>
          ✦ {topicTitle} — Quiz
        </div>

        {/* progress bar */}
        <div style={S.progress}>
          <div style={S.progressFill(pct)} />
        </div>

        {/* question number */}
        <div style={S.qNumber}>
          Question {idx + 1} of {total}
        </div>

        {/* prompt */}
        <p style={S.prompt}>{q.prompt}</p>

        {/* answer area */}
        {isFill ? (
          <FillBlankQuestion answered={answered} userText={userText} onType={setUserText} />
        ) : (
          <ChoiceQuestion
            q={q}
            answered={answered}
            selected={selected}
            onSelect={setSelected}
          />
        )}

        {/* feedback */}
        {answered && (
          <div
            style={{
              padding: "10px 14px",
              borderRadius: 8,
              marginBottom: 12,
              background: checkCorrect()
                ? "rgba(94,196,126,0.12)"
                : "rgba(232,127,127,0.12)",
              color: checkCorrect() ? "#5EC47E" : "#E87F7F",
              fontSize: 14,
            }}
          >
            {checkCorrect() ? "✓ Correct!" : `✗ Incorrect. The answer is: ${q.correctAnswer.value}`}
          </div>
        )}

        {/* hint */}
        {showHint && <div style={S.hint}>💡 {q.hint}</div>}

        {/* actions */}
        <div style={{ display: "flex", gap: 10, marginTop: 16, flexWrap: "wrap" }}>
          {!answered && (
            <>
              <button
                style={S.btn("secondary")}
                onClick={() => setShowHint(true)}
                disabled={showHint}
              >
                Hint
              </button>
              <button
                style={S.btn("primary")}
                onClick={handleSubmit}
                disabled={!currentAnswer}
              >
                Submit
              </button>
            </>
          )}
          {answered && (
            <button style={S.btn("primary")} onClick={handleNext}>
              {idx + 1 >= total ? "See Results" : "Next →"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
