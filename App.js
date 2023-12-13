import React from 'react';
import { useState } from 'react';
import axios from 'react';

const countries = [ 'Brytyjskie', 'Niemieckie', 'Ukraińskie'];

const form = () => {
  const [formData, setFormData] = useState({
    imie: '',
    nazwisko: '',
    jezyk: '',
    plec: '',
    bio: '',
    obywatel: false,
    kraj: 'Polska',
    zgoda: false,
  });
  const [errors, setErrors] = useState({
    imie: '',
    nazwisko: '',
    jezyk: '',
    plec: '',
    bio: '',
    obywatel: '',
    kraj: '',
    zgoda: '',
  });
  const change = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: '',
    }));
  };
  const validate = () => {
    let valid = true;
    const newErrors = { ...errors };
    if (formData.imie.length < 3) {
      newErrors.imie = 'Imię powinno zawierać przynajmniej 3 znaki';
      valid = false;
    }
    if (formData.nazwisko.length < 3 || formData.nazwisko.length > 30) {
      newErrors.nazwisko = 'Nazwisko powinno zawierać od 3 do 30 znaków';
      valid = false;
    }
    if (!formData.jezyk) {
      newErrors.jezyk = 'Proszę wybrać język';
      valid = false;
    }
    if (!formData.plec) {
      newErrors.plec = 'Proszę wybrać płeć';
      valid = false;
    }
    if (formData.bio.length < 30) {
      newErrors.bio = 'Bio powinno zawierać przynajmniej 30 znaków';
      valid = false;
    }
    if (formData.obywatel && !formData.kraj) {
      newErrors.kraj = 'Proszę wybrać kraj';
      valid = false;
    }
    if (!formData.zgoda) {
      newErrors.zgoda = 'Proszę wyrazić zgodę na przetwarzanie danych';
      valid = false;
    }
    setErrors(newErrors);
    return valid;
  };

  const submit = async (e) => {
    e.preventDefault();

    if (validate()) {
      try {
        const response = await axios.post('http://zadanie.zsl/JoannaKocinska', formData);

        setFormData({
          imie: '',
          nazwisko: '',
          jezyk: '',
          plec: '',
          bio: '',
          obywatel: false,
          kraj: 'Polska',
          zgoda: false,
        });
      } catch (error) {
        console.error('Błąd wysyłania formularza:', error);
      }
    }
  };

  return (
      <form onSubmit={submit} method={"POST"}>
        <div>
          <label>
            Imię:
            <input type="text" name="imie" value={formData.imie} onChange={change} />
            <span className="error">{errors.imie}</span>
          </label>
        </div>
        <div>
          <label>
            Nazwisko:
            <input type="text" name="nazwisko" value={formData.nazwisko} onChange={change} />
            <span className="error">{errors.nazwisko}</span>
          </label>
        </div>
        <div>
          <label>
            Język:
            <select name="jezyk" value={formData.jezyk} onChange={change}>
              <option value="">Wybierz język</option>
              {['Polski', 'Angielski', 'Niemiecki', 'Ukraiński'].map((lang) => (
                  <option key={lang} value={lang}>{lang}</option>
              ))}
            </select>
            <span className="error">{errors.jezyk}</span>
          </label>
        </div>
        <div>
          <label>
            Płeć:
            <select name="plec" value={formData.plec} onChange={change}>
              <option value="">Wybierz płeć</option>
              <option value="Mężczyzna">Mężczyzna</option>
              <option value="Kobieta">Kobieta</option>
            </select>
            <span className="error">{errors.plec}</span>
          </label>
        </div>
        <div>
          <label>
            Bio:
            <textarea name="bio" value={formData.bio} onChange={change} />
            <span className="error">{errors.bio}</span>
          </label>
        </div>
        <div>
          <label>
            Nie jestem obywatelem:
            <input type="checkbox" name="obywatel" checked={formData.obywatel} onChange={change} />
          </label>
        </div>
        {formData.obywatel && (
            <div>
              <label>
                Obywatelstwo:
                <select name="kraj" value={formData.kraj} onChange={change}>
                  <option value="">Wybierz kraj</option>
                  {countries.map((country) => (
                      <option key={country} value={country}>
                        {country}
                      </option>
                  ))}
                </select>
                <span className="error">{errors.kraj}</span>
              </label>
            </div>
        )}
        <div>
          <label>
            Zgoda na przetwarzanie danych:
            <input type="checkbox" name="zgoda" checked={formData.zgoda} onChange={change} />
            <span className="error">{errors.zgoda}</span>
          </label>
        </div>
        <div>
          <button type="submit">
            Wyslij formularz
          </button>
        </div>
      </form>
  );
};
export default form;