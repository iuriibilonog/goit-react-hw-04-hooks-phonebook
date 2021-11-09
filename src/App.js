import { useEffect, useState } from "react";
import s from "./App.module.css";
import { v4 } from "uuid";
import "./App.module.css";
import ContactsForm from "./components/ContactsForm";
import Contacts from "./components/Contacts";
import FilterField from "./components/FilterField";

function App() {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    const localContacts = JSON.parse(localStorage.getItem("contacts"));
    if (localContacts) {
      setContacts(localContacts);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("contacts", JSON.stringify(contacts));
  }, [contacts]);

  const addNewContact = ({ name, number }) => {
    const contact = {
      id: v4(),
      name: name,
      number: number,
    };

    const contactsNames = contacts.map((item) => item.name.toLowerCase());

    contactsNames.includes(contact.name.toLowerCase())
      ? alert(`${contact.name} is already in contacts.`)
      : setContacts((prev) => [contact, ...prev]);
  };

  const changeFilter = (e) => {
    setFilter(e.target.value);
  };

  const getFilteredContacts = () => {
    const NormalizeFilter = filter.toLowerCase();

    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(NormalizeFilter)
    );
  };

  const deleteContact = (contactId) => {
    setContacts((prev) => prev.filter((contact) => contact.id !== contactId));
  };

  const filteredContacts = getFilteredContacts();
  return (
    <div className={s.app}>
      <h1 className={s.title}>Phonebook</h1>
      <ContactsForm addNewContact={addNewContact} />
      <h2 className={s.title}>Contacts</h2>
      <FilterField value={filter} onChange={changeFilter} />
      <Contacts contactsArr={filteredContacts} deleteContact={deleteContact} />
    </div>
  );
}

export default App;
