'use client'

import {useForm} from "react-hook-form";
import {KeyStructure} from "@/types/keys";
import {secondColorTheme} from "@/styles/styles";
import ServerFormError from "@/components/errors/ServerFormError";
import MainInput from "@/components/inputs/MainInput";
import HideInput from "@/components/inputs/HideInput";
import SubmitYellowBtn from "@/components/buttons/yellowButton/SubmitYellowBtn";
import {api, getServerErrorMessage, showErrorMessage} from "@/lib";
import {usePageUtils} from "@/lib/hooks/usePageUtils";
import {BackendApiResponse} from "@/types";
import DropDownContent from "@/components/UI/DropDownContent";

export default function AddNewKey(){

    const { register, handleSubmit, formState: { errors } } = useForm<KeyStructure>();

    const { serverError, setServerError, isSubmitting, setIsSubmitting, router } = usePageUtils();

    const onSubmit = async (values: KeyStructure) => {
        setServerError(null);
        setIsSubmitting(true);

        const payload = {

        };

        try {
            await api.post<BackendApiResponse>(`/`, payload);

            router.push('/keys/catalog');
        } catch (err) {
            const message:string = getServerErrorMessage(err)

            setServerError(message);
            if (showErrorMessage) console.error('AddNewKey error:', err);

            setIsSubmitting(false)
        }
    };

    return (
        <div className={`min-h-screen  text-slate-50 flex items-center justify-center py-8`}>
            <div className="relative z-10 w-full max-w-3xl items-center">
                <section className={`relative rounded-3xl border ${secondColorTheme} px-6 py-8 `}>
                    <header className="mb-6">
                        <p className="text-xs font-medium uppercase tracking-[0.2em] text-sky-300/80">
                            Добавление
                        </p>
                        <h2 className="mt-2 text-2xl sm:text-3xl font-semibold tracking-tight text-slate-50">
                            Добавить новый ключ в магазин
                        </h2>
                    </header>

                    <ServerFormError error={serverError} />

                    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>


                        <DropDownContent label={'Основное описание'}>
                            <MainInput
                                id={`name`}
                                label={`Название игры`}
                                error={errors.name?.message}
                                {...register('name')}
                            />

                            <MainInput
                                id={`price`}
                                label={`Цена`}
                                error={errors.price?.message}
                                {...register('price')}
                            />

                            <MainInput
                                id={`description`}
                                label={`Описание`}
                                error={errors.description?.message}
                                {...register('description')}
                            />

                            <MainInput
                                id={`releaseData`}
                                type={'date'}
                                label={`Дата релиза`}
                                error={errors.releaseData?.message}
                                {...register('releaseData')}
                            />
                        </DropDownContent>

                        <MainInput
                            id={`mainPicture`}
                            label={`Обложка игры`}
                            error={errors.mainPicture?.message}
                            {...register('mainPicture')}
                        />

                        <MainInput
                            id={`otherPictures`}
                            label={`Скриншоты из игры`}
                            error={errors.otherPictures?.message}
                            {...register('otherPictures')}
                        />

                        <MainInput
                            id={`developer`}
                            label={`Разработчик`}
                            error={errors.developer?.message}
                            {...register('developer')}
                        />

                        <MainInput
                            id={`publisher`}
                            label={`Издатель`}
                            error={errors.mainPicture?.message}
                            {...register('mainPicture')}
                        />

                        <MainInput
                            id={`operationSystem`}
                            label={`Операционная система`}
                            error={errors.operationSystem?.message}
                            {...register('operationSystem')}
                        />

                        <MainInput
                            id={`activationPlatform`}
                            label={`Платформы для активации`}
                            error={errors.activationPlatform?.message}
                            {...register('activationPlatform')}
                        />

                        <MainInput
                            id={`genres`}
                            label={`Жанры`}
                            error={errors.genres?.message}
                            {...register('genres')}
                        />

                        <SubmitYellowBtn
                            label={!isSubmitting ? 'Добавить ключ' : 'Добавление…'}
                            disabled={isSubmitting}
                        />
                    </form>
                </section>
            </div>
        </div>
    )
}