"use client";
import { InputTypes, Routes, UserRole } from "@/constants/enums";
import useFormFields from "@/hooks/useFormFields";
import { IFormField } from "@/types/app";
import { Translations } from "@/types/translation";
import { Session } from "next-auth";
import Image from "next/image";
import FormFields from "../form-fields/form-fields";
import { Button } from "../ui/button";
import Checkbox from "../form-fields/checkbox-field";
import React, { useActionState, useEffect, useState } from "react";

import { ValidationErrors } from "@/validations/auth";
import Loader from "../ui/loader";
import { updateProfile } from "./_actions/profile";
import { CameraIcon } from "lucide-react";
import { toast } from "sonner";

export default function EditUserForm({
  translation,
  user,
}: {
  user: Session["user"];
  translation: Translations;
}) {

  const formData = new FormData();
  Object.entries(user).forEach(([key, value]) => {
    if (value !== null && value !== undefined && key !== "image") {
      formData.append(key, value.toString());
    }
  });
  formData.append("email", user.email);
  const initialState: {
    message?: string;
    error?: ValidationErrors;
    status?: number | null;
    formData?: FormData | null;
  } = {
    message: "",
    error: {},
    status: null,
    formData,
  };

  const [selectedImage, setSelectedImage] = useState(user.image ?? "");
  const[isAdmin,setIsAdmin]=useState(user.role===UserRole.ADMIN)
  const [state, action, pending] = useActionState(updateProfile.bind(null,isAdmin), initialState);
  const { getFormFields } = useFormFields({
    slug: Routes.PROFILE,
    translations: translation,
  });

  useEffect(() => {
    if (state?.message && state.status === 200 && !pending) {
      toast.success(state.message, {
        position: "top-center",
        className: "!text-green-400",
      });
    }
    if (state?.message && state.status !== 200 && !pending) {
      toast.error(state.message, {
        position: "top-center",
        className: "!text-destrcuctive",
      });
    }
  }, [state?.message, state?.status, pending]);

  useEffect(() => {
    setSelectedImage(user.image as string);
  }, [user.image]);

  return (
    <form action={action} className=" flex flex-col md:flex-row gap-10">
      <div className=" group relative w-[200px] h-[200px] overflow-hidden rounded-full ">
        <Image
          src={selectedImage}
          alt={user.name}
          width={200}
          height={200}
          className="object-cover rounded-full"
        />
        <div
          //solve image again
          // ${
          //     selectedImage
          //       ? " group-hover:opacity-[1] opacity-0 transition-opacity duration-200"
          //       : ""
          //   }
          className={` absolute top-0 left-0 w-full h-full bg-gray-50/40`}
        >
          <UploadImage setSelectedImage={setSelectedImage} />
        </div>
      </div>
      <div className="flex-1">
        {getFormFields().map((field: IFormField) => {
          const fieldValue =
            state?.formData?.get(field.name) ?? formData.get(field.name);
          return (
            <div key={field.name} className=" mb-3">
              <FormFields
                {...field}
                error={state?.error}
                defaultValue={fieldValue as string}
                readOnly={field.type === InputTypes.EMAIL}
              />
            </div>
          );
        })}
        {user.role === UserRole.ADMIN && (
          <div className=" flex items-center gap-2 my-4">
            <Checkbox  name="admin" label="Admin" checked={isAdmin} onClick={()=>setIsAdmin(!isAdmin)} />
            {/* <Label htmlFor="is-admin" className="text-sm">
              Admin
            </Label> */}
          </div>
        )}
        <Button type="submit" className="w-full">
          {pending ? <Loader /> : translation.save}
        </Button>
      </div>
    </form>
  );
}

const UploadImage = ({
  setSelectedImage,
}: {
  setSelectedImage: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setSelectedImage(url);
    }
  };
  return (
    <>
      <input
        type="file"
        accept="image/*"
        className=" hidden"
        id="image-upload"
        onChange={handleImageChange}
        name="image"
      />
      <label
        htmlFor="image-upload"
        className=" border rounded-full w-[200px] h-[200px] element-center cursor-pointer  "
      >
        <CameraIcon className="!w-8 !h-8 text-accent" />
      </label>
    </>
  );
};
