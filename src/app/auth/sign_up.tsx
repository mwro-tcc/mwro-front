import { Form } from "react-hook-form";
import TextInput from "../../ui/TextInput";

export default function SignUp() {
  return (
    <>
      <TextInput placeholder="E-Mail" />
      <TextInput placeholder="Password" />
      <TextInput placeholder="Confirm Password" />
    </>
  );
}
