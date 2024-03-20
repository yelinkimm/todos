import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import { customCategoryState } from "../atoms";

interface ICustomCategoryForm {
  id: number;
  customCategory: string;
}

function CreateCustomCategory() {
  const setCustomCategories = useSetRecoilState(customCategoryState);
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<ICustomCategoryForm>();

  const handleValid = ({ customCategory }: ICustomCategoryForm) => {
    setCustomCategories(prev => [{ id: Date.now(), text: customCategory }, ...prev]);
    setValue("customCategory", "");
  }

  return (
    <>
      <button>CreateCustomCategory</button>
      <br/>
      <form onSubmit={handleSubmit(handleValid)}>
        <input {...register("customCategory", { required: "Please wrte category name." })} type="text" placeholder="Write category name"/>
        <button>Create</button>
        <span>{errors?.customCategory?.message}</span>
      </form>
    </>
  )
}

export default CreateCustomCategory;
