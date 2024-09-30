import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';

const Badges = () => {
  const serviceId = `service_xcpmd2i`;
  const templateId = `template_pusimky`;
  const publicKey = `2BKXKj2_5CdK1SHl2`;

  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(serviceId, templateId, form.current, publicKey)
      .then((response) => {
        console.log(response);
        alert('Email sent Successfully');
      })
      .catch((error) => {
        console.log(error);
        alert('Something went wrong');
      });

    e.target.reset();
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '70%',
        margin: '100px',
      }}
    >
      <div
        style={{
          maxWidth: '400px',
          padding: '40px',
          border: '1px solid #ccc',
          borderRadius: '5px',
        }}
      >
        <form ref={form} onSubmit={(e) => sendEmail(e)}>
          <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>
            Contact Us
          </h2>
          <div style={{ marginBottom: '10px' }}>
            <input
              required
              autoComplete="off"
              type="text"
              placeholder="Enter Name"
              name="user_name"
              style={{
                width: '100%',
                padding: '8px',
              }}
            />
          </div>

          <div style={{ marginBottom: '10px' }}>
            <input
              required
              autoComplete="off"
              name="number"
              type="text"
              placeholder="Enter Mobile No"
              style={{
                width: '100%',
                padding: '8px',
              }}
            />
          </div>

          <div style={{ marginBottom: '10px' }}>
            <textarea
              required
              cols="30"
              rows="1"
              id="message"
              placeholder="Enter Message"
              name="message"
              style={{
                width: '100%',
                padding: '1rem',
              }}
            />
          </div>
          <button
            type="submit"
            style={{
              fontWeight: 'bold',
              width: '100%',
              padding: '8px',
              backgroundColor: '#333',
              color: '#fff',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Send message →
          </button>
        </form>
      </div>
    </div>
  );
};

export default Badges;

