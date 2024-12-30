import { StepProps } from "../stepSwitch";

const handleAddUserToDB = async ({ session, codewars }: StepProps) => {
  try {
    const response = await fetch("/api/wars/codewars/user", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: session?.user.email,
        codewars,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      // console.log("codewars object updated in MongoDB" /* data */);
      return {
        success: {
          status: true,
          message: "codewars object updated in MongoDB",
        },
        codewars: data,
      };
    } else {
      // console.error("Error updating codewars object");
      return {
        success: { status: false, message: "Error updating codewars object" },
        error: "Error updating codewars object",
      };
    }
  } catch (error) {
    // console.error("An error occurred during updating codewars object", error);
    return {
      error: {
        error,
        message: "An error occurred during updating codewars object",
      },
    };
  }
  // console.log("handleAddUserToDB", JSON.stringify(codewars), email);
};

export default handleAddUserToDB;
