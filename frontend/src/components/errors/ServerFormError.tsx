
export default function ServerFormError({error}: {error: string | null}) {

    if (!error) {
        return null;
    }

    return (
        <div className="mb-4 rounded-2xl border border-red-500/40 bg-red-950/40 px-4 py-3 text-sm text-red-100">
            {error}
        </div>
    )
}