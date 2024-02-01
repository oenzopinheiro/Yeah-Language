import { TemplateChallenge } from "@/app/modules/challenge/template/challenge";

export default async function Challenge() {
  const response = await fetch("http://localhost:3000/api/generate-sentences", {
    method: "POST",
  });
  const data = await response.json();

  console.log(data);

  return <TemplateChallenge />;
}
