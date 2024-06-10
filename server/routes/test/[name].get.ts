export default defineEventHandler(async (event) => {
    const id = getRouterParam(event, 'name')

    return `Identficador do usuario: ${id}`
})