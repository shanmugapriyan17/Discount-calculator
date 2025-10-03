\
        import React, { useEffect, useMemo, useRef, useState } from "react";

        // Single-file React component. Default export at bottom.
        // Drop this file into a Vite/CRA/Next project and import it into your App.

        const styles = `
        :root{
          --bg-0: #071014;
          --bg-1: #0b1216;
          --panel: rgba(255,255,255,0.04);
          --muted: #9aa1a6;
          --text: #eef6fb;
          --accent: #e94f5d;
          --soft: rgba(255,255,255,0.03);
          --glass: rgba(255,255,255,0.025);
          --radius: 14px;
          --container: 1200px;
        }
        *{box-sizing:border-box}
        html,body,#root{height:100%;}
        body{
          margin:0;
          background: radial-gradient(1200px 600px at 10% 10%, rgba(233,79,93,0.06), transparent),
                      linear-gradient(180deg,var(--bg-0), var(--bg-1));
          color:var(--text);
          font-family: Inter, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial;
          -webkit-font-smoothing:antialiased;
          -moz-osx-font-smoothing:grayscale;
          padding:48px 20px;
        }
        .app{
          max-width:var(--container);
          margin:0 auto;
          display:grid;
          grid-template-columns: 1fr 420px;
          gap:28px;
          align-items:start;
        }
        .header{
          grid-column:1/-1;
          display:flex;
          justify-content:space-between;
          align-items:center;
          gap:12px;
        }
        .brand{
          display:flex;
          gap:14px;
          align-items:center;
        }
        .logo{
          width:56px;height:56px;border-radius:12px;background:linear-gradient(135deg, rgba(233,79,93,0.16), rgba(233,79,93,0.06));
          display:flex;align-items:center;justify-content:center;box-shadow: 0 6px 18px rgba(0,0,0,0.6);
        }
        .logo svg{filter:drop-shadow(0 6px 14px rgba(0,0,0,0.6));}
        .title{font-size:18px;font-weight:600}
        .subtitle{font-size:13px;color:var(--muted)}

        .card{
          background: linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01));
          border-radius:var(--radius);
          padding:20px;
          box-shadow: 0 8px 30px rgba(2,6,10,0.6), inset 0 1px 0 rgba(255,255,255,0.02);
          border: 1px solid var(--soft);
        }
        .panel{
          backdrop-filter: blur(6px);
          border-radius:var(--radius);
        }

        .main-card{
          display:flex;flex-direction:column;gap:16px;
        }
        .inputs{display:grid;grid-template-columns:1fr 1fr;gap:12px}
        .input-row{display:flex;flex-direction:column;gap:6px}
        label{font-size:13px;color:var(--muted)}
        .input{background:var(--panel);border-radius:12px;padding:10px 12px;border:1px solid transparent;color:var(--text);font-size:16px}
        .input:focus{outline:none;border-color:rgba(233,79,93,0.14);box-shadow:0 6px 30px rgba(233,79,93,0.06)}
        .range{width:100%}
        .slider-wrap{display:flex;gap:12px;align-items:center}
        .slider-value{min-width:74px;text-align:right;font-weight:600}

        .h-row{display:flex;gap:12px;align-items:center}
        .icon-btn{background:transparent;border:1px solid var(--soft);padding:8px;border-radius:10px;cursor:pointer}
        .icon-btn:hover{transform:translateY(-2px)}

        .summary{
          display:flex;flex-direction:column;gap:10px;padding:16px;border-radius:12px;background:linear-gradient(180deg, rgba(255,255,255,0.015), rgba(255,255,255,0.01));border:1px solid var(--soft)
        }
        .summary .line{display:flex;justify-content:space-between;align-items:center}
        .big{font-size:20px;font-weight:700}
        .muted{color:var(--muted)}
        .saving{color:var(--accent);font-weight:700}

        .footer-actions{display:flex;gap:10px;justify-content:flex-end}
        .btn{background:linear-gradient(90deg,var(--accent),#ff7b84);border:none;padding:10px 14px;border-radius:12px;color:white;font-weight:600;cursor:pointer}
        .btn.ghost{background:transparent;border:1px solid var(--soft);color:var(--text)}
        .btn:active{transform:translateY(1px)}

        .preset-list{display:flex;gap:8px;flex-wrap:wrap}
        .preset{padding:8px 10px;border-radius:10px;background:transparent;border:1px dashed var(--soft);cursor:pointer}
        .preset:hover{border-style:solid}

        .right-column{position:sticky;top:48px}
        .preview-card{display:flex;flex-direction:column;gap:14px}
        .preview-price{font-size:36px;font-weight:800}
        .preview-sub{color:var(--muted)}
        .badge{display:inline-block;padding:6px 8px;border-radius:999px;background:rgba(233,79,93,0.12);color:var(--accent);font-weight:700}

        .small{font-size:12px;color:var(--muted)}
        .note{font-size:12px;padding:10px;border-radius:10px;background:rgba(255,255,255,0.01);border:1px solid rgba(255,255,255,0.02)}

        /* mobile improvements */
        @media (max-width:980px){
          body{padding:28px 14px;}
          .app{grid-template-columns:1fr;}
          .right-column{position:relative;top:0}
          .header{flex-direction:column;align-items:flex-start;gap:10px}
          .logo{width:48px;height:48px}
          .preview-price{font-size:28px}
          .inputs{grid-template-columns:1fr}
        }
        @media (max-width:480px){
          body{padding:18px 12px;}
          .logo{width:44px;height:44px}
          .title{font-size:16px}
          .subtitle{font-size:12px}
          .card{padding:14px}
          .input{font-size:15px;padding:8px 10px}
          .btn{padding:8px 10px;font-size:14px}
          .preview-price{font-size:22px}
        }
        `;

        const sampleCoupons = {
          SAVE10: { type: "percent", value: 10, label: "Save 10%" },
          FLAT50: { type: "flat", value: 50, label: "₹50 off" },
          HALF: { type: "percent", value: 50, label: "Half price" },
        };

        const currencySymbols = { USD: "$", INR: "₹", EUR: "€" };

        function fmt(num, currency = "USD") {
          if (!isFinite(num)) return "—";
          try {
            return new Intl.NumberFormat(undefined, { style: "currency", currency }).format(num);
          } catch (e) {
            const s = currencySymbols[currency] ?? "";
            return s + Number(num).toFixed(2);
          }
        }

        export default function DiscountCalculator() {
          const [price, setPrice] = useState(1299.99);
          const [discount, setDiscount] = useState(20);
          const [qty, setQty] = useState(1);
          const [tax, setTax] = useState(0);
          const [shipping, setShipping] = useState(0);
          const [coupon, setCoupon] = useState("");
          const [appliedCoupon, setAppliedCoupon] = useState(null);
          const [currency, setCurrency] = useState("INR");
          const [roundMode, setRoundMode] = useState("2dec");
          const [presets, setPresets] = useState(() => {
            try {
              return JSON.parse(localStorage.getItem("dc_presets") || "[]");
            } catch (e) {
              return [];
            }
          });
          const nameRef = useRef();

          // calculations
          const rawDiscountAmount = useMemo(() => (Number(price) || 0) * (Number(discount) || 0) / 100, [price, discount]);
          const rawFinal = useMemo(() => (Number(price) || 0) - rawDiscountAmount, [price, rawDiscountAmount]);

          const couponEffect = useMemo(() => {
            if (!appliedCoupon) return { type: null, value: 0, discountAmount: 0 };
            if (appliedCoupon.type === "percent") {
              const extra = rawFinal * (appliedCoupon.value / 100);
              return { ...appliedCoupon, discountAmount: extra };
            }
            if (appliedCoupon.type === "flat") {
              return { ...appliedCoupon, discountAmount: Math.min(appliedCoupon.value, rawFinal) };
            }
            return { type: null, value: 0, discountAmount: 0 };
          }, [appliedCoupon, rawFinal]);

          const finalAfterCoupon = useMemo(() => Math.max(0, rawFinal - couponEffect.discountAmount), [rawFinal, couponEffect]);

          const finalRounded = useMemo(() => {
            if (!isFinite(finalAfterCoupon)) return 0;
            switch (roundMode) {
              case "2dec":
                return Math.round(finalAfterCoupon * 100) / 100;
              case "ceil":
                return Math.ceil(finalAfterCoupon);
              case "floor":
                return Math.floor(finalAfterCoupon);
              default:
                return finalAfterCoupon;
            }
          }, [finalAfterCoupon, roundMode]);

          const subtotal = Number(qty) * finalRounded;
          const taxAmount = subtotal * (Number(tax) || 0) / 100;
          const total = subtotal + Number(shipping || 0) + taxAmount;
          const savingPerItem = (Number(price || 0) - finalRounded);
          const savingTotal = savingPerItem * Number(qty || 0);

          useEffect(() => {
            localStorage.setItem("dc_presets", JSON.stringify(presets));
          }, [presets]);

          function applyCouponCode(code) {
            const c = sampleCoupons[code?.toUpperCase()?.trim()];
            if (!c) return false;
            setAppliedCoupon(c);
            setCoupon("");
            return true;
          }

          function clearCoupon() { setAppliedCoupon(null); }

          function savePreset() {
            const n = nameRef.current?.value?.trim() || `Preset ${presets.length + 1}`;
            const p = { id: Date.now(), name: n, price, discount, qty, tax, shipping, currency, roundMode };
            setPresets(prev => [p, ...prev].slice(0, 12));
            if (nameRef.current) nameRef.current.value = "";
          }

          function loadPreset(p) {
            setPrice(p.price);
            setDiscount(p.discount);
            setQty(p.qty);
            setTax(p.tax);
            setShipping(p.shipping);
            setCurrency(p.currency || "INR");
            setRoundMode(p.roundMode || "2dec");
          }

          function removePreset(id) {
            setPresets(prev => prev.filter(x => x.id !== id));
          }

          function resetAll() {
            setPrice(0);
            setDiscount(0);
            setQty(1);
            setTax(0);
            setShipping(0);
            setAppliedCoupon(null);
            setCoupon("");
          }

          async function copySummary() {
            const txt = `Price: ${fmt(price, currency)}\\nDiscount: ${discount}%\\nFinal per item: ${fmt(finalRounded, currency)}\\nQuantity: ${qty}\\nTotal: ${fmt(total, currency)}\\nSavings total: ${fmt(savingTotal, currency)}`;
            try {
              await navigator.clipboard.writeText(txt);
              alert("Summary copied to clipboard");
            } catch (e) {
              alert("Could not copy — please copy manually.");
            }
          }

          return (
            <div className="app">
              <style dangerouslySetInnerHTML={{ __html: styles }} />

              <div className="header">
                <div className="brand">
                  <div className="logo card" aria-hidden>
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M3 12h18M12 3v18" stroke="url(#g)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                      <defs>
                        <linearGradient id="g" x1="0" x2="1" y1="0" y2="1">
                          <stop offset="0" stopColor="#e94f5d" stopOpacity="0.98" />
                          <stop offset="1" stopColor="#ff7b84" stopOpacity="0.98" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                  <div>
                    <div className="title">Discount Studio</div>
                    <div className="subtitle">Smart, quick discount & pricing breakdown</div>
                  </div>
                </div>

                <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                  <div className="small muted">Currency</div>
                  <select className="input" value={currency} onChange={e => setCurrency(e.target.value)} style={{ width: 120 }}>
                    <option value="INR">INR</option>
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                  </select>
                </div>
              </div>

              <div className="card main-card panel" role="region" aria-label="Calculator">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ fontSize: 16, fontWeight: 700 }}>Calculator</div>
                  <div className="small muted">Live results as you type — all calculations round as selected</div>
                </div>

                <div className="inputs">
                  <div className="input-row">
                    <label>Original Price</label>
                    <input
                      className="input"
                      inputMode="decimal"
                      value={price}
                      onChange={e => setPrice(Number(e.target.value))}
                      aria-label="Original price"
                    />
                  </div>

                  <div className="input-row">
                    <label>Quantity</label>
                    <input className="input" type="number" min="1" value={qty} onChange={e => setQty(Number(e.target.value))} />
                  </div>

                  <div className="input-row">
                    <label>Discount %</label>
                    <div className="slider-wrap">
                      <input className="input range" type="range" min="0" max="100" value={discount} onChange={e => setDiscount(Number(e.target.value))} />
                      <div className="slider-value">{discount}%</div>
                    </div>
                  </div>

                  <div className="input-row">
                    <label>Discount Amount</label>
                    <div className="h-row">
                      <div className="input" style={{ flex: 1 }}>{fmt(rawDiscountAmount, currency)}</div>
                      <button className="icon-btn" title="Set as discount" onClick={() => {
                        const percent = price ? Math.round((rawDiscountAmount / price) * 100) : 0;
                        setDiscount(percent);
                      }}>set</button>
                    </div>
                  </div>

                  <div className="input-row">
                    <label>Final Price (per item)</label>
                    <div className="input">{fmt(rawFinal, currency)}</div>
                  </div>

                  <div className="input-row">
                    <label>Tax %</label>
                    <input className="input" type="number" min="0" value={tax} onChange={e => setTax(Number(e.target.value))} />
                  </div>

                  <div className="input-row">
                    <label>Shipping (flat)</label>
                    <input className="input" type="number" min="0" value={shipping} onChange={e => setShipping(Number(e.target.value))} />
                  </div>

                  <div style={{ gridColumn: "1/-1", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                    <div>
                      <label>Coupon code</label>
                      <div style={{ display: "flex", gap: 8 }}>
                        <input className="input" value={coupon} onChange={e => setCoupon(e.target.value)} placeholder="e.g. SAVE10" />
                        <button className="btn" onClick={() => {
                          const ok = applyCouponCode(coupon);
                          if (!ok) alert("Coupon not recognized — try SAVE10, FLAT50 or HALF");
                        }}>Apply</button>
                      </div>
                      {appliedCoupon ? (
                        <div style={{ marginTop: 8 }} className="note">Applied: <strong>{appliedCoupon.label}</strong> — <button className="icon-btn" onClick={clearCoupon}>Remove</button></div>
                      ) : (
                        <div style={{ marginTop: 8 }} className="small muted">Try sample: SAVE10, FLAT50, HALF</div>
                      )}
                    </div>

                    <div>
                      <label>Rounding</label>
                      <select className="input" value={roundMode} onChange={e => setRoundMode(e.target.value)}>
                        <option value="2dec">2 decimals</option>
                        <option value="ceil">Round up (ceil)</option>
                        <option value="floor">Round down (floor)</option>
                      </select>
                    </div>
                  </div>

                  <div style={{ gridColumn: "1/-1", display: "flex", gap: 12, alignItems: "center", justifyContent: "space-between" }}>
                    <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                      <input ref={nameRef} className="input" placeholder="Preset name (optional)" />
                      <button className="btn ghost" onClick={savePreset}>Save preset</button>
                    </div>

                    <div className="preset-list">
                      {presets.length === 0 ? <div className="muted small">No presets</div> : presets.map(p => (
                        <div key={p.id} style={{ display: "flex", gap: 8, alignItems: "center" }}>
                          <button className="preset" onClick={() => loadPreset(p)} title="Load">{p.name}</button>
                          <button className="icon-btn" onClick={() => removePreset(p.id)} title="Delete">✕</button>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 6 }}>
                  <div className="small muted">Tip: Click "set" to convert a discount amount into percent.</div>
                  <div className="footer-actions">
                    <button className="btn ghost" onClick={resetAll}>Reset</button>
                    <button className="btn" onClick={copySummary}>Copy summary</button>
                  </div>
                </div>
              </div>

              <div className="right-column">
                <div className="card preview-card panel">
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                      <div className="preview-sub">Per item</div>
                      <div className="preview-price">{fmt(finalRounded, currency)}</div>
                      <div className="preview-sub small muted">Original: <span style={{ textDecoration: "line-through", marginLeft: 8 }}>{fmt(price, currency)}</span></div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div className="badge">{discount}%</div>
                      <div style={{ marginTop: 8 }} className="small muted">Qty {qty} • Tax {tax}%</div>
                    </div>
                  </div>

                  <div className="summary">
                    <div className="line"><div className="muted">Subtotal</div><div className="big">{fmt(subtotal, currency)}</div></div>
                    <div className="line"><div className="muted">Tax</div><div className="muted">{fmt(taxAmount, currency)}</div></div>
                    <div className="line"><div className="muted">Shipping</div><div className="muted">{fmt(Number(shipping || 0), currency)}</div></div>
                    <div style={{ height: 1, background: "rgba(255,255,255,0.02)", borderRadius: 2 }} />
                    <div className="line"><div style={{ fontWeight: 700 }}>Total</div><div style={{ fontSize: 18, fontWeight: 800 }}>{fmt(total, currency)}</div></div>
                    <div className="line"><div className="muted">You save</div><div className="saving">{fmt(savingTotal, currency)}</div></div>

                    <div style={{ display: "flex", gap: 8, justifyContent: "space-between", alignItems: "center" }}>
                      <div className="small muted">Coupon: {appliedCoupon ? appliedCoupon.label : "—"}</div>
                      <div style={{ display: "flex", gap: 8 }}>
                        <button className="btn ghost" onClick={() => {
                          setPrice(prev => Math.max(0, prev - 10));
                        }}>Test -10</button>
                        <button className="btn" onClick={() => alert("Use ctrl/cmd+C to copy, or use the Copy summary button")}>Share</button>
                      </div>
                    </div>
                  </div>

                  <div className="note small">
                    <strong>Pro tip:</strong> Save presets for frequently used discounts (e.g. "Festive sale"). Use rounding to present neat final prices.
                  </div>
                </div>

                <div style={{ height: 18 }} />

                <div className="card panel">
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div style={{ fontWeight: 700 }}>Quick actions</div>
                    <div className="small muted">Utilities</div>
                  </div>

                  <div style={{ display: "flex", gap: 8, marginTop: 12, flexWrap: "wrap" }}>
                    <button className="preset" onClick={() => { setDiscount(10); }}>10% off</button>
                    <button className="preset" onClick={() => { setDiscount(25); }}>25% off</button>
                    <button className="preset" onClick={() => { setDiscount(50); }}>50% off</button>
                    <button className="preset" onClick={() => { setDiscount(70); }}>70% off</button>
                  </div>

                  <div style={{ marginTop: 12 }}>
                    <div className="small muted">Sample coupons available in this demo:</div>
                    <ul>
                      {Object.entries(sampleCoupons).map(([k, v]) => <li key={k} style={{ marginTop: 6 }}><strong>{k}</strong>: {v.label}</li>)}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          );
        }
