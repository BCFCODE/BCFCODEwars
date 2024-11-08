import { auth } from "@/auth";
import React from "react";

const CodewarsMainPage = async () => {
  const session = await auth();

  return (
    <div
      style={{
        textAlign: "center",
        padding: "20px",
      }}
    >
      <h1>Hello {session?.user?.name}!</h1>
      <p>Welcome to the Codewars Main Page 🎉</p>
      <p>
        This page is currently under construction, so stay tuned for updates!
      </p>
    </div>
  );
};

export default CodewarsMainPage;
