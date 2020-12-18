import { useForm } from "react-hook-form";

export const FormNewPost = ({ onClickSubmit }) => {
  const { register, handleSubmit } = useForm();

  function onSubmit(data) {
    const { text, photo } = data;
    onClickSubmit({
      text,
      photo: photo[0],
    });
  }
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input name="text" type="text" ref={register} />
        <input
          type="file"
          accept="image/*"
          name="photo"
          ref={register}
          id="subir-foto"
        />
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};
