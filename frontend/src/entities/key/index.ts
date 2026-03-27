
export { default as useGameKeys } from './model/data'

export {
    useChangeKeyMutation,
    useCreateKeyMutation,
    useDeleteKeyMutation
} from './model/mutation'

export {
    getKeysList,
    getKeyDetails,
    createKey,
    deleteKey,
    updateKey
} from './model/controller'

export {
    validateKeyCPU,
    validateKeyDescription,
    validateKeyDeveloper,
    validateKeyGenres,
    validateKeyGPU,
    validateKeyMainPicture,
    validateKeyMemory,
    validateKeyName,
    validateKeyOS,
    validateKeyOtherPicture,
    validateKeyPlatforms,
    validateKeyPrice,
    validateKeyPublisher,
    validateKeyRAM,
    validateKeyReleaseDate,
    validateKeyUrl
} from './model/validation'

export type {
    KeyListData,
    KeyBaseData,
    KeyDetailsData,
    KeyFormValues,
    KeyMetadataParams,
    AddKeyData
} from './model/type'

export {
    DropDownContent,
    KeyCard,
    PCRequirements
} from './ui'
