export default defineEventHandler(event => {
    const params = getRouterParam(event, 'allParams')

    return `All params ${params}`
})