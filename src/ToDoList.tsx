import { useForm } from "react-hook-form";

interface IForm {
  email: string;
  firstName: string
  lastName: string
  userName: string
  password: string
  password1: string
}

function ToDoList() {
  const { register, handleSubmit, formState: { errors } } = useForm<IForm>({
    defaultValues: {
      email: "@naver.com"
    }
  });

  const onValid = (data: any) => {
    console.log('onValid: ', data)
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onValid)} style={{ display: "flex", flexDirection: "column" }}>
        <input 
          {...register("email", { 
            required: "Email is required", 
            pattern: {
              value: /^[A-Za-z0-9._%+-]+@naver.com/ ,
              message: "Only naver.com emails allowed."
            }
          })} 
          placeholder="Email"/>
        <span>
          { errors?.email?.message }
        </span>

        <input {...register("firstName", { required: "Write here" })} placeholder="First Name"/>
        <span>
          { errors?.firstName?.message }
        </span>

        <input {...register("lastName", { required: "Write here" })} placeholder="Last Name"/>
        <span>
          { errors?.lastName?.message }
        </span>

        <input {...register("userName", { required: "Write here" , minLength: 10 })} placeholder="Username"/>
        <span>
          { errors?.userName?.message }
        </span>

        <input {...register("password", { required:  "Write here", minLength: 5 })} placeholder="Password"/>
        <span>
          { errors?.password?.message }
        </span>

        <input {...register("password1", { required: "Password is required", minLength: { value: 5, message: "Your password is too short." } })} placeholder="Password1"/>
        <span>
          { errors?.password1?.message }
        </span>

        <button>Add</button>
      </form>
    </div>
  )
}

export default ToDoList;
