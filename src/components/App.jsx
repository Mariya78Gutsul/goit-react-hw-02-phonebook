import React, { Component } from "react";
import { nanoid } from "nanoid";
import ContactList from "./ContactList/ContactList";
import Filter from "./Filter/Filter";
import ContactForm from "./ContactForm/ContactForm";

export default class App extends Component {
  state = {
    contacts: [
      { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
      { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
      { id: "id-3", name: "Eden Clements", number: "645-17-79" },
      { id: "id-4", name: "Annie Copeland", number: "227-91-26" },
    ],
    filter: "",
  };

  addContact = (task) => {
    const searchSameName = this.state.contacts
      .map((cont) => cont.name)
      .includes(task.name);

    if (searchSameName) {
      alert(`${task.name} is already in contacts`);
    } else if (task.name.length === 0) {
      alert("Fields must be filled!");
    } else {
      const contact = {
        ...task,
        id: nanoid,
      };

      this.setState((prevState) => ({
        contacts: [...prevState.contacts, contact],
      }));
    }
  };

  getVisibleContacts = () => {
    const { contacts, filter } = this.state;

    return contacts.filter((contacts) =>
      contacts.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  changeFilter = (e) => {
    this.setState({ filter: e.currentTarget.value });
  };

  removeContact = (contactId) => {
    this.setState((prevState) => {
      return {
        contacts: prevState.contacts.filter(({ id }) => id !== contactId),
      };
    });
  };

  render() {
    const { filter } = this.state;

    const visibleContacts = this.getVisibleContacts();

    return (
      <div>
        <h1>Phonebook</h1>

        <ContactForm onAddContact={this.addContact} />
        <h2>Contacts</h2>

        {visibleContacts.length > 1 && (
          <Filter value={filter} onChangeFilter={this.changeFilter} />
        )}
        {visibleContacts.length > 0 ? (
          <ContactList
            contacts={visibleContacts}
            onRemoveContact={this.removeContact}
          />
        ) : (
          <p>Yuor phonebook is empty. Please add contact.</p>
        )}
      </div>
    );
  }
}
