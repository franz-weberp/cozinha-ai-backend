export default defineEventHandler(event => {
    const name = getRouterParam(event, 'name')
    const age = getRouterParam(event, 'age')

    return `Hey ${name}, are u ${age} years old, right?!`
})