import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Step1, Step2, Step3, Step4, Step5 } from "./steps";
import { Stepper, Breadcrumbs } from "../../../../components";
import { usePostStepDataMutation } from "../../../../apis/restaurant";

const RestaurantDetails = () => {
  const location = useLocation();
  const { stepCount: locationStepCount } = location.state || {};
  const { id } = useParams();
  const STORAGE_KEY = `restaurant_step_count_${id}`;

  const getInitialStepCount = () => {
    const stored = sessionStorage.getItem(STORAGE_KEY);
    if (stored) {
      return parseInt(stored, 10);
    }
    return locationStepCount || 0;
  };

  const [stepCount, setStepCount] = useState(() => {
    const stored = sessionStorage.getItem(STORAGE_KEY);
    return stored ? parseInt(stored, 10) : (locationStepCount || 0);
  });
  const [activatedStep5, setActivatedStep5] = useState(false);
  const [approvedCount, setApprovedCount] = useState(0);
  const [payload] = usePostStepDataMutation();
  const [currentStep, setCurrentStep] = useState(() => {
    const stored = sessionStorage.getItem(STORAGE_KEY);
    const count = stored ? parseInt(stored, 10) : (locationStepCount || 0);
    return count < 5 ? count + 1 : 1;
  });
  const [isChecked, setIsChecked] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [requestChanges, setRequestChanges] = useState(false);

  useEffect(() => {
    const storedCount = sessionStorage.getItem(STORAGE_KEY);
    if (stepCount != 5){
    if (!storedCount && locationStepCount !== undefined) {
      setStepCount(locationStepCount);
      sessionStorage.setItem(STORAGE_KEY, locationStepCount.toString());
    }
    else if (storedCount) {
      const parsedStoredCount = parseInt(storedCount, 10);
      setStepCount(parsedStoredCount);
    }
    else if (locationStepCount !== undefined) {
      setStepCount(locationStepCount);
      sessionStorage.setItem(STORAGE_KEY, locationStepCount.toString());
    }
    }
  }, [id, STORAGE_KEY]); // Removed locationStepCount from dependency

  useEffect(() => {
    if (stepCount !== undefined && stepCount != 5) {
      sessionStorage.setItem(STORAGE_KEY, stepCount.toString());
    }
  }, [stepCount, STORAGE_KEY]);

  useEffect(() => {
    const storedCount = sessionStorage.getItem(STORAGE_KEY);
    if (!storedCount && locationStepCount !== undefined && stepCount != 5) {
      setStepCount(locationStepCount);
      sessionStorage.setItem(STORAGE_KEY, locationStepCount.toString());
    }
  }, [id]);

  const handleStepClick = (step) => {
    if (step <= stepCount + 1) {
      setCurrentStep(step);
    }
  };
  const updateStepCount = (newStepCount) => {
    setStepCount(newStepCount);
     if (stepCount != 5) {
    sessionStorage.setItem(STORAGE_KEY, newStepCount.toString());
    }
  };

  useEffect(() => {
    console.log("Current Step:", currentStep);
    console.log("Step Count:", stepCount);
  }, [currentStep, stepCount]);

  const restaurantId = id;

  const steps = [
    { label: "Menu Upload" },
    { label: "Restaurant Profile Setup" },
    { label: "Tax and Commission Setup" },
    { label: "Bank Details Setup" },
    { label: "Delivery Setup" },
  ];

  const onboardingTypeMap = {
    1: "submit",
    2: "profile",
    3: "restaurantdetails",
    4: "bankaccount",
    5: "delivery",
  };

  const breadcrumbItems = [
    {
      name: "Restaurant Details",
      link: "/restaurant-management/onboarding",
    },
    { name: "View Details" },
  ];

  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
  };

  // const handleSubmitStep = async () => {
  //   if (!isChecked) {
  //     toast.error("Please check the confirmation box before submitting.");
  //     return;
  //   }
  //   try {
  //     setDisabled(true);

  //     const onboardingType = onboardingTypeMap[currentStep];

  //     const payloadBody = {
  //       type: "approved",
  //       actionType: "string",
  //       refId: restaurantId,
  //       ids: ["string"],
  //       deliverySetupReviewed: true,
  //       bankAccountReviewed: true,
  //       taxCommissionReviewed: true,
  //       adminAgree: true,
  //       basicDetailsReviewed: true,
  //       locationReviewed: true,
  //       documentsReviewed: true,
  //     };

  //     const response = await payload({
  //       onboardingType,
  //       payload: payloadBody,
  //     }).unwrap();

  //     if (response?.status === true) {
  //       toast.success(`Step ${currentStep} submitted successfully.`);
  //       setIsChecked(false);

  //       // Update stepCount after successful submission
  //       const newStepCount = Math.max(stepCount, currentStep);
  //       updateStepCount(newStepCount);

  //       if (currentStep < 5) {
  //         setCurrentStep(currentStep + 1);
  //       } else if (currentStep === 5) {
  //         // Clear storage when process is complete
  //         sessionStorage.removeItem(STORAGE_KEY);
  //         navigate("/restaurant-management/onboarding");
  //       }
  //     } else {
  //       toast.error("Submission failed. Please try again.");
  //     }
  //   } catch (err) {
  //     toast.error(err?.data?.message || "Something went wrong");
  //   } finally {
  //     setDisabled(false);
  //   }
  // };

  const handleSubmitStep = async () => {
    // if (!isChecked) {
    //   toast.error("Please check the confirmation box before submitting.");
    //   return;
    // }
    try {
  setDisabled(true);
  const onboardingType = onboardingTypeMap[currentStep];
  const payloadBody = {
    type: "approved",
    actionType: "string",
    refId: restaurantId,
    ids: ["string"],
    deliverySetupReviewed: true,
    bankAccountReviewed: true,
    taxCommissionReviewed: true,
    adminAgree: true,
    basicDetailsReviewed: true,
    locationReviewed: true,
    documentsReviewed: true,
  };

  const result = await payload({
    onboardingType,
    payload: payloadBody,
  });

  if (result?.data?.status === true) {
    toast.success(`Step ${currentStep} submitted successfully.`);
    setIsChecked(false);
    const newStepCount = Math.max(stepCount, currentStep);
    updateStepCount(newStepCount);

    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    } else {
      sessionStorage.removeItem(STORAGE_KEY);
      navigate("/restaurant-management/onboarding");
    }
  } else {
    toast.error(result?.error?.data?.message || "Something went wrong 11111111111111111");
  }
} catch (err) {
  toast.error(err?.data?.message || "Something went wrong 2222222222222222222222");
} finally {
  setDisabled(false);
}

  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center">
        <h4 className="text-xl font-bold text-gray-800">Restaurant Details</h4>
        <Breadcrumbs items={breadcrumbItems} />
      </div>

      <div className="bg-white mt-4 rounded p-4 relative min-h-[80vh]">
        <div className="flex h-full relative flex-col">
          <div className="flex">
            <div className="w-1/4 flex-shrink-0 bg-gray-100 rounded p-4">
              <Stepper
                steps={steps}
                currentStep={currentStep}
                onStepClick={handleStepClick}
                stepCount={stepCount}
              />
            </div>

            <div className="px-6 flex-grow">
              {requestChanges ? (
                <div className="flex flex-row items-center mb-4">
                  <div
                    className="cursor-pointer text-sm text-blue-500"
                    onClick={() => setRequestChanges(false)}
                  >
                    ← Back to Details
                  </div>
                </div>
              ) : (
                <>
                  {currentStep === 1 && <Step1 onApprovedCountChange={setApprovedCount} />}
                  {currentStep === 2 && <Step2 />}
                  {currentStep === 3 && <Step3 />}
                  {currentStep === 4 && <Step4 />}
                  {currentStep === 5 && <Step5
                    activated={activatedStep5}
                    setActivated={setActivatedStep5} />}
                </>
              )}

              <div className="mt-10">
                <div className="flex flex-row items-center gap-2 mb-4">
                  {currentStep === 5 && (
                    <input
                      id="consent-check"
                      type="checkbox"
                      className="m-0 cursor-pointer w-4 h-4"
                      checked={isChecked || stepCount >= 5 || currentStep <= stepCount}
                      onChange={handleCheckboxChange}
                      disabled={
                        disabled || currentStep !== 5 || !activatedStep5 || stepCount >= 5
                      }
                    />
                  )}

                  {currentStep !== 5 && (
                    <input
                      id="consent-check"
                      type="checkbox"
                      className={`m-0 w-4 h-4 ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
                      checked={currentStep <= stepCount || isChecked || stepCount >= 5}
                      onChange={handleCheckboxChange}
                      disabled={
                        disabled || stepCount >= 5 || (currentStep === 1 && approvedCount < 3)
                      }
                    />
                  )}

                  <label htmlFor="consent-check" className="text-sm">
                    Checked and Reviewed the above information.
                  </label>
                </div>

                {stepCount < 5 && stepCount < currentStep && (
                  <div className="flex justify-end">
                    <button
                      className={`px-6 py-2 rounded-lg transition-all duration-300 ${isChecked && !disabled
                        ? "bg-primary text-white hover:bg-[#1458BD] cursor-pointer"
                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                        }`}
                      disabled={!isChecked || disabled}
                      onClick={handleSubmitStep}
                    >
                      {disabled ? "Submitting..." : "Submit"}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantDetails;