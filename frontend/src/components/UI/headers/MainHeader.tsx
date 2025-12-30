import LinkYellowBtn from "@/components/buttons/yellowButton/LinkYellowBtn";
import IconYellowBtn from "@/components/buttons/yellowButton/IconYellowBtn";
import {useCallback, useState} from "react";
import {CircleUser} from 'lucide-react'

export default function MainHeader(){

    const isAuthenticated = true;

    const [modalWindowOpen, setModalWindowOpen] = useState<boolean>(false);

    const toggleModalWindow = useCallback(() => {
        setModalWindowOpen(!modalWindowOpen)
    }, [modalWindowOpen]);

    return (
        <div className={`flex justify-between items-center w-full px-3 py-1`}>
            <div className="">
                <h1 className={`text-amber-400 font-semibold text-xl`}>GameChange</h1>
            </div>

            <div className="">

            </div>

            <div className="">
                {!isAuthenticated ? (
                    <LinkYellowBtn
                        label={`Войти`}
                        href={`auth/login`}
                    />
                ) : (
                    <IconYellowBtn
                        IconComponent={CircleUser}
                        onClick={toggleModalWindow}
                    />
                )}

            </div>
        </div>
    )
}