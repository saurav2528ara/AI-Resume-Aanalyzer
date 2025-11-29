import { Redirect } from "react-router";

export default function ResumeIndex() {
  // Redirect plain /resume requests to the homepage (or you can change to a list view)
  return <Redirect to="/" />;
}
