import { Stepper, Breadcrumbs } from "../../../../components";
import { images } from "../../../../assets";
import { Step1, Step2, Step3, Step4, Step5 } from "./steps";
import { useState } from "react";
import "./style.css";

const RestaurantDetails = () => {
  const menu = [{}];
  const [requestChanges, setRequestChanges] = useState(false);
  const [currentStep] = useState(1);

  const steps = [
    { label: "Menu Upload" },
    { label: "Restaurant Profile Setup" },
    { label: "Tax and Commission Setup" },
    { label: "Bank Details Setup" },
    { label: "Delivery Setup" },
  ];

  const breadcrumbItems = [
    {
      name: "Restaurant Details",
      link: `/restaurant-management/onboarding`,
    },
    { name: "View Details" },
  ];

  return (
    <div className="p-4">
      <div className="flex justify-between items-center">
        <h4 className="primary-font mb-4 fw-bold fs-3">Restaurant Details</h4>
        <Breadcrumbs items={breadcrumbItems} />
      </div>
      <div
        className="bg-white rounded p-4"
        style={{ height: menu?.length <= 0 && "80vh" }}
      >
        {menu?.length <= 0 ? (
          <div>
            <h5 className="fs-4 mb-0">Menu Upload</h5>
            <div className="flex flex-column justify-center items-center h-100">
              <img src={images.noMenuUploaded} style={{ width: "200px" }} />
              <h3 className="text-custom-primary fs-4 pt-4 primary-font fw-bold">
                No Menu Uploaded{" "}
              </h3>
            </div>
          </div>
        ) : (
          <>
            <div className="flex h-100 position-relative">
              <div className="col-3 bg-custom-secondary rounded p-4">
                <Stepper steps={steps} currentStep={currentStep} />
              </div>
              <div className="col px-4">
                {requestChanges && (
                  <div>
                    <div className="flex flex-row items-center">
                      <div
                        className="cursor-pointer"
                        onClick={() => {
                          setRequestChanges(false);
                        }}
                      ></div>
                    </div>
                  </div>
                )}
                {!requestChanges && currentStep === 1 && (
                  <Step1 setRequestChanges={setRequestChanges} />
                )}
                {!requestChanges && currentStep === 2 && <Step2 />}
                {!requestChanges && currentStep === 3 && <Step3 />}
                {!requestChanges && currentStep === 4 && <Step4 />}
                {!requestChanges && currentStep === 5 && <Step5 />}

                <div className="pt-3 flex flex-row justify-end gap-2">
                  <button
                    className="bg-custom-gray rounded-pill border-0 px-4 py-2 opacity-50"
                    disabled
                  >
                    Save Draft
                  </button>
                  <button
                    className="bg-custom-primary rounded-pill border-0 text-white px-4 py-2 opacity-50"
                    disabled
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default RestaurantDetails;
