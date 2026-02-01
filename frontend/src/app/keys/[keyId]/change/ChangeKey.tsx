'use client'

import {AddKeyData, KeyDetailsData} from "@/types/key";
import {Controller, useForm} from "react-hook-form";
import {usePageUtils} from "@/lib/hooks/usePageUtils";
import {api, getDateInputFormat, getServerErrorMessage, showErrorMessage} from "@/lib";
import {BackendApiResponse} from "@/types";
import {secondColorTheme} from "@/styles/styles";
import ServerFormError from "@/components/errors/ServerFormError";
import DropDownContent from "@/components/UI/DropDownContent";
import MainInput from "@/components/inputs/MainInput";
import MultiSelectInput from "@/components/inputs/MultiSelectInput";
import {activationPlatformOptions, genreOptions, operationSystemOptions} from "@/lib/data";
import SubmitYellowBtn from "@/components/buttons/yellowButton/SubmitYellowBtn";
import {useSimpleModalWindow} from "@/lib/hooks/useSimpleModalWindow";
import SimpleModalWindow from "@/components/elements/SimpleModalWindow";
import YellowBtn from "@/components/buttons/yellowButton/YellowBtn";
import {useCallback} from "react";
import {deleteKey} from "@/lib/controllers/keysController";

export default function ChangeKey({keyData, token}: {keyData: KeyDetailsData, token: string }) {

    const { register, handleSubmit, control, formState: { errors } } = useForm<AddKeyData>({
        defaultValues: {
            name: keyData.name,
            keyUrl: keyData.keyUrl,
            price: keyData.price,
            description: keyData.description,
            releaseDate: getDateInputFormat(keyData.releaseDate),
            mainPicture: keyData.mainPicture,
            otherPictures: keyData.otherPictures,
            developer: keyData.developer,
            publisher: keyData.publisher,
            operationSystem: keyData.operationSystem,
            activationPlatform: keyData.activationPlatform,
            genres: keyData.genres,
            systemRequirements: {
                minimal: {
                    CPU: keyData.systemRequirements.minimal.CPU,
                    GPU: keyData.systemRequirements.minimal.GPU,
                    RAM: keyData.systemRequirements.minimal.RAM,
                    memory: keyData.systemRequirements.minimal.memory,
                },
                recommended: {
                    CPU: keyData.systemRequirements.recommended.CPU,
                    GPU: keyData.systemRequirements.recommended.GPU,
                    RAM: keyData.systemRequirements.recommended.RAM,
                    memory: keyData.systemRequirements.recommended.memory,
                }
            }
        }
    });

    const { serverError, setServerError, isSubmitting, isDeleting, setIsDeleting, setIsSubmitting, router } = usePageUtils();
    const {isRendered, isProcess, isExiting, toggleModalWindow, windowModalRef} = useSimpleModalWindow();

    const toPicturesArray = (value: AddKeyData['otherPictures']) => {
        if (Array.isArray(value)) {
            return value;
        }

        return String(value ?? '')
            .split(/[\n,]+/g)
            .map((item) => item.trim())
            .filter((item) => item.length > 0);
    };

    const onSubmit = async (values: AddKeyData) => {
        setServerError(null);
        setIsSubmitting(true);

        const payload: KeyDetailsData = {
            id: keyData.id,
            name: values.name,
            keyUrl: values.keyUrl,
            price: values.price,
            description: values.description,
            releaseDate: values.releaseDate,
            mainPicture: values.mainPicture,
            otherPictures: toPicturesArray(values.otherPictures),
            developer: values.developer,
            publisher: values.publisher,
            operationSystem: values.operationSystem,
            activationPlatform: values.activationPlatform,
            genres: values.genres,
            systemRequirements: {
                minimal: {
                    CPU: values.systemRequirements.minimal.CPU,
                    GPU: values.systemRequirements.minimal.GPU,
                    RAM: values.systemRequirements.minimal.RAM,
                    memory: values.systemRequirements.minimal.memory,
                },
                recommended: {
                    CPU: values.systemRequirements.recommended.CPU,
                    GPU: values.systemRequirements.recommended.GPU,
                    RAM: values.systemRequirements.recommended.RAM,
                    memory: values.systemRequirements.recommended.memory,
                }
            }
        };

        try {
            console.log(payload);
            await api.put<BackendApiResponse>(`/keys/key`, payload);

            router.push('/keys/catalog');
        } catch (err) {
            const message:string = getServerErrorMessage(err)

            setServerError(message);
            if (showErrorMessage) console.error('ChangeKey error:', err);

            setIsSubmitting(false)
        }
    };

    const deleteKeyBtn = useCallback(async () => {
        setServerError(null);
        setIsDeleting(true);
        
        try {
            await deleteKey(token, keyData.id);

            router.replace("/keys/catalog");
        } catch (error) {
            setIsDeleting(false);

            console.error("key delete error:", error);

            setServerError("Не удалось удалить ключ. Попробуйте ещё раз позже.");
        }
    }, [keyData.id, router, setIsDeleting, setServerError, token])

    return (
       <>
           <div className={`min-h-screen  text-slate-50 flex items-center justify-center py-8`}>
               <div className="relative z-10 w-full max-w-3xl items-center">
                   <section className={`relative rounded-3xl border ${secondColorTheme} px-6 py-8 `}>
                       <header className="mb-6">
                           <p className="text-xs font-medium uppercase tracking-[0.2em] text-sky-300/80">
                               Изменение
                           </p>
                           <h2 className="mt-2 text-2xl sm:text-3xl font-semibold tracking-tight text-slate-50">
                               Изменить уже существующий ключ в магазине
                           </h2>
                       </header>

                       <ServerFormError error={serverError} />

                       <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>

                           <DropDownContent label={'Основная информация'}>
                               <MainInput
                                   id={`name`}
                                   label={`Название игры`}
                                   error={errors.name?.message}
                                   {...register('name')}
                               />

                               <MainInput
                                   id={`keyUrl`}
                                   label={`URL для ключа`}
                                   error={errors.keyUrl?.message}
                                   {...register('keyUrl')}
                               />

                               <MainInput
                                   id={`price`}
                                   label={`Цена (руб)`}
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
                                   error={errors.releaseDate?.message}
                                   {...register('releaseDate')}
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
                                   {...register('publisher')}
                               />

                           </DropDownContent>

                           <DropDownContent label={`Изображения`}>
                               <MainInput
                                   id={`mainPicture`}
                                   label={`Обложка игры (url)`}
                                   error={errors.mainPicture?.message}
                                   {...register('mainPicture')}
                               />

                               <MainInput
                                   id={`otherPictures`}
                                   label={`Скриншоты из игры (url)`}
                                   error={errors.otherPictures?.message}
                                   {...register('otherPictures')}
                               />
                           </DropDownContent>

                           <DropDownContent label={`Системные требования`}>

                               <div className="flex items-center justify-between gap-3">
                                   <div className="w-full space-y-4">
                                       <h1 className={`mb-3 ml-2 text-base`}>Минимальные</h1>
                                       <MainInput
                                           id={`minimalCPU`}
                                           label={`Процессор`}
                                           error={errors.systemRequirements?.minimal?.CPU?.message}
                                           {...register('systemRequirements.minimal.CPU')}
                                       />
                                       <MainInput
                                           id={`minimalGPU`}
                                           label={`Видеокарта`}
                                           error={errors.systemRequirements?.minimal?.GPU?.message}
                                           {...register('systemRequirements.minimal.GPU')}
                                       />
                                       <MainInput
                                           id={`minimalRAM`}
                                           label={`ОЗУ`}
                                           error={errors.systemRequirements?.minimal?.RAM?.message}
                                           {...register('systemRequirements.minimal.RAM')}
                                       />
                                       <MainInput
                                           id={`minimalMemory`}
                                           label={`Память`}
                                           error={errors.systemRequirements?.minimal?.memory?.message}
                                           {...register('systemRequirements.minimal.memory')}
                                       />
                                   </div>

                                   <div className="w-full space-y-4">
                                       <h1 className={`mb-3 ml-2 text-base`}>Рекомендованные</h1>
                                       <MainInput
                                           id={`recommendedCPU`}
                                           label={`Процессор`}
                                           error={errors.systemRequirements?.recommended?.CPU?.message}
                                           {...register('systemRequirements.recommended.CPU')}
                                       />
                                       <MainInput
                                           id={`recommendedGPU`}
                                           label={`Видеокарта`}
                                           error={errors.systemRequirements?.recommended?.GPU?.message}
                                           {...register('systemRequirements.recommended.GPU')}
                                       />
                                       <MainInput
                                           id={`recommendedRAM`}
                                           label={`ОЗУ`}
                                           error={errors.systemRequirements?.recommended?.RAM?.message}
                                           {...register('systemRequirements.recommended.RAM')}
                                       />
                                       <MainInput
                                           id={`recommendedMemory`}
                                           label={`Память`}
                                           error={errors.systemRequirements?.recommended?.memory?.message}
                                           {...register('systemRequirements.recommended.memory')}
                                       />
                                   </div>
                               </div>
                           </DropDownContent>

                           <Controller
                               control={control}
                               name="operationSystem"
                               render={({field, fieldState}) => (
                                   <MultiSelectInput
                                       id="operationSystem"
                                       label="Операционная система"
                                       options={operationSystemOptions}
                                       value={operationSystemOptions.filter(o => (field.value ?? []).includes(o.value as never))}
                                       onChange={(vals) => field.onChange(vals.map(v => v.value as never))}
                                       isMulti={true}
                                       error={fieldState.error?.message}
                                   />
                               )}
                           />

                           <Controller
                               control={control}
                               name="activationPlatform"
                               render={({field, fieldState}) => (
                                   <MultiSelectInput
                                       id="activationPlatform"
                                       label="Платформы для активации"
                                       options={activationPlatformOptions}
                                       value={activationPlatformOptions.filter(o => (field.value ?? []).includes(o.value as never))}
                                       onChange={(vals) => field.onChange(vals.map(v => v.value as never))}
                                       isMulti={true}
                                       error={fieldState.error?.message}
                                   />
                               )}
                           />

                           <Controller
                               control={control}
                               name="genres"
                               render={({field, fieldState}) => (
                                   <MultiSelectInput
                                       id="genres"
                                       label="Жанры"
                                       options={genreOptions}
                                       value={genreOptions.filter(o => (field.value ?? []).includes(o.value as never))}
                                       onChange={(vals) => field.onChange(vals.map(v => v.value as never))}
                                       isMulti={true}
                                       error={fieldState.error?.message}
                                   />
                               )}
                           />

                           <div className="flex-row md:flex gap-4 space-y-3 md:space-y-0 ">
                               <SubmitYellowBtn
                                   label={!isSubmitting ? 'Изменить ключ' : 'Изменение…'}
                                   disabled={isSubmitting || isDeleting}
                               />

                               <YellowBtn
                                   label={!isDeleting ? 'Удалить ключ' : 'Удаление…'}
                                   disabled={isSubmitting || isDeleting}
                                   onClick={toggleModalWindow}
                               />
                           </div>
                       </form>
                   </section>
               </div>
           </div>

           <SimpleModalWindow
               isExiting={isExiting}
               modalRef={windowModalRef}
               windowLabel={'Подтверждение удаления'}
               windowText={`Вы действительно хотите удалить ключ ${keyData.name}? Это действие необратимо.`}
               error={serverError}
               cancelButtonLabel={'Отмена'}
               cancelFunction={toggleModalWindow}
               confirmButtonLabel={'Удалить'}
               confirmFunction={deleteKeyBtn}
               isProcess={isProcess}
               isRendered={isRendered}
           />
       </>
    )
}