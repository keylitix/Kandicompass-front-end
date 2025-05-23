'use client';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'sonner';
import { GradientButton } from '@/app/_components/custom-ui/GradientButton';
import { useAppSelector } from '@/app/hook/useReduxApp';
import Input from '@/app/_components/custom-ui/Input';
import { useEffect } from 'react';

export default function ContactUs() {
  const { user } = useAppSelector((state) => state.auth);
  const formik = useFormik({
    initialValues: {
      name: user?.fullName ?? '',
      email: user?.email ?? '',
      message: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Name is required'),
      message: Yup.string().required('Message is required'),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        const res = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(values),
        });
        console.log('res', res);

        if (res.ok) {
          toast.success('Message sent successfully!');
          resetForm();
        } else {
          toast.error('Failed to send message. Try again.');
        }
      } catch (error) {
        toast.error('An error occurred. Please try later.');
      }
    },
  });

  useEffect(() => {
    if (formik.touched.name && formik.errors.name) {
      toast.error(formik.errors.name);
    }
  }, [formik.errors.name, formik.touched.name]);

  useEffect(() => {
    if (formik.touched.message && formik.errors.message) {
      toast.error(formik.errors.message);
    }
  }, [formik.errors.message, formik.touched.message]);

  return (
    <div className="bg-wrapper">
      <div className="bg-page">
        <div className="left-spark" />
        <div className="right-spark" />
        <div className="container mx-auto px-[100px]">
          <div className="h-[300px] flex items-center justify-center">
            <h1 className="font-[700] text-[46px] bg-gradient-to-r from-[#FF005D] to-[#00D1FF] bg-clip-text text-transparent">
              Contact Us
            </h1>
          </div>
          <div className="mb-[100px]">
            <form className="w-[669px] mx-auto" onSubmit={formik.handleSubmit}>
              <div className="mb-6">
                <Input
                  label="Name"
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.name}
                />
              </div>

              <div className="mb-6">
                <Input
                  label="Message"
                  type="textarea"
                  name="message"
                  rows={4}
                  placeholder="Your Message"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.message}
                />
              </div>

              <div className="flex justify-center">
                <GradientButton type="submit">
                  {formik.isSubmitting ? 'Submitting...' : 'SUBMIT'}
                </GradientButton>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
