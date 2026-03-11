import { useState, useEffect } from "react";

const API = "http://localhost:8000";

const theme = {
  bg: "#0f1a0f",
  surface: "#162016",
  card: "#1a2b1a",
  border: "#2a3d2a",
  green: "#4ade80",
  greenDim: "#22c55e",
  greenMuted: "#166534",
  greenGlow: "rgba(74,222,128,0.15)",
  text: "#e8f5e8",
  textMuted: "#6b9e6b",
  textDim: "#4a6b4a",
  accent: "#a3e635",
  red: "#f87171",
};

const styles = {
  app: {
    minHeight: "100vh",
    background: theme.bg,
    backgroundImage: `radial-gradient(ellipse at 20% 20%, rgba(74,222,128,0.06) 0%, transparent 60%),
                      radial-gradient(ellipse at 80% 80%, rgba(163,230,53,0.04) 0%, transparent 60%)`,
    fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
    color: theme.text,
    padding: "0",
  },
  header: {
    borderBottom: `1px solid ${theme.border}`,
    padding: "24px 40px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    background: `rgba(22,32,22,0.8)`,
    backdropFilter: "blur(12px)",
    position: "sticky",
    top: 0,
    zIndex: 100,
  },
  logo: {
    fontSize: "22px",
    fontWeight: "700",
    letterSpacing: "-0.5px",
    color: theme.green,
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  logoLeaf: {
    fontSize: "24px",
  },
  tagline: {
    fontSize: "13px",
    color: theme.textMuted,
    letterSpacing: "0.5px",
  },
  main: {
    maxWidth: "1100px",
    margin: "0 auto",
    padding: "40px 24px",
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "28px",
    alignItems: "start",
  },
  card: {
    background: theme.card,
    border: `1px solid ${theme.border}`,
    borderRadius: "20px",
    padding: "28px",
    position: "relative",
    overflow: "hidden",
  },
  cardGlow: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "2px",
    background: `linear-gradient(90deg, transparent, ${theme.green}, transparent)`,
  },
  cardTitle: {
    fontSize: "13px",
    fontWeight: "600",
    letterSpacing: "2px",
    textTransform: "uppercase",
    color: theme.textMuted,
    marginBottom: "20px",
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  input: {
    width: "100%",
    background: theme.surface,
    border: `1px solid ${theme.border}`,
    borderRadius: "12px",
    padding: "12px 16px",
    color: theme.text,
    fontSize: "14px",
    outline: "none",
    boxSizing: "border-box",
    transition: "border-color 0.2s",
  },
  inputRow: {
    display: "flex",
    gap: "10px",
    marginBottom: "16px",
  },
  btn: {
    background: theme.green,
    color: "#0a1a0a",
    border: "none",
    borderRadius: "12px",
    padding: "12px 20px",
    fontWeight: "700",
    fontSize: "14px",
    cursor: "pointer",
    whiteSpace: "nowrap",
    transition: "all 0.2s",
    letterSpacing: "-0.2px",
  },
  btnOutline: {
    background: "transparent",
    color: theme.green,
    border: `1px solid ${theme.greenMuted}`,
    borderRadius: "10px",
    padding: "6px 12px",
    fontWeight: "600",
    fontSize: "12px",
    cursor: "pointer",
    transition: "all 0.2s",
  },
  btnDanger: {
    background: "transparent",
    color: theme.red,
    border: "none",
    borderRadius: "8px",
    padding: "4px 8px",
    fontWeight: "600",
    fontSize: "12px",
    cursor: "pointer",
    opacity: 0.7,
  },
  pantryItem: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "12px 14px",
    background: theme.surface,
    borderRadius: "12px",
    marginBottom: "8px",
    border: `1px solid ${theme.border}`,
    transition: "border-color 0.2s",
  },
  itemName: {
    fontWeight: "600",
    fontSize: "15px",
    textTransform: "capitalize",
  },
  itemMeta: {
    fontSize: "12px",
    color: theme.textMuted,
    marginTop: "2px",
  },
  itemActions: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
  },
  dot: {
    width: "8px",
    height: "8px",
    borderRadius: "50%",
    background: theme.green,
    display: "inline-block",
    marginRight: "8px",
    boxShadow: `0 0 8px ${theme.green}`,
  },
  calorieRow: {
    display: "flex",
    gap: "10px",
    alignItems: "center",
    marginBottom: "16px",
  },
  suggestBtn: {
    width: "100%",
    background: `linear-gradient(135deg, ${theme.green}, ${theme.accent})`,
    color: "#0a1a0a",
    border: "none",
    borderRadius: "14px",
    padding: "16px",
    fontWeight: "800",
    fontSize: "15px",
    cursor: "pointer",
    letterSpacing: "-0.3px",
    transition: "all 0.2s",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
  },
  recipeCard: {
    background: theme.surface,
    borderRadius: "14px",
    padding: "20px",
    border: `1px solid ${theme.greenMuted}`,
    marginTop: "16px",
  },
  recipeName: {
    fontSize: "22px",
    fontWeight: "800",
    color: theme.green,
    marginBottom: "6px",
    letterSpacing: "-0.5px",
  },
  servingBadge: {
    display: "inline-block",
    background: theme.greenGlow,
    border: `1px solid ${theme.greenMuted}`,
    borderRadius: "20px",
    padding: "3px 12px",
    fontSize: "11px",
    color: theme.greenDim,
    fontWeight: "600",
    marginBottom: "16px",
    letterSpacing: "0.5px",
    textTransform: "uppercase",
  },
  macroGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "10px",
    marginBottom: "20px",
  },
  macroBox: {
    background: theme.card,
    borderRadius: "12px",
    padding: "12px",
    textAlign: "center",
    border: `1px solid ${theme.border}`,
  },
  macroValue: {
    fontSize: "20px",
    fontWeight: "800",
    color: theme.green,
    letterSpacing: "-0.5px",
  },
  macroLabel: {
    fontSize: "10px",
    color: theme.textMuted,
    marginTop: "2px",
    textTransform: "uppercase",
    letterSpacing: "1px",
  },
  stepsList: {
    listStyle: "none",
    padding: 0,
    margin: 0,
  },
  step: {
    display: "flex",
    gap: "14px",
    padding: "10px 0",
    borderBottom: `1px solid ${theme.border}`,
    fontSize: "14px",
    lineHeight: "1.5",
    color: theme.text,
  },
  stepNum: {
    minWidth: "24px",
    height: "24px",
    borderRadius: "50%",
    background: theme.greenGlow,
    border: `1px solid ${theme.greenMuted}`,
    color: theme.green,
    fontSize: "11px",
    fontWeight: "700",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "1px",
  },
  cookedBtn: {
    width: "100%",
    marginTop: "16px",
    background: "transparent",
    border: `1px solid ${theme.greenMuted}`,
    color: theme.green,
    borderRadius: "12px",
    padding: "12px",
    fontWeight: "700",
    fontSize: "14px",
    cursor: "pointer",
    transition: "all 0.2s",
    letterSpacing: "-0.2px",
  },
  empty: {
    textAlign: "center",
    color: theme.textDim,
    padding: "32px 0",
    fontSize: "14px",
  },
  loading: {
    textAlign: "center",
    color: theme.textMuted,
    padding: "24px 0",
    fontSize: "14px",
    animation: "pulse 1.5s infinite",
  },
  toast: {
    position: "fixed",
    bottom: "24px",
    right: "24px",
    background: theme.green,
    color: "#0a1a0a",
    padding: "12px 20px",
    borderRadius: "12px",
    fontWeight: "700",
    fontSize: "14px",
    zIndex: 999,
    boxShadow: `0 8px 32px rgba(74,222,128,0.4)`,
    transition: "all 0.3s",
  },
};

export default function NutriAI() {
  const [pantry, setPantry] = useState([]);
  const [newItem, setNewItem] = useState({ name: "", quantity: "", unit: "" });
  const [calorieTarget, setCalorieTarget] = useState("");
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => { fetchPantry(); }, []);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  };

  const fetchPantry = async () => {
    try {
      const res = await fetch(`${API}/pantry/`);
      const data = await res.json();
      setPantry(data.pantry || []);
    } catch { showToast("Could not reach server"); }
  };

  const addItem = async () => {
    if (!newItem.name || !newItem.quantity) return;
    try {
      await fetch(`${API}/pantry/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: newItem.name,
          quantity: parseFloat(newItem.quantity),
          unit: newItem.unit || null,
        }),
      });
      setNewItem({ name: "", quantity: "", unit: "" });
      fetchPantry();
      showToast(`✓ ${newItem.name} added`);
    } catch { showToast("Failed to add item"); }
  };

  const deleteItem = async (name) => {
    try {
      await fetch(`${API}/pantry/${name}`, { method: "DELETE" });
      fetchPantry();
      showToast(`Removed ${name}`);
    } catch { showToast("Failed to remove item"); }
  };

  const suggestRecipe = async () => {
    setLoading(true);
    setRecipe(null);
    try {
      const res = await fetch(`${API}/recipe/suggest`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ calorie_target: calorieTarget ? parseInt(calorieTarget) : null }),
      });
      const data = await res.json();
      setRecipe(data.recipe);
    } catch { showToast("Recipe suggestion failed"); }
    setLoading(false);
  };

  const markCooked = async () => {
    if (!recipe) return;
    try {
      await fetch(`${API}/pantry/deduct`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(recipe.ingredients_used),
      });
      fetchPantry();
      setRecipe(null);
      showToast("🍳 Cooked! Pantry updated");
    } catch { showToast("Failed to update pantry"); }
  };

  return (
    <div style={styles.app}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        input:focus { border-color: #4ade80 !important; }
        input::placeholder { color: #4a6b4a; }
        button:hover { opacity: 0.88; transform: translateY(-1px); }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.5} }
        @keyframes fadeIn { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
        .recipe-appear { animation: fadeIn 0.4s ease forwards; }
      `}</style>

      {/* Header */}
      <header style={styles.header}>
        <div style={styles.logo}>
          <span style={styles.logoLeaf}>🌿</span>
          NutriAI
        </div>
        <div style={styles.tagline}>Your smart kitchen companion</div>
      </header>

      <main style={styles.main}>

        {/* LEFT — Pantry */}
        <div style={styles.card}>
          <div style={styles.cardGlow} />
          <div style={styles.cardTitle}>
            <span style={styles.dot} />
            My Pantry
            <span style={{ marginLeft: "auto", color: theme.green, fontWeight: "700", fontSize: "14px", letterSpacing: "0" }}>
              {pantry.length} items
            </span>
          </div>

          {/* Add item row */}
          <div style={styles.inputRow}>
            <input
              style={{ ...styles.input, flex: 2 }}
              placeholder="Ingredient"
              value={newItem.name}
              onChange={e => setNewItem({ ...newItem, name: e.target.value })}
              onKeyDown={e => e.key === "Enter" && addItem()}
            />
            <input
              style={{ ...styles.input, flex: 1 }}
              placeholder="Qty"
              type="number"
              value={newItem.quantity}
              onChange={e => setNewItem({ ...newItem, quantity: e.target.value })}
              onKeyDown={e => e.key === "Enter" && addItem()}
            />
            <input
              style={{ ...styles.input, flex: 1 }}
              placeholder="Unit"
              value={newItem.unit}
              onChange={e => setNewItem({ ...newItem, unit: e.target.value })}
              onKeyDown={e => e.key === "Enter" && addItem()}
            />
            <button style={styles.btn} onClick={addItem}>+</button>
          </div>

          {/* Pantry list */}
          {pantry.length === 0 ? (
            <div style={styles.empty}>No ingredients yet. Add some above ↑</div>
          ) : (
            pantry.map(item => (
              <div key={item.id} style={styles.pantryItem}>
                <div>
                  <div style={styles.itemName}>{item.name}</div>
                  <div style={styles.itemMeta}>{item.quantity} {item.unit || "units"}</div>
                </div>
                <div style={styles.itemActions}>
                  <button style={styles.btnDanger} onClick={() => deleteItem(item.name)}>✕</button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* RIGHT — Recipe */}
        <div style={styles.card}>
          <div style={styles.cardGlow} />
          <div style={styles.cardTitle}>
            <span style={styles.dot} />
            Recipe Suggestion
          </div>

          <div style={styles.calorieRow}>
            <input
              style={{ ...styles.input, flex: 1 }}
              placeholder="Calorie target (optional, e.g. 400)"
              type="number"
              value={calorieTarget}
              onChange={e => setCalorieTarget(e.target.value)}
            />
          </div>

          <button style={styles.suggestBtn} onClick={suggestRecipe} disabled={loading}>
            {loading ? "⏳ Thinking..." : "✨ Suggest a Recipe"}
          </button>

          {loading && <div style={styles.loading}>Generating your recipe...</div>}

          {recipe && (
            <div style={styles.recipeCard} className="recipe-appear">
              <div style={styles.recipeName}>{recipe.recipe_name}</div>
              <div style={styles.servingBadge}>{recipe.serving_size}</div>

              {/* Macros */}
              <div style={styles.macroGrid}>
                <div style={styles.macroBox}>
                  <div style={styles.macroValue}>{recipe.total_calories}</div>
                  <div style={styles.macroLabel}>kcal</div>
                </div>
                <div style={styles.macroBox}>
                  <div style={styles.macroValue}>{recipe.macros.protein_g}g</div>
                  <div style={styles.macroLabel}>protein</div>
                </div>
                <div style={styles.macroBox}>
                  <div style={styles.macroValue}>{recipe.macros.carbs_g}g</div>
                  <div style={styles.macroLabel}>carbs</div>
                </div>
                <div style={styles.macroBox}>
                  <div style={styles.macroValue}>{recipe.macros.fat_g}g</div>
                  <div style={styles.macroLabel}>fat</div>
                </div>
              </div>

              {/* Steps */}
              <div style={{ fontSize: "12px", color: theme.textMuted, marginBottom: "10px", letterSpacing: "1px", textTransform: "uppercase", fontWeight: "600" }}>Steps</div>
              <ol style={styles.stepsList}>
                {recipe.steps.map((step, i) => (
                  <li key={i} style={styles.step}>
                    <span style={styles.stepNum}>{i + 1}</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>

              <button style={styles.cookedBtn} onClick={markCooked}>
                🍳 I Cooked This — Update Pantry
              </button>
            </div>
          )}

          {!recipe && !loading && (
            <div style={styles.empty}>
              Add ingredients to your pantry, then hit suggest ↑
            </div>
          )}
        </div>

      </main>

      {toast && <div style={styles.toast}>{toast}</div>}
    </div>
  );
}