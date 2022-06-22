const express = require('express')
const app = express()

axios.defaults.baseURL = 'http://localhost:8888/tasks'

const getTasks = () => axios.get('/')

const createTask = (data) => axios.create('/tasks', data)

const destroyTask = (id) => axios.delete(`/tasks/${id}`)

const getOneTask = (id) => axios.get(`tasks/${id}`)

module.export = {
    getTasks,
    createTask,
    destroyTask,
    getOneTask,
}
