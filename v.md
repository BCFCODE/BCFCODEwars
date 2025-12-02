# 🎉 BCFCODE Release v0.8.2

**Release Date:** November 14, 2025

We’re excited to announce **BCFCODE v0.8.2**, a visually stunning and performance-driven update that transforms the Codewars experience. This release introduces an epic Sign-In redesign with live champions leaderboard, a fully animated pagination component, a polished diamond collection system, and refined toast syncing feedback. Every pixel and line of code in v0.8.2 has been tuned to elevate your coding journey with smoother flow, immersive visuals, and improved consistency across the app.

---

## 🚀 What's New

### 1. **Epic Sign-In Experience**

The sign-in page has been completely reimagined into a **champion’s arena** that showcases real-time kata activity and leaderboard flair.

- **Live Champion Feed**: Displays top kata solvers powered by `getChampionsKataData`.
- **Dynamic Animations**: Includes glowing gradients, shimmering trophies, and live activity indicators (`DaysAgo`, `SolvedOn`).
- **Hero Redesign**: Introduces the “Code. Compete. Conquer.” tagline and enhanced OG metadata for social sharing.
- **Enhanced Layout**: Blended motion and gradient depth for a cinematic entry experience.

_File Changes_:

- `src/features/auth/components/sign-in-view.tsx`

_Impact_: Converts the sign-in page into a motivational and immersive entry point for new and returning BCFCODE warriors.

---

### 2. **Kata Champions Pagination**

Introduced the **`KatasPagination`** component — a golden-glow pagination UI with intuitive transitions and loading feedback.

- **Smart Ellipsis System**: Automatically shortens long pagination sets with “...” placeholders.
- **Animated Transitions**: Includes hover glows, motion feedback, and per-page loading spinners.
- **Keyboard & A11y Friendly**: Built for clarity and accessibility.

_File Changes_:

- `src/app/dashboard/codewars/components/Table/Pagination.tsx`

_Impact_: Enables effortless navigation through kata champion pages with responsive, visually rich interaction.

---

### 3. **Refined Diamonds Collection Experience**

The **DiamondsCollectButtonCard** component got a full visual and structural upgrade.

- **Modernized Layout**: Added `cn` utility for cleaner class composition.
- **Visual Enhancements**: New glow layers, pulse animations, and progress sheen motion.
- **Simplified Logic**: Smoother transitions between loading, collection, and completion states.

_File Changes_:

- `src/app/dashboard/codewars/components/DiamondsCollectButtonCard.tsx`

_Impact_: Collecting diamonds now feels more rewarding — fluid, responsive, and satisfying.

---

### 4. **Improved Champion Sync Feedback**

The **useChampionsQuery** hook now delivers smarter, less intrusive toast behavior.

- **Toast Logic Overhaul**: Shows loading only during refetch, not initial mount.
- **Success Notifications**: Displays clear messages for newly synced katas.
- **Error Handling**: Differentiates between failed syncs and data availability.
- **Cleanup Logic**: Dismisses lingering toasts automatically.

_File Changes_:

- `src/hooks/useChampionsQuery.tsx`

_Impact_: Keeps your champion syncing experience clean, intuitive, and distraction-free.

---

### 5. **Unified Dashboard Visuals**

Refined gradients and naming conventions throughout the dashboard for a consistent and elegant aesthetic.

- Replaced **`kyu-5`** shades with **`kyu-3`** for smoother color balance.
- Updated navigation and page text from **“Champions”** to **“History”** for better clarity.
- Consistent gradient backgrounds for all cards and tables.

_File Changes_:

- `src/app/dashboard/codewars/components/StatCard.tsx`
- `src/app/dashboard/codewars/components/Table/KatasTable.tsx`
- `src/app/dashboard/overview/layout.tsx`
- `src/app/dashboard/codewars/page.tsx`
- `src/constants/data.ts`

_Impact_: Provides a unified look across all dashboard components with improved readability and harmony.

---

### 6. **Code Cleanup and StatusCard Refactor**

Reorganized Codewars overview components for cleaner structure and improved maintainability.

- **Integrated Diamond Button** directly into `StatusCard`.
- **Removed Deprecated Components** from `overview/(cards)/@codewars`.
- **Consistent Styling** across all overview cards and buttons.

_File Changes_:

- `src/app/dashboard/overview/@codewars/StatusCard.tsx` (updated)
- Removed legacy files from `src/app/dashboard/overview/(cards)/@codewars/`

_Impact_: Simplifies the overview architecture and reduces code duplication.

---

## 🛠️ Technical Improvements

- **Icon Update**: `DiamondIcon` now supports `className` prop for flexible styling.
- **Utility Upgrade**: Introduced `cn` function usage for cleaner JSX class management.
- **Consistency Pass**: All dashboard sections now share cohesive gradient and typography settings.

---

## 🧹 Repository Cleanup

- Removed outdated overview card files and deprecated components.
- Simplified directory structure for easier future development.

---

## 📝 Upgrade Guide

To upgrade to **v0.8.2**, follow these steps:

1. **Update Dependencies**  
    Run:
   ```bash
   pnpm install
   Implement New Pagination
   Integrate KatasPagination where champion tables are rendered.
   ```

Update Sign-In Page
Verify metadata, layout, and leaderboard logic on /sign-in.

Test Toasts and Syncs
Ensure champion sync toasts appear only on refetch and dismiss correctly.

Clean Up Legacy Files
Remove or update references to deleted Codewars overview card files.

🙌 Contributing
Huge thanks to our incredible contributors for helping BCFCODE evolve.
Your creativity and precision power every release.
Want to join the mission? Explore our community:

GitHub Discussions

GitHub Issues

📬 Feedback
Enjoying the new leaderboard animations? Found a glitch?
Share your thoughts on X or in our GitHub threads.
We thrive on your feedback.

🤝 Get Involved
BCFCODE is your battleground for coding mastery!
Join our community and stay connected:

Join our Telegram | Follow us on X

<p align="center"> <a href="https://github.com/BCFCODEteam">
php-template
Copy code
<img src="https://res.cloudinary.com/ds8pptoh2/image/upload/v1747825921/BCFCODE-LOGO_vtfegn.jpg" alt="BCFCODE LOGO">
</a> </p>
Ready to level up your coding game? Join BCFCODE and make your mark!
Our Developers:
Team Members:
Morteza Bakhshandeh

Adib Khaki

© BCFCODE
Join our Telegram | Follow us on X
