'use client'

import {useForm, Controller} from "react-hook-form";
import {AddKeyData, KeyFormValues} from "@/types/key";
import {secondColorTheme} from "@/styles/styles";
import ServerFormError from "@/components/errors/ServerFormError";
import MainInput from "@/components/inputs/MainInput";
import SubmitYellowBtn from "@/components/buttons/yellow/SubmitYellowBtn";
import {serverApi, getServerErrorMessage, showErrorMessage} from "@/lib";
import {usePageUtils} from "@/lib/hooks/usePageUtils";
import {BackendApiResponse} from "@/types";
import DropDownContent from "@/components/UI/DropDownContent";
import MultiSelectInput from "@/components/inputs/MultiSelectInput";
import {
    activationPlatformOptions,
    genreOptions,
    operationSystemOptions
} from "@/lib/data";
import MainTextarea from "@/components/inputs/MainTextArea";
import {
    validateKeyCPU,
    validateKeyDescription, validateKeyDeveloper, validateKeyGenres, validateKeyGPU, validateKeyMainPicture, validateKeyMemory,
    validateKeyName, validateKeyOS, validateKeyOtherPicture,
    validateKeyPlatforms, validateKeyPrice, validateKeyPublisher, validateKeyRAM, validateKeyReleaseDate,
    validateKeyUrl
} from "@/lib/validators/key";

export default function AddNewKey(){

    const { register, handleSubmit, control, formState: { errors } } = useForm<KeyFormValues>();

    const { serverError, setServerError, isSubmitting, setIsSubmitting, router } = usePageUtils();

    const onSubmit = async (values: KeyFormValues) => {
        setServerError(null);
        setIsSubmitting(true);

        const payload: AddKeyData = {
            name: values.name,
            keyUrl: values.keyUrl,
            price: Number(values.price),
            description: values.description,
            releaseDate: values.releaseDate,
            mainPicture: values.mainPicture,
            otherPictures: [values.firstOtherPicture, values.secondOtherPicture, values.thirdOtherPicture],
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
            await serverApi.post<BackendApiResponse>(`/key/key`, payload);

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

                        <DropDownContent label={'Основная информация'}>
                            <MainInput
                                id={`name`}
                                label={`Название игры`}
                                error={errors.name?.message}
                                {...register('name', {validate: (value) => validateKeyName(value) || true})}
                            />

                            <MainInput
                                id={`keyUrl`}
                                label={`URL для ключа`}
                                error={errors.keyUrl?.message}
                                {...register('keyUrl', {validate: (value) => validateKeyUrl(value) || true})}
                            />

                            <MainInput
                                id={`price`}
                                label={`Цена (руб)`}
                                error={errors.price?.message}
                                {...register('price', {validate: (value) => validateKeyPrice(value) || true})}
                            />

                            <MainTextarea
                                id={`description`}
                                label={`Описание`}
                                error={errors.description?.message}
                                {...register('description', {validate: (value) => validateKeyDescription(value) || true})}
                            />

                            <MainInput
                                id={`releaseDate`}
                                type={'date'}
                                label={`Дата релиза`}
                                error={errors.releaseDate?.message}
                                {...register('releaseDate', {validate: (value) => validateKeyReleaseDate(value) || true})}
                            />

                            <MainInput
                                id={`developer`}
                                label={`Разработчик`}
                                error={errors.developer?.message}
                                {...register('developer', {validate: (value) => validateKeyDeveloper(value) || true})}
                            />

                            <MainInput
                                id={`publisher`}
                                label={`Издатель`}
                                error={errors.publisher?.message}
                                {...register('publisher', {validate: (value) => validateKeyPublisher(value) || true})}
                            />
                        </DropDownContent>

                        <DropDownContent label={`Изображения`}>
                            <MainInput
                                id={`mainPicture`}
                                label={`Обложка игры (url)`}
                                error={errors.mainPicture?.message}
                                {...register('mainPicture', {validate: (value) => validateKeyMainPicture(value) || true})}
                            />

                            <MainInput
                                id={`firstOtherPicture`}
                                label={`Первый скриншот из игры (url)`}
                                error={errors.firstOtherPicture?.message}
                                {...register('firstOtherPicture', {validate: (value) => validateKeyOtherPicture(value) || true})}
                            />

                            <MainInput
                                id={`secondOtherPicture`}
                                label={`Второй скриншот из игры (url)`}
                                error={errors.secondOtherPicture?.message}
                                {...register('secondOtherPicture', {validate: (value) => validateKeyOtherPicture(value) || true})}
                            />

                            <MainInput
                                id={`thirdOtherPicture`}
                                label={`Третий скриншот из игры (url)`}
                                error={errors.thirdOtherPicture?.message}
                                {...register('thirdOtherPicture', {validate: (value) => validateKeyOtherPicture(value) || true})}
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
                                        {...register('systemRequirements.minimal.CPU', {validate: (value) => validateKeyCPU(value) || true})}
                                    />
                                    <MainInput
                                        id={`minimalGPU`}
                                        label={`Видеокарта`}
                                        error={errors.systemRequirements?.minimal?.GPU?.message}
                                        {...register('systemRequirements.minimal.GPU', {validate: (value) => validateKeyGPU(value) || true})}
                                    />
                                    <MainInput
                                        id={`minimalRAM`}
                                        label={`ОЗУ`}
                                        error={errors.systemRequirements?.minimal?.RAM?.message}
                                        {...register('systemRequirements.minimal.RAM', {validate: (value) => validateKeyRAM(value) || true})}

                                    />
                                    <MainInput
                                        id={`minimalMemory`}
                                        label={`Память`}
                                        error={errors.systemRequirements?.minimal?.memory?.message}
                                        {...register('systemRequirements.minimal.memory', {validate: (value) => validateKeyMemory(value) || true})}
                                    />
                                </div>

                                <div className="w-full space-y-4">
                                    <h1 className={`mb-3 ml-2 text-base`}>Рекомендованные</h1>
                                    <MainInput
                                        id={`recommendedCPU`}
                                        label={`Процессор`}
                                        error={errors.systemRequirements?.recommended?.CPU?.message}
                                        {...register('systemRequirements.recommended.CPU', {validate: (value) => validateKeyCPU(value) || true})}
                                    />
                                    <MainInput
                                        id={`recommendedGPU`}
                                        label={`Видеокарта`}
                                        error={errors.systemRequirements?.recommended?.GPU?.message}
                                        {...register('systemRequirements.recommended.GPU', {validate: (value) => validateKeyGPU(value) || true})}
                                    />
                                    <MainInput
                                        id={`recommendedRAM`}
                                        label={`ОЗУ`}
                                        error={errors.systemRequirements?.recommended?.RAM?.message}
                                        {...register('systemRequirements.recommended.RAM', {validate: (value) => validateKeyRAM(value) || true})}
                                    />
                                    <MainInput
                                        id={`recommendedMemory`}
                                        label={`Память`}
                                        error={errors.systemRequirements?.recommended?.memory?.message}
                                        {...register('systemRequirements.recommended.memory', {validate: (value) => validateKeyMemory(value) || true})}
                                    />
                                </div>
                            </div>
                        </DropDownContent>


                        <Controller
                            control={control}
                            name="operationSystem"
                            rules={{validate: (value) => validateKeyOS(value) || true}}
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
                            rules={{validate: (value) => validateKeyPlatforms(value) || true}}
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
                            rules={{validate: (value) => validateKeyGenres(value) || true}}
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