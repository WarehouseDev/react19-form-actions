import { useActionState } from "react";

export default function Form({ onSuccess }) {
  function contactFormAction(prevState, formData) {
    const firstName = formData.get("firstName");
    const lastName = formData.get("lastName");
    const email = formData.get("email");
    const query = formData.get("query");
    const message = formData.get("message");
    const consent = formData.get("consent");

    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    const formErrors = {};

    if (firstName === "") formErrors.firstName = "This field is required";
    if (lastName === "") formErrors.lastName = "This field is required";
    if (message === "") formErrors.message = "This field is required";
    if (email === "") {
      formErrors.email = "This field is required";
    } else if (!email.match(regex)) {
      formErrors.email = "Please enter a valid email address";
    }
    if (!consent)
      formErrors.consent =
        "To submit this form, please consent to being contacted";
    if (!query) formErrors.query = "Please select a query type";

    if (Object.keys(formErrors).length > 0) {
      return {
        formErrors,
        enteredValues: {
          firstName,
          lastName,
          email,
          query,
          message,
          consent,
        },
      };
    }

    onSuccess({ firstName, lastName, email, query, message, consent });

    return { formErrors: null };
  }

  const [formState, formAction] = useActionState(contactFormAction, {
    formErrors: null,
  });

  return (
    <form action={formAction}>
      {/* name */}
      <div className="name-container">
        <div className="form-control">
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            id="firstName"
            className={formState.formErrors?.firstName ? "error" : undefined}
            name="firstName"
            defaultValue={formState.enteredValues?.firstName}
            aria-describedby="firstNameError"
          />
          {formState.formErrors?.firstName && (
            <p className="errorMsg" id="firstNameError" aria-live="assertive">
              {formState.formErrors?.firstName}
            </p>
          )}
        </div>
        <div className="form-control">
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            id="lastName"
            className={formState.formErrors?.lastName ? "error" : undefined}
            name="lastName"
            defaultValue={formState.enteredValues?.lastName}
            aria-describedby="lastNameError"
          />
          {formState.formErrors?.lastName && (
            <p className="errorMsg" id="lastNameError" aria-live="assertive">
              {formState.formErrors.lastName}
            </p>
          )}
        </div>
      </div>
      {/* email */}
      <div className="form-control">
        <label htmlFor="email">Email Address</label>
        <input
          type="email"
          id="email"
          className={formState.formErrors?.email ? "error" : undefined}
          name="email"
          defaultValue={formState.enteredValues?.email}
          aria-describedby="emailError"
        />
        {formState.formErrors?.email && (
          <p className="errorMsg" id="emailError" aria-live="assertive">
            {formState.formErrors.email}
          </p>
        )}
      </div>
      {/* query type */}
      <div className="form-control">
        <fieldset>
          <legend>Query Type</legend>
          <div className="radio-container">
            <div>
              <input
                type="radio"
                name="query"
                id="general"
                value="General Enquiry"
                defaultChecked={
                  formState.enteredValues?.query === "General Enquiry"
                }
                aria-describedby="queryError"
              />
              <label htmlFor="general">General Enquiry</label>
            </div>
            <div>
              <input
                type="radio"
                name="query"
                id="support"
                value="Support Request"
                defaultChecked={
                  formState.enteredValues?.query === "Support Request"
                }
                aria-describedby="queryError"
              />
              <label htmlFor="support">Support Request</label>
            </div>
          </div>
        </fieldset>
        {formState.formErrors?.query && (
          <p className="errorMsg" id="queryError" aria-live="assertive">
            {formState.formErrors.query}
          </p>
        )}
      </div>
      {/* message */}
      <div className="form-control">
        <label htmlFor="message">Message</label>
        <textarea
          name="message"
          id="message"
          className={formState.formErrors?.message ? "error" : undefined}
          defaultValue={formState.enteredValues?.message}
          aria-describedby="messageError"
        ></textarea>
        {formState.formErrors?.message && (
          <p className="errorMsg" id="messageError" aria-live="assertive">
            {formState.formErrors.message}
          </p>
        )}
      </div>
      {/* consent */}
      <div className="form-control">
        <div className="checkbox-container">
          <input
            type="checkbox"
            name="consent"
            id="consent"
            defaultChecked={formState.enteredValues?.consent}
            aria-describedby="consentError"
          />
          <label htmlFor="consent">
            I consent to being contacted by the team
          </label>
        </div>
        {formState.formErrors?.consent && (
          <p className="errorMsg" id="consentError" aria-live="assertive">
            {formState.formErrors.consent}
          </p>
        )}
      </div>
      {/* submit */}
      <div className="form-control">
        <button type="submit">Submit</button>
      </div>
    </form>
  );
}
