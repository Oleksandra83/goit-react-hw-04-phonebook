import { useState } from "react";
import { nanoid } from "nanoid";
import { ToastContainer, Slide, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {notifyOptions} from "../notify/notify";
import { Section } from "./Section/Section";
import { Header } from './Header/Header'
import { ContactForm } from "./Contact/Contact";
import { ContactList } from "./ContactList/ContactList";
import Filter from './Filter/Filter';
import { Container } from './App.styled';

import initionalContacts from '../data/contacts';
import useLocalStorage from "hooks/useLocalStorage";
export default function App() {
	const [contacts, setContacts] = useLocalStorage('contacts', initionalContacts);
	const [filter, setFilter] = useState('');
	// state = {
	// 	contacts: ,
	// 	filter: '',
	// }

	// componentDidMount() {
	// 	const contactsFormLocalStorage = localStorage.getItem('contacts');
	// 	const contactsParsed = JSON.parse(contactsFormLocalStorage);
	// 	if (!contactsParsed) return;
	// 	this.setState({ contacts: contactsParsed });
	// }

	// componentDidUpdate(prevProps, prevState) {
	// 	if (this.state.contacts !== prevState.contacts) {
	// 		localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
	// 	}
	// }

	const addContact = newContact => {
		const isExist = contacts.some(
			({ name, number }) =>
				name.toLowerCase().trim() ===
				newContact.name.toLowerCase().trim() ||
				number.trim() === newContact.number.trim()
		);

		if (isExist) {
			return toast.error(
				`${newContact.name}: is already in contacts`, notifyOptions
			);
		}
		
		setContacts(contacts => [{ ...newContact, id: nanoid() }, ...contacts]);
	};

	const deleteContact = contactId => {
		setContacts(contacts.filter(contact => contact.id !== contactId));
	};

	const getVisibleContacts = () => {
		const normalizeFilter = filter.toLowerCase();
		const filteredContacts= contacts.filter(contact =>
			contact.name.toLowerCase().trim().includes(normalizeFilter));
		
		if (normalizeFilter && !filteredContacts.length) {
			toast.warn(`No contacts matching request`, notifyOptions);
		}
		return filteredContacts;
	};

	const changeFilter = e => {
		setFilter(e.target.value.toLowerCase().trim());
	};

	return (
		<Container>
			<Section title="Phonebook">
				<ContactForm onAddContact={addContact} />
				{contacts.length > 0 && (
					<>
						<Header title="Contacts" />
					<Filter value={filter} onChange={changeFilter} />
					<ContactList
						contacts={getVisibleContacts()}
						onDelete={deleteContact}
					/>
					</>
				)}
			</Section>
			<ToastContainer />
		</Container>
		);
	}

