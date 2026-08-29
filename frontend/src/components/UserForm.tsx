import { useState } from "react";

type FormData = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

type FormErrors = {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
};

export function UserForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState<boolean>(false);

  const validate = () => {
    const newErrors: FormErrors = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.name.trim() === "") {
      newErrors.name = "Enter valid name";
    } else if (formData.name.trim().length < 3) {
      newErrors.name = "Enter minimum of 3 characters";
    }

    if (formData.email.trim() === "") {
      newErrors.email = "Enter an email";
    } else if (!emailPattern.test(formData.email)) {
      newErrors.email = "Enter valid email";
    }

    if (formData.password.trim().length < 8) {
      newErrors.password = "Enter a password with a minimum length of 8";
    }

    if (formData.confirmPassword.length === 0) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords don't match";
    }

    return newErrors;
  };

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newErrors = validate();

    setFormErrors(newErrors);
    if (Object.keys(newErrors).length !== 0) {
      return;
    }

    setSubmitting(true);
    setTimeout(() => {
      console.log("name:", formData.name);
      console.log("email:", formData.email);
      console.log("Password:", formData.password);
      console.log("Confirm Password:", formData.confirmPassword);

      setSubmitting(false);
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setFormErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
        />
        {formErrors.name && <p>{formErrors.name}</p>}
        <br />
        <label>Email:</label>
        <input
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
        />{" "}
        {formErrors.email && <p>{formErrors.email}</p>}
        <br />
        <label htmlFor="passwordId">Password: </label>
        <input
          id="passwordId"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
        {formErrors.password && <p>{formErrors.password}</p>}
        <br />
        <label htmlFor="confirmPasswordId">Confirm Password: </label>
        <input
          id="confirmPasswordId"
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
        />
        {formErrors.confirmPassword && <div>{formErrors.confirmPassword}</div>}
        <br />
        <br />
        <button type="submit" disabled={submitting}>
          {submitting ? <span>submitting</span> : <span>submit</span>}
        </button>
      </form>
      <div>
        name: {formData.name} <br />
        email: {formData.email} <br />
        password: {formData.password} <br />
        Confirm Password: {formData.confirmPassword}
      </div>
    </>
  );
}
