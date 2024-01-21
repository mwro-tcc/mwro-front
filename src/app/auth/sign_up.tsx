import TextInput from "../../ui/TextInput";

export default function SignUp() {
  return (
    <>
      <TextInput label="E-mail" required placeholder="E-Mail" />
      <TextInput label="Password" required placeholder="Password" />
      <TextInput
        label="Confirm Password"
        required
        placeholder="Confirm Password"
      />
    </>
  );
}
