"use client";
import React, { useState } from "react";
import { IconProfile } from "@/components/icons/IconProfile";
import { IconActionDot } from "@/components/icons/IconActiondot";
import { IconDelete } from "@/components/icons/IconDelete";
import { toPersianDigits } from "@/utils/normalizeDigits";
import Modal from "@/components/modules/dashboard/Modal";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { restoreAccessToken } from "@/utils/restoreAccessToken";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { editNote } from "@/validations/note";
import { yupResolver } from "@hookform/resolvers/yup";
import { IconPaper } from "@/components/icons/IconPaper";
import { IconDescription } from "@/components/icons/IconDescription";

type NotePropType = {
  color: string;
  bgColor: string;
  border: string;
  id: number;
  title: string;
  description: string;
  createdAt: string;
};

type EditNoteFormData = {
  title?: string | null;
  description?: string | null;
};

export default function NoteCard({
  color,
  bgColor,
  border,
  id,
  title,
  description,
  createdAt,
}: NotePropType) {
  const [toggleEditBtn, setToggleEditBtn] = useState<boolean>(false);
  const [isOpenNote, setIsOpenNote] = useState<boolean>(false);
  const [openEditModal, setOpenEditModal] = useState<boolean>(false);

  const editModalHandle = () => setOpenEditModal(false);

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title,
      description,
    },
    resolver: yupResolver(editNote),
  });

  const queryClient = useQueryClient();
  const { accessToken, setAccessToken } = useAuth();
  const router = useRouter();

  const closeNoteHanlde = () => setIsOpenNote(false);

  /////// edit logic /////////
  const editMutation = useMutation({
    mutationFn: async (data: EditNoteFormData) => {
      const makeRequest = async (token: string) => {
        return await fetch(`http://localhost:4002/api/v1/notes/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
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
      if (result.statusCode !== 200) throw new Error("Failed to edit note");

      return result.data;
    },

    onSuccess: () => {
      toast.success("یادداشت با موفقیت ویرایش شد");
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      editModalHandle();
    },
    onError: () => {
      toast.error("خطا در ویرایش  یادداشت");
      editModalHandle();
    },
  });

  const editNoteHandle = async (data: EditNoteFormData) => {
    swal({
      title: "آیا از ویرایش اطمینان دارید ؟",
      icon: "warning",
      buttons: ["خیر", "بله"],
    }).then((value) => {
      if (value) {
        editMutation.mutate(data);
      }
    });
  };

  //////// delete logic ///////

  const removeMutation = useMutation({
    mutationFn: async () => {
      const makeRequest = async (token: string) => {
        return await fetch(`http://localhost:4002/api/v1/notes/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
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
      if (result.statusCode !== 200) throw new Error("Failed to remove note");

      return result.data;
    },
    onSuccess: (data) => {
      toast.success("یادداشت با موفقیت حذف شد");

      const totalCount = data.totalCount;
      const lastPage = Math.ceil(totalCount / 6); // 6 = your pagination limit

      router.push(`/dashboard/notes?page=${lastPage}`);

      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
    onError: () => {
      toast.error("خطا در حذف درامد");
    },
  });

  const deleteNoteHandle = () => {
    swal({
      title: "آیا از حذف اطمینان دارید ؟",
      icon: "warning",
      buttons: ["خیر", "بله"],
    }).then((value) => {
      if (value) {
        removeMutation.mutate();
      }
    });
  };

  return (
    <div
      className={`w-full xs:w-[350px] lg:w-[370px] ${bgColor}  rounded-xl border-b-2 ${border} p-3 shadow-xl`}
    >
      <div className="flex w-full justify-between">
        <div className="flex items-center gap-x-3 ">
          <IconProfile color={color} />
          <div className="text-sm">
            <p className="pb-1 font-semibold text-sm xs:text-base">{title}</p>
            <p className="text-zinc-500 text-xs xs:text-sm">
              {toPersianDigits(createdAt.toLocaleString().split(" ")[0])}
            </p>
          </div>
        </div>
        <div className="relative">
          <button
            onClick={() => setToggleEditBtn(!toggleEditBtn)}
            className="cursor-pointer"
          >
            <IconActionDot size="w-6 h-6" color={color} />
          </button>

          {toggleEditBtn && (
            <>
              <button
                onClick={() => setOpenEditModal(true)}
                className="absolute flex justify-center items-center -right-7 top-8 cursor-pointer rounded-md bg-white px-2 py-0.5
            text-sm shadow-sm shadow-zinc-300/50"
              >
                ویرایش
              </button>
              <button
                onClick={() => setIsOpenNote(!isOpenNote)}
                className="absolute flex justify-center items-center -right-7 top-16 cursor-pointer rounded-md bg-white px-1.5 py-0.5
            text-sm shadow-sm shadow-zinc-300/50"
              >
                مشاهده
              </button>
            </>
          )}
        </div>
      </div>
      <div className="h-16 sm:h-22">
        <p className="truncate text-sm xs:text-[.9rem] pt-4 text-white">
          {description}
        </p>
      </div>

      <button
        onClick={deleteNoteHandle}
        className="w-full flex items-center justify-end text-xl cursor-pointer font-bold"
      >
        <IconDelete size="w-6 h-6" color={color} />
      </button>
      {isOpenNote && (
        <Modal onClose={closeNoteHanlde}>
          <div className="flex flex-col items-center justify-between gap-10">
            <h3 className="text-xl font-black">متن یادداشت</h3>
            <p className="">{description}</p>
          </div>
        </Modal>
      )}
      {openEditModal && (
        <Modal onClose={editModalHandle}>
          <>
            <h2 className="w-1/2 md:w-1/5 mx-auto text-center pb-2 mb-12 text-lg xs:text-2xl font-bold  rounded-xl text-nowrap">
              افزودن کارت
            </h2>
            <form
              onSubmit={handleSubmit(editNoteHandle)}
              className="px-0 md:px-32 flex items-center justify-center flex-wrap gap-y-5 text-xs xs:text-base"
            >
              <div className="w-full">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 xs:w-12 xs:h-12 flex justify-center items-center rounded-full bg-[var(--color-theme)]">
                    <IconPaper size="w-7 h-7 xs:w-8 xs:h-8" color="#52525B" />
                  </div>
                  <input
                    {...register("title")}
                    type="text"
                    className="w-full bg-[var(--color-theme)] p-3 placeholder:text-[#52525B] rounded-xl text-[#52525B] outline-0"
                    placeholder="عنوان یادداشت را وارد کنید"
                  />
                </div>

                <span className="text-right pt-1.5  text-sm  text-red-600">
                  {errors.title && errors.title.message}
                </span>
              </div>

              <div className="w-full">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 xs:w-12 xs:h-12 flex justify-center items-center rounded-full bg-[var(--color-theme)]">
                    <IconDescription
                      size="w-5 h-5 xs:w-6 xs:h-6"
                      color="#52525B"
                    />{" "}
                  </div>
                  <textarea
                    {...register("description")}
                    className="w-full bg-[var(--color-theme)] p-3 resize-none placeholder:text-[#52525B] rounded-xl text-[#52525B] outline-0"
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
      )}
    </div>
  );
}
