import { CodewarsDatabase } from "@/types/codewars";

const handleAddUserToDB = async ({ codewars, email }: CodewarsDatabase) => {
  try {
    const response = await fetch("/api/wars/codewars/user", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        codewars,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      console.log("codewarsUser updated in MongoDB", data);
    } else {
      console.error("Error updating codewarsUser");
    }
  } catch (error) {
    console.error("An error occurred during updating codewarsUser");
  }
  // console.log("handleAddUserToDB", JSON.stringify(codewars), email);
};

export default handleAddUserToDB;
