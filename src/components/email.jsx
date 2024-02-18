import React from 'react';
import { useForm, ValidationError } from '@formspree/react';
import { useSpring, animated } from 'react-spring';

function ContactForm({ isVisible }) {
  const [state, handleSubmit] = useForm("mvoekrjp");
  

  if (state.succeeded) {
    return <p>Thanks for contacting me, I will get back to you shortly!</p>;
  }

  return (
<div className={`transition-opacity duration-500 ease-in-out ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
  <form onSubmit={handleSubmit} className="text-primary">
    <label htmlFor="email" className="block font-bold mb-1">
      Email Address
    </label>
    <input 
      id="email"
      type="email"
      name="email"
      autoComplete="email"
      className="w-full p-2 border rounded-md text-black"
    />
    <ValidationError
      prefix="Email"
      field="email"
      errors={state.errors}
    />
    <label htmlFor="message" className="block font-bold my-2">
      Message
    </label>
    <textarea
      id="message"
      name="message"
      className="w-full p-2 border rounded-md resize-none text-black" // added resize-none
      rows={6} // set the initial number of visible lines
      style={{ maxHeight: '300px', overflowY: 'auto' }} // set max height and make it scrollable if content exceeds
    />
    <ValidationError
      prefix="Message"
      field="message"
      errors={state.errors}
    />
    <button
      type="submit"
      disabled={state.submitting}
      className="bg-primary text-white font-bold py-2 px-4 rounded-md mt-4 hover:bg-opacity-80 transition"
    >
      {state.submitting ? 'Sending...' : 'Send Message'}
    </button>
  </form>
</div>

  );
}

export default ContactForm;
