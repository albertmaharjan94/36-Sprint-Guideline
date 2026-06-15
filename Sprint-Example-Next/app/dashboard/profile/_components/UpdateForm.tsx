"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { UpdateProfileFormData, updateProfileSchema } from "./schema";
import { handleUpdateProfile } from "@/lib/actions/auth-action";

export default function UpdateForm(
    { user }: { user: any }
) {
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState('');
    const router = useRouter();
    console.log("User data in form:", user);
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm<UpdateProfileFormData>({
        resolver: zodResolver(updateProfileSchema),
        defaultValues: {
            email: user?.email || '',
            firstName: user?.firstName || '',
            lastName: user?.lastName || '',
            username: user?.username || '',
        }
    });

    const onSubmit = (data: UpdateProfileFormData) => {
        setError('');
        startTransition(
            async () => {
                try {
                    const formdata = new FormData();
                    formdata.append("email", data.email || '');
                    formdata.append("firstName", data.firstName || '');
                    formdata.append("lastName", data.lastName || '');
                    formdata.append("username", data.username || '');
                    const result = await handleUpdateProfile(formdata);
                    if(result.success) {
                        router.refresh();
                    }else{
                        setError(result.message || 'Failed to update profile');
                    }
                } catch (error: any) {
                    setError(error?.message || 'Failed to update profile');
                }
            }
        );
    }

    const fieldClass = "h-12 w-full border border-hairline bg-surface-card px-4 text-on-dark placeholder:text-muted outline-none transition-colors focus:border-on-dark";
    const labelClass = "mb-2 block text-xs font-bold uppercase tracking-[1.5px] text-body";
    const errClass = "mt-1 block text-sm text-m-red";

    return (
        <div className="w-full max-w-md">
            <h1 className="mb-8 text-4xl font-bold uppercase leading-none text-on-dark">Update account</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                {error && <div className="mb-6 border border-m-red bg-m-red/10 px-4 py-3 text-sm text-m-red">{error}</div>}
                <div className="mb-5">
                    <label className={labelClass}>Email</label>
                    <input
                        type="email"
                        {...register("email")}
                        placeholder="you@example.com"
                        className={fieldClass}
                    />
                    {errors.email && <span className={errClass}>{errors.email.message}</span>}
                </div>
                <div className="mb-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div>
                        <label className={labelClass}>First Name</label>
                        <input
                            type="text"
                            {...register("firstName")}
                            placeholder="Jane"
                            className={fieldClass}
                        />
                        {errors.firstName && <span className={errClass}>{errors.firstName.message}</span>}
                    </div>
                    <div>
                        <label className={labelClass}>Last Name</label>
                        <input
                            type="text"
                            {...register("lastName")}
                            placeholder="Doe"
                            className={fieldClass}
                        />
                        {errors.lastName && <span className={errClass}>{errors.lastName.message}</span>}
                    </div>
                </div>
                <div className="mb-5">
                    <label className={labelClass}>Username</label>
                    <input
                        type="text"
                        {...register("username")}
                        placeholder="janedoe"
                        className={fieldClass}
                    />
                    {errors.username && <span className={errClass}>{errors.username.message}</span>}
                </div>
                
                <button
                    type="submit"
                    disabled={isSubmitting || isPending}
                    className="flex h-12 w-full items-center justify-center bg-on-dark text-xs font-bold uppercase tracking-[1.5px] text-canvas transition-opacity hover:opacity-90 disabled:opacity-50"
                >
                    {isPending ? "Updating profile..." : "Update Profile"}
                </button>
            </form>
        </div>
    );
}
