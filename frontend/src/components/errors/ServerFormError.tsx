
export default function ServerFormError({error}: {error: string | null}) {

    if (!error) {
        return null;
    }

    return (
        <div className="my-5 rounded-2xl  bg-red-400/50 px-4 py-3 text-sm text-slate-50">
            {error}
        </div>
    )
}