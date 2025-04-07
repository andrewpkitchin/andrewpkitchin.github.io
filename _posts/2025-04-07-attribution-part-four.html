---
layout: post
title: "a soft start: budget reallocation based on results"
date: 2025-04-07
permalink: /attribution-part-four.html
series: "the attribution problem"
math: true
---

## **rethinking allocation**

You've just wrapped Q1 of your digital marketing campaign. Each channel had a set budget, and now you have performance data in the form of conversions. You want to reallocate the same total budget for Q2 — but in a smarter way.

Rather than sticking rigidly to last quarter’s spend, or swinging fully to performance-based reallocation, we can do something more nuanced.

---

## **the scenario**

Let’s say your Q1 results looked like this:

| Channel   | Q1 Spend (USD) | Q1 Conversions |
|-----------|----------------|----------------|
| Google    | 8,500          | 400            |
| Facebook  | 6,500          | 250            |
| Instagram | 4,000          | 150            |
| TikTok    | 1,000          | 200            |
| **Total** | **25,000**     | **1,000**      |

---

## **a balanced formula**

We define a rule that blends the original spend with conversion performance, using two knobs:

- **\( \alpha \in [0,1] \)**: how much to shift toward performance-based allocation  
- **\( \delta \geq 1 \)**: how aggressively we reward top performers

Let:
- \( o_i \) = original spend share for channel \( i \)
- \( p_i \) = conversion share for channel \( i \)

We compute the new budget allocation as:

\[
\text{Spend}_i = B \cdot \frac{(1 - \alpha) \cdot o_i + \alpha \cdot \left(\frac{p_i^\delta}{\sum_j p_j^\delta} \right)}{\sum_k \left[(1 - \alpha) \cdot o_k + \alpha \cdot \left(\frac{p_k^\delta}{\sum_j p_j^\delta} \right) \right]}
\]

This ensures:
- When \( \alpha = 0 \), you stick with the original plan.
- When \( \alpha = 1 \), you go fully performance-based.
- \( \delta > 1 \) exaggerates performance differences.
- Total budget remains fixed at \( B \).

---

## **visualizing the impact**

We tested several combinations of `alpha` and `delta` to see how this reallocation behaves.

```python
# Channels and inputs
channels = ['Google', 'Facebook', 'Instagram', 'TikTok']
original_spend = np.array([8500, 6500, 4000, 1000])
conversions = np.array([400, 250, 150, 200])
total_budget = 25000

# Reallocation function
def reallocate_from_original(conversions, original_spend, total_budget, alpha=1.0, delta=1.0):
    original_prop = original_spend / original_spend.sum()
    performance_prop = conversions / conversions.sum()
    perf_weight = performance_prop ** delta
    perf_weight /= perf_weight.sum()
    combined_weight = (1 - alpha) * original_prop + alpha * perf_weight
    combined_weight /= combined_weight.sum()
    return total_budget * combined_weight

We visualized how reallocations shift under:

- **α ∈ {1.0, 0.6, 0.3}**
- **δ ∈ {1.0, 1.5, 2.0}**

Each subplot below shows **original spend vs reallocated spend**:

<small>Gray = original budget, Blue = reallocated spend</small>

---

### what this tells us

✅ You can gently move away from past spend based on results  
✅ You can control how quickly or severely top performers get more  
✅ Total spend stays constant  
✅ You avoid overreacting to noisy performance data  

**But:**

❌ It still ignores saturation effects (maybe TikTok maxed out its potential)  
❌ It assumes equal conversion value across channels  
❌ It’s reactive — not predictive  

---

This kind of **soft optimization** provides a rational and flexible way to plan the next quarter’s media mix without jumping straight into statistical modeling.
