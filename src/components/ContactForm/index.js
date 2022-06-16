import React from "react";
import styles from "./ContactForm.module.css";
import { IoPaperPlane } from "react-icons/io5";
import {Form } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from 'react-toastify';
import feedbackApi from "../../api/feedbackApi"

export default function ContactForm() {
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      content: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required("Required")
        .min(4, "Must be 4 character or more"),
      email: Yup.string()
        .required("Required")
        .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,"Please enter a valid email address"),
      content: Yup.string().required("Required"),
    }),
    onSubmit: async () => {
      console.log("kiem tra", formik.values);
      const { name, email, content } = formik.values
      try {
        await feedbackApi.createFeedback({name, email, content})
        toast.success('Cảm ơn bạn đã phản hồi!', {autoClose: 2000})
        formik.values.name = ""
        formik.values.email = ""
        formik.values.content = ""
      } catch (error) {
        console.log(error)
        toast.error('Có lỗi xảy ra!', {autoClose: 2000})
      }
    },
  });


  return (
    <section>
      <ToastContainer />
      <form className={styles.contactform} onSubmit={formik.handleSubmit}>
        <label>HỌ VÀ TÊN</label>
        <input
          type="text"
          ìd="name"
          name="name"
          className={`form-control ${ formik.errors.name ? "is-invalid": formik.values.name && "is-valid"}`}
          value={formik.values.name}
          onChange={formik.handleChange}
        />
        {formik.errors.name && (
          <Form.Control.Feedback type="invalid">
            {formik.errors.name}
          </Form.Control.Feedback>
        )}
        <label>EMAIL</label>
        <input
          type="email"
          id="email"
          name="email"
          className={`form-control ${ formik.errors.email ? "is-invalid": formik.values.email && "is-valid"}`}
          value={formik.values.email}
          onChange={formik.handleChange}
        />
         {formik.errors.email && (
          <Form.Control.Feedback type="invalid">
            {formik.errors.email}
          </Form.Control.Feedback>
        )}
        <label>VẤN ĐỀ GẶP PHẢI HOẶC LỜI NHẮN</label>
        <textarea
          type="text"
          id="content"
          name="content"
          className={`form-control ${ formik.errors.content ? "is-invalid": formik.values.content && "is-valid"}`}
          value={formik.values.content}
          onChange={formik.handleChange}
        />
        {formik.errors.content && (
          <Form.Control.Feedback type="invalid">
            {formik.errors.content}
          </Form.Control.Feedback>
        )}
        <button
          appearance="primary"
          type="submit"
          disabled={
            formik.errors.name || formik.errors.email || !formik.values.content
          }
        >
          Gửi đi{" "}
          <span>
          <IoPaperPlane />
          </span>
        </button>
      </form>
    </section>
  );
}
