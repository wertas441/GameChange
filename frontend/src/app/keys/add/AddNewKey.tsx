'use client'

import {useForm, Controller} from "react-hook-form";
import {AddKeyData} from "@/types/keys";
import {secondColorTheme} from "@/styles/styles";
import ServerFormError from "@/components/errors/ServerFormError";
import MainInput from "@/components/inputs/MainInput";
import SubmitYellowBtn from "@/components/buttons/yellowButton/SubmitYellowBtn";
import {api, getServerErrorMessage, showErrorMessage} from "@/lib";
import {usePageUtils} from "@/lib/hooks/usePageUtils";
import {BackendApiResponse} from "@/types";
import DropDownContent from "@/components/UI/DropDownContent";
import MultiSelectInput from "@/components/inputs/MultiSelectInput";
import {activationPlatformOptions, genreOptions, operationSystemOptions} from "@/lib/data";

export default function AddNewKey(){

    const { register, handleSubmit, control, formState: { errors } } = useForm<AddKeyData>();

    const { serverError, setServerError, isSubmitting, setIsSubmitting, router } = usePageUtils();

    const onSubmit = async (values: AddKeyData) => {
        setServerError(null);
        setIsSubmitting(true);

        const payload: AddKeyData = {
            name: values.name,
            keyUrl: values.keyUrl,
            price: values.price,
            description: values.description,
            releaseDate: values.releaseDate,
            mainPicture: values.mainPicture,
            otherPictures: values.otherPictures,
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
            await api.post<BackendApiResponse>(`/keys/key`, payload);


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