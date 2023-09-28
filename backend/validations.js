export const validateBooks = (data) => {
    if (!data.title || !data.author || !data.publishYear) {
        return false
    } else {
        return true
    }
}