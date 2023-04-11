import { Field, FieldHookConfig, useField} from "formik";
import { ClassAttributes, InputHTMLAttributes } from "react";

import { string } from "yup/lib/locale";
import { Group } from "../../Utils/server/types";
interface FieldSelectProps {
  listitems: string[] | Group[] | object[]
  label: string;
  name: string;
  default: string;
  theme?: string
}

// transformar esse select em um component select do radix ui para aproveitar a acessibilidade 
export default function FieldSelect(
	props: FieldSelectProps &
		InputHTMLAttributes<HTMLInputElement> &
		ClassAttributes<HTMLInputElement> &
		FieldHookConfig<string>
) {
	const [field, meta] = useField(props);

	const getSelect = (item: string | object | Group) =>{

		if (typeof item === 'string') {
			return item;

		} else if (item.title) {
			return item.title;

		} else {
			return item.description;

		}
	}
 
	return (
		<div
			className={`w-full relative flex items-start flex-col  ${props.theme}`}
		>
			<Field
				{...props}
				{...field}
				as="select"
				placeholder={props.default}
				name={props.name}
				className={`bg-gray-medium text-light-bg text-base px-2.5 py-2.5 rounded-md w-full max-h-11 focus:ring-0 focus:border-4  focus:outline-none 
				${meta.touched && meta.error ? " border-red-ufal" : "focus:border-blue-ufal"}
				`}
			>
				<option value="" className="">
					{props.default}
				</option>
        { props.listitems.map( item => {
					return (
						<option key={typeof item === 'string' ? item : item.id} value={typeof item === 'string' ? item : item.id} className="font-bold ">
							
							{
							getSelect(item)}
						
						</option>
					);
				})}
			</Field>

			{meta.error && meta.touched ? (
				<span className="text-red-ufal text-sm">{meta.error}</span>
			) : null}
		</div>
	);
}