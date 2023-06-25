import { useEffect } from "react";
import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';
import { BsPersonFill, BsFillTelephoneFill } from 'react-icons/bs';
import {IoMdPersonAdd} from 'react-icons/io'
import {
	Form,
	FormField,
	FieldInput,
	ErrorMessage,
	FormButton,
	LabelForm
} from './Contact.styled'

export const ContactForm = ({ onAddContact }) => {
	const {
		register,
		handleSubmit,
		setFocus,
		formState: { errors, isValid },
		reset,
	} = useForm({
		mode: 'onBlur',
	});

	useEffect(() => {
		setFocus('name');
	}, [setFocus]);
	
	return (
		<Form autoComplete="off"
			onSubmit={handleSubmit(data => {
				onAddContact({ ...data });
				reset();
			})}
		>
				<FormField htmlFor="name">
					<LabelForm>
						< BsPersonFill />
						Name
					</LabelForm>
					<FieldInput
						type="text"
					placeholder="Your name"
					{...register('name', {
						required: `This field is required`,
						patern: /^[A-Za-z\u0080-\uFFFF ']+$/,
					})}
				/>
				{errors?.name && (
					<ErrorMessage>
						{errors?.name?.message || `Name may only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan`}
						</ErrorMessage>
				)}
				</FormField>
				<FormField htmlFor="number">
					<LabelForm>
						< BsFillTelephoneFill />
						Number
					</LabelForm>
					<FieldInput
						type="tel"
						placeholder="+38(096)930-42-16"
						{...register('number', {
							required: `This field is required`,
							minLength: {
								value: 7,
								message: `Min 7 numbers. Phone number must be digits and can contain spaces, dashes, parentheses and can start with +`,
							},
							pattern: /\+?\d{1,4}?[ .\-\s]?\(?\d{1,3}?\)?[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,9}/,
						})}
				/>
				{errors?.number && (
					<ErrorMessage>
						{errors?.number?.message || `Phone number must be digits and can contain spaces, dashes, parentheses and can start with +`}
						</ErrorMessage>
				)}
				</FormField>
				<FormButton type="sumbmit" disabled={!isValid}>
					<IoMdPersonAdd size="16" />
					Add contact
				</FormButton>
			</Form>
	);
};

ContactForm.propType = {
	onSubmit: PropTypes.func.isRequired,
	onAddContact: PropTypes.func.isRequired,
};