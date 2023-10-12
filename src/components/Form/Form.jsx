import { useState } from 'react';
import { Form, Label, Button, Input, Section } from './Form.styled';
import { nanoid } from 'nanoid';
import { useDispatch, useSelector } from 'react-redux';
import { addContacts } from 'redux/contactsSlice';

const ContactForm = () => {
  const dispatch = useDispatch();
  const { contacts } = useSelector(state => state.contacts);

  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const idName = nanoid();
  const idNumber = nanoid();

  const handleChange = ({ target: { value, name } }) => {
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'number':
        setNumber(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    createContacts({ name, number });
    setName('');
    setNumber('');
  };

  const createContacts = value => {
    const isAlreadyExist = contacts.find(
      contact => contact.name === value.name
    );
    if (isAlreadyExist) {
      return alert(`${value.name} is already in contacts`);
    }

    dispatch(addContacts(value));
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Section>
        <Label htmlFor={idName}>Name</Label>
        <Input
          type="text"
          name="name"
          id={idName}
          value={name}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          onChange={handleChange}
        />
        <Label htmlFor={idNumber}>Number</Label>
        <Input
          type="tel"
          id={idNumber}
          value={number}
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          onChange={handleChange}
        />
      </Section>

      <Button type="submit"> Add contact </Button>
    </Form>
  );
};

export default ContactForm;
