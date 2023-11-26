import { useForm } from "react-hook-form";

const AuthForm = () => {
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
    setValue,
    watch,
  } = useForm({
    mode: "onChange",
  });

  const formsubmit = (data, event) => {
    event.preventdefault(); 

}

  return { register, errors, isValid, handleSubmit, reset, setValue, watch, formsubmit };
};

export default AuthForm;