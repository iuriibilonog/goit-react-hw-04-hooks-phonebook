import { useState } from 'react';
// import addNewContact from '../../App';
import PropTypes from 'prop-types';
import s from './ContactsForm.module.css'


function ContactsForm({addNewContact}) {

  const [name, setName] = useState('')
  const [number, setNumber] = useState('')

  const handlerOnChange = (e) => {
    const { name, value } = e.target
    
    switch (name) {
      case 'name': return setName(value);
      case 'number': return setNumber(value);
      default: return;
    }
  }

  const hendlerOnSubmit = (e) => {
    e.preventDefault();
    addNewContact({ name, number })
    reset()
  }

  const reset = () => {
    setName('');
    setNumber('')
  }



  
    return (
      <form onSubmit={hendlerOnSubmit} className={s.form}>
        <label className={s.inputTitle}> Name
          <input className={s.inputField}
            type="text"
            value={name}
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
            required
            onChange={handlerOnChange}
          />
        </label>

        <label className={s.inputTitle}> Number
          <input className={s.inputField}
            type="tel"
            value={number}
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Номер телефона должен состоять цифр и может содержать пробелы, тире, круглые скобки и может начинаться с +"
            required
            onChange={handlerOnChange}
          />
        </label>

        <button className={s.addContactBtn} type='submit'>Add Contact</button>
      </form>
    )
  }


ContactsForm.propTypes = {
    addNewContact: PropTypes.func.isRequired
  }

export default ContactsForm;