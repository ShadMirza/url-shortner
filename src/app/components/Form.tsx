"use client";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import toast, { Toaster } from "react-hot-toast";

const schema = yup.object({
  longLink: yup.string().url().max(50).required(),
  miniLink: yup.string().max(10),
});

const Form = () => {
  const [generatedLink, setGeneratedLink] = useState("");
  const [linkExists, setLinkExists] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });
  const onSubmit = async (data:any) => {
    setLinkExists(false);
    try {
      const res = await fetch("/api/url-shortner", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
  
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
  
      const responseData = await res.json();
      setGeneratedLink(responseData?.generatedLink);
      setLinkExists(responseData?.linkExists);
  
    } catch (error:any) {
      console.error('Error:', error.message);
      // Handle error as needed, e.g., show a toast message
      toast("An error occurred while processing your request", { icon: "❌" });
    }
  };
  
  useEffect(() => {
    if (linkExists) {
      toast("Similar URL already exists", { icon: "⚠️" });
    }
  }, [linkExists]);
  return (
    <>
      <Toaster position="top-center" reverseOrder={true} />
      <form method="post" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Enter Your Long URL</span>
          </label>
          <input
            type="text"
            placeholder=""
            className="input input-bordered w-full max-w-xs text-base"
            {...register("longLink", { required: true, maxLength: 50 })}
          />
          <p className="text-error text-sm">{errors.longLink?.message}</p>
        </div>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Your Mini URL</span>
          </label>
          <input
            type="text"
            placeholder="eg. /edfgh3 (Optional)"
            className="input input-bordered w-full max-w-xs text-base"
            {...register("miniLink", { required: true, maxLength: 50 })}
          />
          <p className="text-error text-sm">{errors.miniLink?.message}</p>
        </div>
        <div className="card-actions justify-end mt-4">
          <input type="submit" value="Shorten !" className="btn btn-neutral" />
        </div>
      </form>
      {generatedLink ? (
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Your generated URL is</span>
          </label>
          <div
            className="tooltip tooltip-bottom"
            data-tip={isCopied ? "Copied" : "Copy to clipboard"}
          >
            <input
              readOnly
              type="text"
              value={generatedLink}
              className="input input-bordered w-full max-w-xs hover:cursor-pointer"
              onClick={(e) => {
                navigator.clipboard.writeText(generatedLink);
                setIsCopied(true);
              }}
            />
          </div>
        </div>
      ) : (
        null
      )}
    </>
  );
};

export default Form;
