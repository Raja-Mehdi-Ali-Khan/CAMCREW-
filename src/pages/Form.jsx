import { Formik, Form, Field, ErrorMessage } from "formik";

import * as Yup from "yup";
import axios from "axios";
import { useUser as useAppUser } from "../context/UserContext";
import { apiUrl } from "../config/api";

const validationSchema = Yup.object().shape({
  firstname: Yup.string().required("First name is required"),
  lastname: Yup.string().required("Last name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  address: Yup.string().required("Address is required"),
  city: Yup.string().required("City is required"),
  state: Yup.string().required("State / Province is required"),
  zip: Yup.string().required("ZIP / Postal code is required"),
});

const FormField = ({ label, id, type, placeholder }) => {
  return (
    <div className="col-span-full sm:col-span-3">
      <label htmlFor={id} className="text-sm">
        {label}
      </label>
      <Field
        id={id}
        name={id}
        type={type}
        placeholder={placeholder}
        className="w-full text-black rounded-md focus:ring focus:ring-opacity-75 "
      />
      <ErrorMessage
        name={id}
        component="div"
        className="text-red-500 text-sm"
      />
    </div>
  );
};

const FormSection = ({ title, description, children }) => {
  return (
    <fieldset className="grid grid-cols-4 gap-6 p-6 rounded-md shadow-sm ">
      <div className="space-y-2 col-span-full lg:col-span-1">
        <p className="font-medium">{title}</p>
        <p className="text-xs">{description}</p>
      </div>
      <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
        {children}
      </div>
    </fieldset>
  );
};

const FormComponent = () => {
  const { join, setJoin } = useAppUser();
  return (
    <div className="text-white">
      <section className="p-6 ">
        <Formik
          initialValues={{
            firstname: "",
            lastname: "",
            email: "",
            address: "",
            city: "",
            state: "",
            zip: "",
            username: "",
            website: "",
            bio: "",
          }}
          validationSchema={validationSchema}
          onSubmit={async (values, { setSubmitting }) => {
            try {

              const response = await axios.post(apiUrl("/api/users"), {
                ...values,
                isCameraman: true,
              });

              console.log(response.data);
              setSubmitting(false);
              setJoin(!join);
              alert("Joined as Cameraman");
            } catch (error) {

              if (error.response) {
                console.error(error.response.data.error);
              } else {
                console.error("An unexpected error occurred:", error.message);
              }
              setSubmitting(false);
            }
          }}
        >
          {() => (
            <Form
              noValidate=""
              className="container flex flex-col mx-auto space-y-12"
            >
              <FormSection
                title="Personal Information"
                description="Enter Your Valid Details"
              >
                <FormField
                  label="First name"
                  id="firstname"
                  type="text"
                  placeholder="First name"
                />
                <FormField
                  label="Last name"
                  id="lastname"
                  type="text"
                  placeholder="Last name"
                />
                <FormField
                  label="Email"
                  id="email"
                  type="email"
                  placeholder="Email"
                />
                <FormField
                  label="Address"
                  id="address"
                  type="text"
                  placeholder=""
                />
                <FormField label="City" id="city" type="text" placeholder="" />
                <FormField
                  label="State / Province"
                  id="state"
                  type="text"
                  placeholder=""
                />
                <FormField
                  label="ZIP / Postal"
                  id="zip"
                  type="text"
                  placeholder=""
                />
              </FormSection>
              {}
              <button
                type="submit"
                className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
              >
                Submit
              </button>
            </Form>
          )}
        </Formik>
      </section>
    </div>
  );
};

export default FormComponent;
