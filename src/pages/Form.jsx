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
      <label
        htmlFor={id}
        className="text-sm font-bold uppercase tracking-[0.12em] text-amber-100"
      >
        {label}
      </label>
      <Field
        id={id}
        name={id}
        type={type}
        placeholder={placeholder}
        className="mt-2 w-full rounded-2xl border border-white/10 bg-white/95 px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-amber-400 focus:ring-4 focus:ring-amber-200/70"
      />
      <ErrorMessage
        name={id}
        component="div"
        className="mt-2 text-sm font-medium text-rose-500"
      />
    </div>
  );
};

const FormSection = ({ title, description, children }) => {
  return (
    <fieldset className="grid grid-cols-1 gap-8 rounded-[2rem] border border-white/10 bg-gray-950/95 p-6 shadow-[0_24px_60px_rgba(15,23,42,0.24)] backdrop-blur md:grid-cols-4 md:p-8 lg:p-10">
      <div className="col-span-full space-y-2 md:col-span-1">
        <p className="text-lg font-black text-white">{title}</p>
        <p className="text-sm leading-6 text-gray-300">{description}</p>
      </div>
      <div className="col-span-full grid grid-cols-6 gap-4 md:col-span-3">
        {children}
      </div>
    </fieldset>
  );
};

const FormComponent = () => {
  const { join, setJoin } = useAppUser();
  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#fff1c4_0%,#ffd87b_22%,#ffc961_50%,#f0ad43_100%)] text-slate-900">
      <section className="w-full px-4 pb-16 pt-28 sm:px-6 sm:pt-32 lg:px-8 xl:pt-36">
        <div className="mx-auto w-full max-w-[94rem]">
          <div className="relative overflow-hidden rounded-[2.25rem] border border-white/10 bg-gray-950/95 p-7 shadow-[0_28px_80px_rgba(15,23,42,0.28)] sm:p-10 lg:p-12">
          <div className="absolute -right-16 top-0 h-44 w-44 rounded-full bg-amber-400/12 blur-3xl" />
          <div className="absolute bottom-0 left-0 h-36 w-36 rounded-full bg-amber-300/12 blur-3xl" />
          <div className="absolute inset-y-0 right-[14%] hidden w-px bg-white/12 lg:block" />

          <div className="relative z-10 max-w-4xl">
            <p className="text-sm font-black uppercase tracking-[0.22em] text-amber-700">
              Join the Crew
            </p>
            <h1 className="mt-3 max-w-4xl text-4xl font-black leading-none text-white sm:text-5xl lg:text-6xl">
              Bring your lens, energy, and craft to CamCrew.
            </h1>
            <p className="mt-4 max-w-3xl text-sm font-medium leading-7 text-gray-300 sm:text-base">
              Tell us who you are and where you work from. We&apos;ll use these
              details to help clients discover you faster and trust your
              profile from day one.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-bold uppercase tracking-[0.12em] text-amber-100">
                Fast onboarding
              </span>
              <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-bold uppercase tracking-[0.12em] text-amber-100">
                Creative-friendly
              </span>
              <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-bold uppercase tracking-[0.12em] text-amber-100">
                Built for bookings
              </span>
            </div>
          </div>
        </div>

        <div className="mt-8">
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
              alert("Welcome to the Crew!");
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
          {({ isSubmitting }) => (
            <Form
              noValidate=""
              className="mx-auto flex w-full max-w-[94rem] flex-col space-y-8"
            >
              <FormSection
                title="Personal Information"
                description="Share the essentials so your profile starts strong and reaches the right clients."
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

              <div className="rounded-[2rem] border border-white/10 bg-gray-950/95 p-5 shadow-[0_20px_50px_rgba(15,23,42,0.24)] backdrop-blur sm:p-6 lg:p-7">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                  <div>
                    <p className="text-lg font-black text-white">
                      Ready to get discovered?
                    </p>
                    <p className="mt-1 text-sm leading-6 text-gray-300">
                      Submit your details and start building your presence on
                      CamCrew.
                    </p>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="join-crew-button inline-flex min-h-[3.75rem] items-center justify-center rounded-full px-8 py-3 text-sm font-black uppercase tracking-[0.14em] text-slate-950 shadow-[0_16px_40px_rgba(120,53,15,0.22)] transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    <span className="relative z-10">
                      {isSubmitting ? "Joining..." : "Join the Crew"}
                    </span>
                  </button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
        </div>
        </div>
      </section>
    </div>
  );
};

export default FormComponent;
