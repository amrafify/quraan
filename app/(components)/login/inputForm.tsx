
import { UseFormRegisterReturn } from 'react-hook-form'
type inputFormProps = { type: string, placeholder: string, register: UseFormRegisterReturn<string> }
export default function InputForm({ type, placeholder, register }: inputFormProps) {
    return (
        <>
            <input type={type} placeholder={placeholder} {...register} />

        </>
    )
}
