"use client";
import { IconAdd } from "@/components/icons/IconAdd";
import React, { useState } from "react";
import Modal from "@/components/modules/dashboard/Modal";
import { useAuth } from "@/context/AuthContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { addNote } from "@/validations/note";
import { restoreAccessToken } from "@/utils/restoreAccessToken";
import { toast } from "sonner";
import { IconPaper } from "@/components/icons/IconPaper";
import { IconDescription } from "@/components/icons/IconDescription";
import { useRouter } from "next/navigation";

type addNoteFormData = {
  title: string;
  description: string;
};

export default function AddNoteBtn() {
  const router = useRouter();

  const [openModal, setOpenModal] = useState<boolean>(false);

  const { accessToken, setAccessToken } = useAuth();
  const queryClient = useQueryClient();

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",

      description: "",
    },
    resolver: yupResolver(addNote),
  });

  const modalToggleHandle = () => setOpenModal(false);

  const mutation = useMutation({
    mutationFn: async (data: addNoteFormData) => {
      const makeRequest = async (token: string) => {
        return await fetch("http://localhost:4002/api/v1/notes", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ ...data }),
        });
      };

      let res = await makeRequest(accessToken!);

      let result = await res.json();

      if (result.statusCode === 401) {
        const newToken = await restoreAccessToken();
        if (!newToken) throw new Error("Unauthorized");
        setAccessToken(newToken);
        res = await makeRequest(newToken);
        result = await res.json();
      }
      if (result.statusCode !== 201) throw new Error("Failed to add note");

      return result.data;
    },
    onSuccess: (data) => {
      toast.success("یادداشت با موفقیت افزوده شد");

      const totalCount = data.totalCount;
      const lastPage = Math.ceil(totalCount / 6);

      router.push(`/dashboard/notes?page=${lastPage}`);

      queryClient.invalidateQueries({ queryKey: ["notes"] });

      reset();
      modalToggleHandle();
    },

    onError: () => {
      toast.error("خطا در افزودن یادداشت");
    },
  });

  const addNoteHandle = async (data: addNoteFormData) => {
    mutation.mutate(data);
  };

  return (
    <>
      <button
        onClick={() => setOpenModal(true)}
        className="flex justify-center items-center  p-3 lg:p-4 gap-2 mb-10 text-base xs:text-lg lg:text-[18px] bg-[var(--color-secondary)] text-white w-auto h-auto rounded-2xl lg:rounded-3xl shadow-xl cursor-pointer"
      >
        افزودن یادداشت جدید
        <IconAdd size="w-6 h-6 lg:w-7 lg:h-7" color="#ffffff" />
      </button>
      {openModal ? (
        <Modal onClose={modalToggleHandle}>
          <>
            <h2 className="w-1/2 md:w-1/5 mx-auto text-center pb-2 mb-12 text-lg xs:text-2xl font-bold  rounded-xl text-nowrap">
              افزودن کارت
            </h2>
            <form
              onSubmit={handleSubmit(addNoteHandle)}
              className="px-0 md:px-32 flex items-center justify-center flex-wrap gap-y-5 text-xs xs:text-base"
            >
              <div className="w-full">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 xs:w-12 xs:h-12 flex justify-center items-center rounded-full bg-[var(--color-secondary)]">
                    <IconPaper size="w-7 h-7 xs:w-8 xs:h-8" color="#ffffff" />
                  </div>
                  <input
                    {...register("title")}
                    type="text"
                    className="w-full bg-[var(--color-secondary)] p-3 placeholder:text-white rounded-xl text-white outline-0"
                    placeholder="عنوان یادداشت را وارد کنید"
                  />
                </div>

                <span className="text-right pt-1.5  text-sm  text-red-600">
                  {errors.title && errors.title.message}
                </span>
              </div>

              <div className="w-full">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 xs:w-12 xs:h-12 flex justify-center items-center rounded-full bg-[var(--color-secondary)]">
                    <IconDescription
                      size="w-5 h-5 xs:w-6 xs:h-6"
                      color="#ffffff"
                    />{" "}
                  </div>
                  <textarea
                    {...register("description")}
                    className="w-full bg-[var(--color-secondary)] p-3 resize-none placeholder:text-white rounded-xl text-white outline-0"
                    placeholder="متن یادداشت را وارد کنید"
                  ></textarea>
                </div>

                <span className="text-right pt-1.5  text-sm  text-red-600">
                  {errors.description && errors.description.message}
                </span>
              </div>
              <button
                type="submit"
                className="mt-7 w-1/2 md:w-1/6 h-10 xs:h-12 flex justify-center items-center text-white rounded-xl bg-[var(--color-primary)] text-base  xs:text-lg cursor-pointer"
              >
                تایید
              </button>
            </form>
          </>
        </Modal>
      ) : null}
    </>
  );
}
