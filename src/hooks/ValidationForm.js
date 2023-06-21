import React, { useState } from "react";

const ValidationForm = () => {
  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
    name: "",
  });

  const [errors, setErrors] = useState({});

  const [isValid, setIsValid] = useState(false);

  const handleChange = ({ target }) => {
    const { name, value } = target;

    // Проверка валидности поля и отображение соответствующего сообщения об ошибке
    let errorMessage = "";
    switch (name) {
      case "email":
        if (!value) {
          errorMessage = 'Поле "Email" является обязательным для заполнения';
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
          errorMessage = "Некорректный формат электронной почты";
        }
        break;
      case "password":
        if (!value) {
          errorMessage = "Пароль обязателен для заполнения";
        } else if (value.length < 3) {
          errorMessage = "Минимальная длина пароля - 3 символов";
        } else if (!/^[a-zA-Z0-9]+$/.test(value)) {
          errorMessage =
            "Пароль должен содержать только латинские буквы и цифры";
        }
        break;
      case "name":
        if (!value) {
          errorMessage = "Пожалуйста, укажите свое имя";
        } else if (value.length < 2) {
          errorMessage = "Минимальная длина имени - 2 символа";
        } else if (value.length > 30) {
          errorMessage = "Максимальная длина имени - 30 символов";
        }
        break;
      default:
        break;
    }

    setErrors((prevState) => ({
      ...prevState,
      [name]: errorMessage,
    }));

    setFormValue((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    setIsValid(target.closest("form").checkValidity());
  };

  return {
    handleChange,
    errors,
    formValue,
    setFormValue,
    setErrors,
    isValid,
    setIsValid,
  };
};

export default ValidationForm;
