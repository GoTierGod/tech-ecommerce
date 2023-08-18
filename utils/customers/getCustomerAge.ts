export const getCustomerAge = (birthdate: string): number => {
    const birthYear = parseInt(birthdate.split('-')[0], 10)
    const birthMonth = parseInt(birthdate.split('-')[1], 10) - 1
    const birthDay = parseInt(birthdate.split('-')[2], 10)

    const today = new Date()
    const todayYear = today.getFullYear()
    const todayMonth = today.getMonth()
    const todayDay = today.getDate()

    let age = todayYear - birthYear

    if (
        todayMonth < birthMonth ||
        (todayMonth === birthMonth && todayDay < birthDay)
    ) {
        age--
    }

    return age
}
