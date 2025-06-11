import * as Yup from "yup";
export const step3 = Yup.object({
  platformCommission: Yup.number()
    .min(0, "Value must be at least 0")
    .max(100, "Value must be less than or equal to 100")
    .required("Required"),
  gstOnCommission: Yup.number()
    .min(0, "Value must be at least 0")
    .max(100, "Value must be less than or equal to 100")
    .required("Required"),
  tds: Yup.number()
    .min(0, "Value must be at least 0")
    .max(100, "Value must be less than or equal to 100")
    .required("Required"),
  convenienceFee: Yup.number()
    .min(0, "Value must be at least 0")
    .max(100, "Value must be less than or equal to 100")
    .required("Required"),
});
export const textareaSchema = Yup.object({
      message: Yup.string()
        .min(3, 'Minimum 3 characters required')
        .max(50, 'Maximum 50 characters allowed')
        .required('Rejection reason is required'),
    });
  export const validationSchema = Yup.object({
        reason: Yup.string().required("Please select a reason."),
        otherIssue: Yup.string().when("reason", {
          is: "Other issue",
          then: () =>
            Yup.string()
              .trim()
              .required("Please describe the issue.")
              .min(2, "Must be at least 2 characters.")
              .max(100, "Must be at most 100 characters."),
          otherwise: () => Yup.string().notRequired(),
        }),
    
      });
