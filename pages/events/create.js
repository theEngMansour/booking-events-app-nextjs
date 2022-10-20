import * as yup from "yup";
import Head from "next/head";
import { useState } from "react";
import { Formik } from "formik";
import { useMutation } from "@apollo/client";
import { CREATE_EVENT } from "hooks/mutations";
import { useRouter } from "next/router";
import { EventCreate, Alert } from "components";

export default function Create() {
  const [alert, setAlert] = useState();
  const router = useRouter();

  const validationSchema = yup.object({
    title: yup
      .string()
      .nullable()
      .required("عنوان مطلوب"),
    description: yup
      .string()
      .nullable()
      .required("الوصف مطلوب"),
    price: yup
      .string()
      .nullable()
      .required("السعر مطلوب"),
    date: yup
      .string()
      .nullable()
      .required("تاريخ مطلوب"),
  });

  const [eventConfirmHandler, { error }] = useMutation(CREATE_EVENT, {
    onError: (error) => {
      setAlert(error.message);
    },
    onCompleted: () => {
      setAlert("تم إضافة المناسبة بنجاح");
      router.push("/events");
    },
  });

  if (error) return <p>{error.message}</p>;

  return (
    <div>
      <Head>
        <title>إنشاء مناسبة</title>
      </Head>
      <Formik
        initialValues={{
          title: null,
          description: null,
          price: null,
          date: null,
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) => {
          eventConfirmHandler({
            variables: {
              title: values.title,
              price: +values.price,
              date: values.date,
              description: values.description,
            },
          });
          resetForm({ values: "" });
        }}
      >
        {(formikProps) => (
          <EventCreate
            formikProps={formikProps}
            AlertSuccess={
              alert && (
                <Alert className="font-b w-64 md:w-[80%]" type="success">
                  {alert}
                </Alert>
              )
            }
          />
        )}
      </Formik>
    </div>
  );
}
