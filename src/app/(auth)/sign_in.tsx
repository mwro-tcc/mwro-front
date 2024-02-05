import TextInput from "../../ui/TextInput";

export default function SignIn() {
  return (
    <>
      <TextInput label="E-mail" required placeholder="exemplo@email.com" />
      <TextInput label="Password" required placeholder="seNha_suPer$ecret@" />
    </>
  );
}
