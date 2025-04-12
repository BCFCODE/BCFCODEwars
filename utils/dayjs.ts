import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import updateLocale from "dayjs/plugin/updateLocale";

dayjs.extend(relativeTime);
dayjs.extend(updateLocale);

dayjs.updateLocale("en", {
  relativeTime: {
    future: "in %s",
    past: "%s ago",
    s: "Recently Solved",
    m: "1m",
    mm: "%dm",
    h: "1h",
    hh: "%dh",
    d: "1d",
    dd: "%dd",
    M: "1mo",
    MM: "%dmo",
    y: "1y",
    yy: "%dy",
  },
});

export default dayjs;

/* 
  🚀 Step 1: Install dayjs and its plugin

  pnpm add dayjs

  Add the relativeTime plugin:

  🧩 Step 2: Set up dayjs with the plugin

  // utils/dayjs.ts
  import dayjs from "dayjs";
  import relativeTime from "dayjs/plugin/relativeTime";

  dayjs.extend(relativeTime);

  export default dayjs;
  ✅ Now you can use dayjs().to() and dayjs().from() with readable relative time strings.

  🧪 Step 3: Basic Usage
  import dayjs from "@/utils/dayjs";

  const solvedAt = "2025-04-12T10:52:00Z";
  console.log(dayjs(solvedAt).fromNow()); // 👉 "5 minutes ago"

  🎯 Step 4: Customize the output format
  Want “Just now”, “1m ago”, “2h ago”? You can do that like Instagram:

  import dayjs from "dayjs";
  import relativeTime from "dayjs/plugin/relativeTime";

  dayjs.extend(relativeTime);

  // optional: update English locale labels
  dayjs.updateLocale("en", {
    relativeTime: {
      future: "in %s",
      past: "%s ago",
      s: "Just now",
      m: "1m ago",
      mm: "%dm ago",
      h: "1h ago",
      hh: "%dh ago",
      d: "1d ago",
      dd: "%dd ago",
      M: "1mo ago",
      MM: "%dmo ago",
      y: "1y ago",
      yy: "%dy ago",
    },
  });
  Now:

  ts
  Copy
  Edit
  console.log(dayjs("2025-04-12T11:59:00Z").fromNow()); // Just now
  console.log(dayjs("2025-04-12T11:00:00Z").fromNow()); // 59m ago
  console.log(dayjs("2025-04-11T11:00:00Z").fromNow()); // 1d ago
  🧠 Step 5: Create a reusable hook
  ts
  Copy
  Edit
  // hooks/useRelativeTime.ts
  import { useEffect, useState } from "react";
  import dayjs from "@/utils/dayjs";

  export default function useRelativeTime(date: string | Date, interval = 60000) {
    const [label, setLabel] = useState(() => dayjs(date).fromNow());

    useEffect(() => {
      const update = () => setLabel(dayjs(date).fromNow());

      const id = setInterval(update, interval);
      return () => clearInterval(id);
    }, [date, interval]);

    return label;
  }
  🧼 Step 6: Use in your component
  tsx
  Copy
  Edit
  import useRelativeTime from "@/hooks/useRelativeTime";

  const SolvedBadge = ({ solvedAt }: { solvedAt: string }) => {
    const relative = useRelativeTime(solvedAt);

    return <span className="text-sm text-gray-500">{relative}</span>;
  };
  🪄 BONUS: Internationalization (Optional)
  ts
  Copy
  Edit
  import "dayjs/locale/fr";
  dayjs.locale("fr");

  console.log(dayjs("2025-04-12T10:00:00Z").fromNow()); // il y a 2 heures
  ✅ Summary
  Step	What You Did
  1	Installed dayjs + plugin
  2	Set up dayjs config file
  3	Used .fromNow() to show time
  4	Customized output like Instagram
  5	Created a React useRelativeTime hook
  6	Used it in UI for dynamic updates
  🌍	Bonus: multilingual support

*/
